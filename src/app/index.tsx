import DeckCard from "@/components/DeckCard";
import EmptyState from "@/components/EmptyState";
import FilterChip from "@/components/FilterChip";
import SummaryRow from "@/components/SummaryRow";
import { FontSize, Radius, Spacing } from "@/constants/theme";
import { fetchDecks } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";
import type { Deck, Mastery } from "@/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Status = "loading" | "error" | "ready";
type Filter = "all" | Mastery;
type Sort = "none" | "newest" | "cards";

const FILTERS: Filter[] = ["all", "new", "learning", "mastered"];

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [listWidth, setListWidth] = useState(0);

  const [decks, setDecks] = useState<Deck[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("none");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchDecks();
        if (!ignore) {
          setDecks(data);
          setStatus("ready");
        }
      } catch {
        if (!ignore) {
          setStatus("error");
        }
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setStatus("loading");
    setAttempt((a) => a + 1);
  }

  async function refresh() {
    setRefreshing(true);
    try {
      const data = await fetchDecks();
      setDecks(data);
    } catch {
      // keep the old items if the refresh fails
    } finally {
      setRefreshing(false);
    }
  }

  function removeDeck(id: string) {
    setDecks((list) => list.filter((deck) => deck.id !== id));
  }

  function confirmDelete(deck: Deck) {
    if (Platform.OS === "web") {
      // Alert.alert does nothing in the browser, so use the browser's dialog
      if (window.confirm(`Delete "${deck.title}"?`)) {
        removeDeck(deck.id);
      }
      return;
    }
    Alert.alert("Delete deck?", `"${deck.title}" will be removed.`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => removeDeck(deck.id),
      },
    ]);
  }

  const filtered =
    filter === "all" ? decks : decks.filter((deck) => deck.mastery === filter);

  // sort a copy, so the original order in state never changes
  const visible =
    sort === "newest"
      ? [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      : sort === "cards"
        ? [...filtered].sort((a, b) => b.cardCount - a.cardCount)
        : filtered;

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const available = (listWidth || width) - 2 * Spacing.md;
  const cardWidth = Math.floor(
    (available - (columns - 1) * Spacing.md) / columns,
  );

  if (status === "loading") {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (status === "error") {
    return (
      <View style={styles.center}>
        <Text style={[styles.errorText, { color: theme.text }]}>
          Could not load decks
        </Text>
        <Pressable
          onPress={retry}
          accessibilityRole="button"
          style={[styles.button, { backgroundColor: theme.primary }]}
        >
          <Text style={[styles.buttonText, { color: theme.onPrimary }]}>
            Try again
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      key={columns}
      numColumns={columns}
      columnWrapperStyle={columns > 1 ? { gap: Spacing.md } : undefined}
      onLayout={(event) => setListWidth(event.nativeEvent.layout.width)}
      data={visible}
      keyExtractor={(deck) => deck.id}
      renderItem={({ item }) => (
        <DeckCard
          deck={item}
          style={{ width: cardWidth }}
          onPress={() =>
            router.push({ pathname: "/deck/[id]", params: { id: item.id } })
          }
          onLongPress={() => confirmDelete(item)}
        />
      )}
      refreshing={refreshing}
      onRefresh={refresh}
      ListHeaderComponent={
        <View style={styles.header}>
          <SummaryRow decks={decks} />
          <View style={styles.chips}>
            {FILTERS.map((item) => (
              <FilterChip
                key={item}
                label={item === "all" ? "All" : item}
                selected={filter === item}
                onPress={() => setFilter(item)}
              />
            ))}
          </View>
          <View style={styles.chips}>
            <FilterChip
              label="Newest"
              selected={sort === "newest"}
              onPress={() => setSort(sort === "newest" ? "none" : "newest")}
            />
            <FilterChip
              label="Most cards"
              selected={sort === "cards"}
              onPress={() => setSort(sort === "cards" ? "none" : "cards")}
            />
          </View>
        </View>
      }
      ListHeaderComponentStyle={{ marginBottom: Spacing.md }}
      ListEmptyComponent={
        filter === "all" ? (
          <EmptyState
            title="No decks yet"
            message="Your decks will appear here."
          />
        ) : (
          <EmptyState
            title={`No ${filter} decks`}
            message="Choose another status."
          />
        )
      }
      ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
      contentContainerStyle={{
        flexGrow: 1,
        padding: Spacing.md,
        paddingBottom: Spacing.md + insets.bottom,
      }}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  errorText: { fontSize: FontSize.title, fontWeight: "bold" },
  button: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.pill,
  },
  buttonText: { fontSize: FontSize.body, fontWeight: "600" },
  header: { gap: Spacing.md },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.sm },
});
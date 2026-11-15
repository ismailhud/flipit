import DeckCard from "@/components/DeckCard";
import EmptyState from "@/components/EmptyState";
import SummaryRow from "@/components/SummaryRow";
import { FontSize, Radius, Spacing } from "@/constants/theme";
import { fetchDecks } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";
import type { Deck } from "@/types";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Status = "loading" | "error" | "ready";

export default function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [listWidth, setListWidth] = useState(0);

  const [decks, setDecks] = useState<Deck[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);

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
      data={decks}
      keyExtractor={(deck) => deck.id}
      renderItem={({ item }) => (
        <DeckCard deck={item} style={{ width: cardWidth }} />
      )}
      ListHeaderComponent={<SummaryRow decks={decks} />}
      ListHeaderComponentStyle={{ marginBottom: Spacing.md }}
      ListEmptyComponent={
        <EmptyState
          title="No decks yet"
          message="Your decks will appear here."
        />
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
});

import EmptyState from "@/components/EmptyState";
import { FontSize, Radius, Spacing } from "@/constants/theme";
import { getDeck } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";
import { formatDate } from "@/utils/format";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function DeckDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const deck = getDeck(id);

  if (!deck) {
    return (
      <>
        <Stack.Screen options={{ title: "Not found" }} />
        <EmptyState
          title="Deck not found"
          message={`There is no deck with id ${id}.`}
        />
      </>
    );
  }

  const stats = [
    `${deck.cardCount} cards`,
    deck.mastery,
    formatDate(deck.createdAt),
  ];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scroll,
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
    >
      <Stack.Screen options={{ title: deck.title }} />
      <View style={styles.content}>
        <Image
          source={{ uri: deck.coverUrl }}
          style={styles.photo}
          resizeMode="cover"
        />

        <View style={styles.gapXs}>
          <Text style={[styles.title, { color: theme.text }]}>
            {deck.title}
          </Text>
          <Text style={[styles.course, { color: theme.muted }]}>
            {deck.course}
          </Text>
        </View>

        <View style={styles.stats}>
          {stats.map((value) => (
            <View
              key={value}
              style={[
                styles.stat,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.statText, { color: theme.text }]}>
                {value}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.gapXs}>
          <Text style={[styles.heading, { color: theme.text }]}>Notes</Text>
          <Text style={[styles.body, { color: theme.muted }]}>
            {deck.description ?? "No notes for this deck."}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: Spacing.md },
  content: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    gap: Spacing.md,
  },
  photo: { width: "100%", aspectRatio: 16 / 9, borderRadius: Radius.md },
  gapXs: { gap: Spacing.xs },
  title: { fontSize: FontSize.hero, fontWeight: "bold" },
  course: { fontSize: FontSize.body },
  stats: { flexDirection: "row", gap: Spacing.sm },
  stat: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
    borderWidth: 1,
  },
  statText: { fontSize: FontSize.small, fontWeight: "600" },
  heading: { fontSize: FontSize.title, fontWeight: "bold" },
  body: { fontSize: FontSize.body, lineHeight: 24 },
});
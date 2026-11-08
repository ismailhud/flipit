import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Deck } from "@/types";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type DeckDetailsProps = {
  deck: Deck;
};

type RowProps = {
  label: string;
  value: string;
};

function Row({ label, value }: RowProps) {
  const theme = useTheme();
  return (
    <View style={[styles.row, { borderBottomColor: theme.border }]}>
      <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
      <Text style={[styles.value, { color: theme.text }]}>{value}</Text>
    </View>
  );
}

export default function DeckDetails({ deck }: DeckDetailsProps) {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.content}>
        <Image
          source={{ uri: deck.coverUrl }}
          style={styles.photo}
          resizeMode="cover"
        />
        <Text style={[styles.title, { color: theme.text }]}>{deck.title}</Text>
        <Row label="Course" value={deck.course} />
        <Row label="Cards" value={String(deck.cardCount)} />
        <Row label="Mastery" value={deck.mastery} />
        <Row label="Created" value={deck.createdAt} />
        {deck.description ? (
          <Text style={[styles.description, { color: theme.muted }]}>
            {deck.description}
          </Text>
        ) : null}
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
    gap: Spacing.sm,
  },
  photo: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: Radius.md,
  },
  title: {
    fontSize: FontSize.hero,
    fontWeight: "bold",
    marginVertical: Spacing.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
  label: { fontSize: FontSize.body },
  value: { fontSize: FontSize.body, flexShrink: 1, textAlign: "right" },
  description: { fontSize: FontSize.body, marginTop: Spacing.sm },
});

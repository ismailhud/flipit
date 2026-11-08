import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Deck } from "@/types";
import { StyleSheet, Text, View } from "react-native";

type SummaryRowProps = {
  decks: Deck[];
};

export default function SummaryRow({ decks }: SummaryRowProps) {
  const theme = useTheme();
  const totalCards = decks.reduce((sum, deck) => sum + deck.cardCount, 0);
  const mastered = decks.filter((deck) => deck.mastery === "mastered").length;

  const items = [
    { value: decks.length, label: "decks" },
    { value: totalCards, label: "cards" },
    { value: mastered, label: "mastered" },
  ];

  return (
    <View style={styles.row}>
      {items.map((item) => (
        <View
          key={item.label}
          style={[
            styles.box,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.value, { color: theme.primary }]}>
            {item.value}
          </Text>
          <Text style={[styles.label, { color: theme.muted }]}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: Spacing.sm },
  box: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  value: { fontSize: FontSize.hero, fontWeight: "bold" },
  label: { fontSize: FontSize.small },
});

import DeckCard from "@/components/DeckCard";
import SummaryRow from "@/components/SummaryRow";
import { Spacing } from "@/constants/theme";
import { decks } from "@/data/decks";
import { useState } from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [rowWidth, setRowWidth] = useState(0);

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const available = rowWidth || width - 2 * Spacing.md;
  const cardWidth = Math.floor(
    (available - (columns - 1) * Spacing.md) / columns,
  );

  return (
    <ScrollView
      contentContainerStyle={{
        padding: Spacing.md,
        paddingBottom: Spacing.md + insets.bottom,
        gap: Spacing.md,
      }}
    >
      <SummaryRow decks={decks} />
      <View
        onLayout={(event) => setRowWidth(event.nativeEvent.layout.width)}
        style={{ flexDirection: "row", flexWrap: "wrap", gap: Spacing.md }}
      >
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} style={{ width: cardWidth }} />
        ))}
      </View>
    </ScrollView>
  );
}

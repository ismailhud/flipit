import DeckCard from "@/components/DeckCard";
import SummaryRow from "@/components/SummaryRow";
import { Spacing } from "@/constants/theme";
import { decks } from "@/data/decks";
import { useState } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [listWidth, setListWidth] = useState(0);

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const available = (listWidth || width) - 2 * Spacing.md;
  const cardWidth = Math.floor(
    (available - (columns - 1) * Spacing.md) / columns,
  );

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
      ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
      contentContainerStyle={{
        padding: Spacing.md,
        paddingBottom: Spacing.md + insets.bottom,
      }}
    />
  );
}

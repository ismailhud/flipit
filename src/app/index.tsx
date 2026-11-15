import DeckCard from "@/components/DeckCard";
import SummaryRow from "@/components/SummaryRow";
import { Spacing } from "@/constants/theme";
import { decks } from "@/data/decks";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      data={decks}
      keyExtractor={(deck) => deck.id}
      renderItem={({ item }) => <DeckCard deck={item} />}
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

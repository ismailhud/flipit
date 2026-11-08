import DeckCard from "@/components/DeckCard";
import SummaryRow from "@/components/SummaryRow";
import { Spacing } from "@/constants/theme";
import { decks } from "@/data/decks";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{
        padding: Spacing.md,
        paddingBottom: Spacing.md + insets.bottom,
        gap: Spacing.md,
        width: "100%",
        maxWidth: 600,
        alignSelf: "center",
      }}
    >
      <SummaryRow decks={decks} />
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
    </ScrollView>
  );
}

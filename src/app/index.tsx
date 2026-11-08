import DeckCard from "@/components/DeckCard";
import { Spacing } from "@/constants/theme";
import { decks } from "@/data/decks";
import { useTheme } from "@/hooks/use-theme";
import { ScrollView, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const theme = useTheme();
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
      <Text style={{ color: theme.text }}>{decks.length} decks</Text>
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
    </ScrollView>
  );
}

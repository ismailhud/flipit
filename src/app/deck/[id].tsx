import EmptyState from "@/components/EmptyState";
import { getDeck } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function DeckDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const deck = getDeck(id);

  if (!deck) {
    return (
      <EmptyState
        title="Deck not found"
        message={`There is no deck with id ${id}.`}
      />
    );
  }

  return <Text style={{ color: theme.text }}>{deck.title}</Text>;
}
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function DeckDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Text>Details of deck {id}</Text>;
}
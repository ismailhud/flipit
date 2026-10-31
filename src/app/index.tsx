import { ScrollView, Text } from 'react-native';
import DeckCard from '@/components/DeckCard';
import { decks } from '@/data/decks';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text>{decks.length} decks</Text>
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
    </ScrollView>
  );
}
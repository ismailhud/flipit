import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { Deck } from '@/types';

type DeckDetailsProps = {
  deck: Deck;
};

export default function DeckDetails({ deck }: DeckDetailsProps) {
  return (
    <ScrollView>
      <Image source={{ uri: deck.coverUrl }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.muted}>{deck.course}</Text>
        <Text>Cards: {deck.cardCount}</Text>
        <Text>Mastery: {deck.mastery}</Text>
        <Text>Created: {deck.createdAt}</Text>
        {deck.description ? <Text>{deck.description}</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 240 },
  body: { padding: 16, gap: 8 },
  title: { fontSize: 24, fontWeight: 'bold' },
  muted: { color: '#5B6475' },
});
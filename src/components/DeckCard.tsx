import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Deck } from '@/types';

type DeckCardProps = {
  deck: Deck;
};

export default function DeckCard({ deck }: DeckCardProps) {
  return (
    <Pressable
      onPress={() => console.log('Open', deck.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Image
        source={{ uri: deck.coverUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.body}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.details}>
          {deck.course} · {deck.cardCount} cards · {deck.mastery}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, overflow: 'hidden', backgroundColor: '#E6EEF7' },
  pressed: { opacity: 0.6 },
  image: { width: '100%', aspectRatio: 16 / 9 },
  body: { padding: 12, gap: 4 },
  title: { fontSize: 18, fontWeight: 'bold' },
  details: { color: '#5B6475' },
});
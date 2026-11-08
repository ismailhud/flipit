import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Deck } from "@/types";
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type DeckCardProps = {
  deck: Deck;
  style?: StyleProp<ViewStyle>;
};

export default function DeckCard({ deck, style }: DeckCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => console.log("Open", deck.id)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        pressed && styles.pressed,
        style,
      ]}
    >
      <View>
        <Image
          source={{ uri: deck.coverUrl }}
          style={styles.photo}
          resizeMode="cover"
        />
        <View style={[styles.badge, { backgroundColor: theme.primary }]}>
          <Text style={[styles.badgeText, { color: theme.onPrimary }]}>
            {deck.mastery}
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
          {deck.title}
        </Text>
        <Text style={[styles.details, { color: theme.muted }]}>
          {deck.course} · {deck.cardCount} cards
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.md,
    borderWidth: 1,
    overflow: "hidden",
  },
  pressed: { opacity: 0.6 },
  photo: { width: "100%", aspectRatio: 16 / 9 },
  badge: {
    position: "absolute",
    top: Spacing.sm,
    right: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.pill,
  },
  badgeText: { fontSize: FontSize.small, fontWeight: "600" },
  body: { padding: Spacing.md, gap: Spacing.xs },
  title: { fontSize: FontSize.title, fontWeight: "bold" },
  details: { fontSize: FontSize.small },
});

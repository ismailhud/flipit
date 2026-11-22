import { FontSize, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function AboutScreen() {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: theme.text }]}>Flipit</Text>
      <Text style={[styles.body, { color: theme.muted }]}>
        Flipit is a flashcard app for students. Create a deck for each course,
        fill it with question-and-answer cards, and practise in a quiz mode
        that tracks which cards you know and which you still need to review.
      </Text>
      <Text style={[styles.body, { color: theme.muted }]}>
        Made with React Native and Expo for IT 3003 Cross-Platform Development
        at International Burch University.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.md, gap: Spacing.md },
  title: { fontSize: FontSize.hero, fontWeight: "bold" },
  body: { fontSize: FontSize.body, lineHeight: 24 },
});
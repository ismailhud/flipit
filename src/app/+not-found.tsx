import { FontSize, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  const theme = useTheme();

  return (
    <View style={styles.center}>
      <Stack.Screen options={{ title: "Page not found" }} />
      <Text style={[styles.title, { color: theme.text }]}>
        This page doesn&apos;t exist
      </Text>
      <Text style={[styles.message, { color: theme.muted }]}>
        The address may be wrong, or the page was moved.
      </Text>
      <Link href="/" replace style={[styles.link, { color: theme.primary }]}>
        Go to my decks
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    padding: Spacing.lg,
  },
  title: { fontSize: FontSize.title, fontWeight: "bold" },
  message: { fontSize: FontSize.body, textAlign: "center" },
  link: { fontSize: FontSize.body, fontWeight: "600", marginTop: Spacing.sm },
});
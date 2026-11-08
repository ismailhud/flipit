export const Colors = {
  light: {
    text: "#1A2433",
    muted: "#5B6475",
    background: "#FFFFFF",
    card: "#F5F8FB",
    border: "#DCE3EB",
    primary: "#2F5BEA", // calm blue
    onPrimary: "#FFFFFF", // text on primary
  },
  dark: {
    text: "#F2F4F7",
    muted: "#9AA6B5",
    background: "#0B1220",
    card: "#182132",
    border: "#2A3446",
    primary: "#8AA8FF",
    onPrimary: "#0B1220",
  },
} as const;

export type Theme = (typeof Colors)["light"];

export const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
export const FontSize = { small: 13, body: 16, title: 20, hero: 28 } as const;
export const Radius = { sm: 8, md: 12, pill: 999 } as const;

interface ColorsTypes {
  primary: string;
  warning: string;
  dark: {
    text: string;
    title: string;
    background: string;
    navBackground: string;
    iconColor: string;
    iconColorFocused: string;
    uiBackground: string;
  };
  light: {
    text: string;
    title: string;
    background: string;
    navBackground: string;
    iconColor: string;
    iconColorFocused: string;
    uiBackground: string;
  };
}

export const Colors: ColorsTypes = {
  // A deeper, more vibrant Eskom Blue
  primary: "#005DAA",
  // Safety Yellow/Amber for that "Warning: Stage 6" look
  warning: "#FACC15",

  dark: {
    text: "#94A3B8", // Muted Slate
    title: "#F1F5F9", // Near White
    background: "#0B0E14", // "Midnight Coal" - Deepest Charcoal
    navBackground: "#161E2D", // Deep Navy Grey
    iconColor: "#64748B",
    iconColorFocused: "#005DAA",
    uiBackground: "#1E293B", // Elevated Surface
  },

  light: {
    text: "#334155",
    title: "#0F172A",
    background: "#F8FAFC", // Clean "Cool" White
    navBackground: "#FFFFFF",
    iconColor: "#94A3B8",
    iconColorFocused: "#005DAA",
    uiBackground: "#FFFFFF",
  },
};

import { DesignTheme } from "../theme";

export function generateFigmaTokens(
  theme: DesignTheme
) {
  return JSON.stringify(
    {
      global: {
        primary: {
          value: theme.colors.primary,
          type: "color",
        },

        secondary: {
          value: theme.colors.secondary,
          type: "color",
        },

        accent: {
          value: theme.colors.accent,
          type: "color",
        },
      },
    },
    null,
    2
  );
}
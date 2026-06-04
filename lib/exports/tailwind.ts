import { DesignTheme } from "../theme";

export function generateTailwindConfig(
  theme: DesignTheme
) {
  return `
export default {
  theme: {
    extend: {
      colors: {
        primary: "${theme.colors.primary}",
        secondary: "${theme.colors.secondary}",
        accent: "${theme.colors.accent}",
        neutral: "${theme.colors.neutral}",
      },
    },
  },
};
`;
}
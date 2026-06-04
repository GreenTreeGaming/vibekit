import { DesignTheme } from "../theme";

export function generateCssVariables(
  theme: DesignTheme
) {
  return `
:root {
  --primary: ${theme.colors.primary};
  --secondary: ${theme.colors.secondary};
  --accent: ${theme.colors.accent};
  --neutral: ${theme.colors.neutral};

  --font-heading: "${theme.typography.heading}";
  --font-body: "${theme.typography.body}";
}
`;
}
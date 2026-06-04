export interface DesignTheme {
  palette: string[];

  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
  };

  typography: {
    heading: string;
    body: string;
  };

  analysis: {
    style: string;
    tone: string;
    industry: string;
    complexity: string;
  };
}

export function createTheme(
  palette: string[],
  analysis: any
): DesignTheme {
  return {
    palette,

    colors: {
      primary: palette[0],
      secondary: palette[1],
      accent: palette[2],
      neutral: palette[5] ?? "#e5e7eb",
    },

    typography: {
      heading:
        analysis?.headlineFont ??
        "Space Grotesk",

      body:
        analysis?.bodyFont ??
        "Inter",
    },

    analysis: {
      style:
        analysis?.style ??
        "Unknown",

      tone:
        analysis?.tone ??
        "Unknown",

      industry:
        analysis?.industry ??
        "Unknown",

      complexity:
        analysis?.complexity ??
        "Unknown",
    },
  };
}
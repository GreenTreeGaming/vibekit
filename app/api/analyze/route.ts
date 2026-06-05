import { NextResponse } from "next/server";
import { gemini } from "@/lib/gemini";
import { ratelimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  console.log("🔥 ANALYZE ROUTE HIT");

  try {

    const ip =
      req.headers.get(
        "x-forwarded-for"
      ) ?? "anonymous";

    const result =
      await ratelimit.limit(ip);

    if (!result.success) {
      return NextResponse.json(
        {
          error:
            "AI analysis limit reached. Please try again later.",
          remaining: 0,
        },
        {
          status: 429,
        }
      );
    }

    const { image } =
      await req.json();

    if (!image) {
      return NextResponse.json(
        {
          error:
            "No image provided.",
        },
        {
          status: 400,
        }
      );
    }

    const base64 = image.replace(
      /^data:image\/\w+;base64,/,
      ""
    );

    const response =
      await gemini.models.generateContent({
        model: "gemini-2.5-flash",

        contents: [
          {
            inlineData: {
              mimeType: "image/png",
              data: base64,
            },
          },

          {
            text: `
Analyze this UI screenshot.

Return ONLY valid JSON.

{
  "style": "",
  "industry": "",
  "mood": "",
  "description": "",
  "recommendedFonts": [],
  "uiPatterns": [],
  "borderRadius": "",
  "shadowStyle": "",
  "spacingStyle": ""
}
            `,
          },
        ],
      });

    console.log("🤖 GEMINI CALLED");

    const raw =
      response.text ?? "{}";

    const cleaned = raw.replace(
      /```json|```/g,
      ""
    ).trim();

    let parsed;

    try {
      parsed =
        JSON.parse(cleaned);
    } catch {
      console.error(
        "Gemini returned invalid JSON:",
        cleaned
      );

      return NextResponse.json(
        {
          error:
            "Failed to parse AI response.",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      ...parsed,

      usage: {
        remaining:
          result.remaining,
        limit:
          result.limit,
      },
    });
  } catch (error) {
    console.error(
      "AI Analysis Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to analyze screenshot.",
      },
      {
        status: 500,
      }
    );
  }
}
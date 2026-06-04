import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";

const hf = new HfInference(process.env.HF_TOKEN);

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();

    const result = await hf.chatCompletion({
      model: "meta-llama/Llama-3.2-11B-Vision-Instruct",

      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },

            {
              type: "text",
              text: `
Analyze this UI screenshot.

Return ONLY valid JSON.

{
  "style": "",
  "industry": "",
  "tone": "",
  "complexity": "",
  "headingFont": "",
  "bodyFont": "",
  "monoFont": "",
  "keywords": []
}
`,
            },
          ],
        },
      ],

      max_tokens: 400,
    });

    const text =
      result.choices?.[0]?.message?.content ?? "{}";

    return NextResponse.json({
      result: JSON.parse(text),
    });
  } catch (error: any) {
    console.error(
      JSON.stringify(error, null, 2)
    );

    return NextResponse.json(
      {
        error: error?.message,
      },
      {
        status: 500,
      }
    );
  }
}
import { NextResponse } from "next/server";
import { gemini } from "@/lib/gemini";

export async function GET() {
  const response =
    await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents:
        "Say hello from Gemini",
    });

  return NextResponse.json({
    text: response.text,
  });
}
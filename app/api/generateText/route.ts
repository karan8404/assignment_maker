import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAi = new GoogleGenerativeAI(apiKey);
const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
  const body = await req.json();
  const prompt: string = body.prompt;

  const result = await model.generateContent(prompt);

  return NextResponse.json(
    {
      response: result.response.text(),
      prompt: prompt,
    },
    { status: 200 }
  );
}

import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getAiRespone(
  aiModel: string,
  prompt: string
): Promise<string | null> {
  let result: string | null = null;
  switch (aiModel) {
    case "openai":
      result = await getOpenAIResponse(prompt);
      break;
    case "gemini":
      result = await getGeminiAIResponse(prompt);
      break;
  }
  return result;
}

async function getGeminiAIResponse(prompt: string): Promise<string | null> {
  const genAI = new GoogleGenerativeAI(
    process.env["NEXT_PUBLIC_GEMINI_API_KEY"]!
  );
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });
  const message = result.response.candidates?.at(0)?.content.parts.at(0)?.text;
  return message ? message : null;
}

async function getOpenAIResponse(prompt: string): Promise<string | null> {
  const openAI = new OpenAI({
    apiKey: process.env["NEXT_PUBLIC_OPENAI_API_KEY"],
    dangerouslyAllowBrowser: true,
  });

  const response = await openAI.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  const message = response.choices.at(0)?.message.content;
  return message ? message : null;
}

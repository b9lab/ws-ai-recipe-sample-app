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
  return "not implemented";
}

async function getOpenAIResponse(prompt: string): Promise<string | null> {
  return "not implemented";
}

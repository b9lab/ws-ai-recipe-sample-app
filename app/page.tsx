"use client";

import { useState } from "react";
import Input from "./components/Input";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Response from "./components/Response";
import Settings from "./components/Settings";

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

export default function Home() {
  const [aiModel, setAiModel] = useState("openai");
  const [input, setInput] = useState("");
  const [lastInput, setLastInput] = useState("");
  const [response, setResponse] = useState("");

  const onClick = async () => {
    setResponse("");
    setLastInput(input);
    let result = null;
    switch (aiModel) {
      case "openai":
        result = await getOpenAIResponse(input);
        break;
      case "gemini":
        result = await getGeminiAIResponse(input);
        break;
    }
    setResponse(result ? result : "Something went wrong");
  };

  return (
    <main className="h-[100vh] bg-zinc-900 text-zinc-200 px-12 flex flex-col">
      <h1 className="text-3xl text-center py-4 font-extrabold">
        Receipe Sample App
      </h1>
      <Settings setAiModel={setAiModel} aiModel={aiModel} />
      <Response input={lastInput} response={response} />
      <Input setInput={setInput} input={input} btnOnClick={onClick} />
    </main>
  );
}

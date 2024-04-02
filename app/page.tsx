"use client";

import { useState } from "react";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { remark } from "remark";
import html from "remark-html";

import Response from "./components/Response";
import Settings from "./components/Settings";
import Receipe from "./components/Receipe";
import Input from "./components/Input";

async function getAiRespone(
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

export default function Home() {
  const [aiModel, setAiModel] = useState("openai");
  const [input, setInput] = useState("");
  const [lastInput, setLastInput] = useState("");
  const [response, setResponse] = useState("");

  // receipe
  const [ingredients, setIngredients] = useState<string[]>([]);

  const onClickPrompt = async () => {
    setResponse("");
    const processedInput = (await remark().use(html).process(input)).toString();
    setLastInput(processedInput);
    const result = await getAiRespone(aiModel, input);
    const processedResponse = (
      await remark()
        .use(html)
        .process(result ? result : "Something went wrong")
    ).toString();
    setResponse(processedResponse);
    setInput("");
  };

  const onClickReceipePrompt = async () => {
    setResponse("");
    let prompt = "I have the following ingredients:\n";
    ingredients.forEach((ingredient) => (prompt += `* ${ingredient}\n`));
    prompt +=
      "Please list all dishes I could cook with these ingredients as a list";
    setIngredients([]);
    setLastInput(prompt);
    const result = await getAiRespone(aiModel, prompt);
    setResponse(result ? result : "Something went wrong");
  };

  return (
    <main className="h-[100vh] px-12 flex flex-col">
      <h1>Receipe Sample App</h1>
      <Settings setAiModel={setAiModel} aiModel={aiModel} />
      <hr />
      <Receipe
        setIngredients={setIngredients}
        ingredients={ingredients}
        onClickPrompt={onClickReceipePrompt}
      />
      <hr />
      <Response inputHtml={lastInput} responseHtml={response} />
      <Input setInput={setInput} input={input} onClickPrompt={onClickPrompt} />
    </main>
  );
}

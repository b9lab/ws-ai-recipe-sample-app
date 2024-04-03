"use client";

import { useState } from "react";

import { remark } from "remark";
import html from "remark-html";

import Response from "./components/Response";
import Settings from "./components/Settings";
import Input from "./components/Input";
import { getAiRespone } from "./aiFunctions";

export default function Home() {
  const [aiModel, setAiModel] = useState("openai");
  const [input, setInput] = useState("");
  const [lastInput, setLastInput] = useState("");
  const [response, setResponse] = useState("");

  // Recipe
  const [ingredients, setIngredients] = useState<string[]>([]);

  const onClickPrompt = async () => {
    setResponse("");
    // markdown request parsing
    const processedInput = (await remark().use(html).process(input)).toString();
    setLastInput(processedInput);
    const result = await getAiRespone(aiModel, input);

    // markdown response parsing
    const processedResponse = (
      await remark()
        .use(html)
        .process(result ? result : "Something went wrong")
    ).toString();
    setResponse(processedResponse);

    setInput("");
  };

  return (
    <main className="h-[100vh] px-12 flex flex-col">
      <h1>Recipe Sample App</h1>
      <Settings setAiModel={setAiModel} aiModel={aiModel} />
      <hr />
      <Response inputHtml={lastInput} responseHtml={response} />
      <Input setInput={setInput} input={input} onClickPrompt={onClickPrompt} />
    </main>
  );
}

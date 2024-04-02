"use client";

import { useState } from "react";

import { remark } from "remark";
import html from "remark-html";

import Response from "./components/Response";
import Settings from "./components/Settings";
import Receipe from "./components/Receipe";
import Input from "./components/Input";
import { getAiRespone } from "./aiFunctions";

export default function Home() {
  const [aiModel, setAiModel] = useState("openai");
  const [input, setInput] = useState("");
  const [lastInput, setLastInput] = useState("");
  const [response, setResponse] = useState("");

  // receipe
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

  const onClickReceipePrompt = async () => {
    setResponse("");
    let prompt = "I have the following ingredients:\n";
    ingredients.forEach(
      (ingredient, index) => (prompt += `${index + 1}. ${ingredient}\n`)
    );
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

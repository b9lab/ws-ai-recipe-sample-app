import { Dispatch, FormEvent, SetStateAction } from "react";

interface SettingsProps {
  setAiModel: Dispatch<SetStateAction<string>>;
  aiModel: string;
}

export default function Settings(props: SettingsProps) {
  const onChange = (e: FormEvent<HTMLSelectElement>) => {
    props.setAiModel(e.currentTarget.value);
  };

  return (
    <div className="py-5">
      <h2 className="text-xl py-2">Model</h2>
      <select
        value={props.aiModel}
        onChange={onChange}
        className="bg-zinc-300 rounded-md text-zinc-900 p-2"
      >
        <option value="openai">Openai</option>
        <option value="gemini">Gemini</option>
      </select>
    </div>
  );
}

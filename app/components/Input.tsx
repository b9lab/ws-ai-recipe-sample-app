import { Dispatch, FormEvent, SetStateAction } from "react";

interface InputProps {
  setInput: Dispatch<SetStateAction<string>>;
  input: string;
  onClickPrompt: () => Promise<void>;
}

export default function Input(props: InputProps) {
  const onChange = (e: FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "0";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
    props.setInput(e.currentTarget.value);
  };

  return (
    <div className="mt-auto">
      <textarea
        className="w-9/12 h-10"
        placeholder="Give your input here"
        id="input"
        value={props.input}
        onChange={onChange}
      />
      <button className="w-2/12 ml-5 h-10" onClick={props.onClickPrompt}>
        Send
      </button>
    </div>
  );
}

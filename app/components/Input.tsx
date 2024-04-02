import { Dispatch, FormEvent, SetStateAction } from "react";

interface InputProps {
  setInput: Dispatch<SetStateAction<string>>;
  input: string;
  btnOnClick: () => Promise<void>;
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
        className="w-9/12 h-10 bg-zinc-300 rounded-md text-zinc-900 p-2"
        placeholder="Give your input here"
        id="input"
        value={props.input}
        onChange={onChange}
      />
      <button
        className="w-2/12 ml-5 h-10 p-2 rounded-md bg-zinc-950"
        onClick={props.btnOnClick}
      >
        Send
      </button>
    </div>
  );
}

import { Dispatch, FormEvent, SetStateAction, useRef } from "react";

interface InputProps {
  setInput: Dispatch<SetStateAction<string>>;
  input: string;
  onClickPrompt: () => Promise<void>;
}

export default function Input(props: InputProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onChange = (e: FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "0";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
    if (buttonRef) {
      buttonRef.current!.style.height = "0";
      buttonRef.current!.style.height = e.currentTarget.scrollHeight + "px";
    }

    props.setInput(e.currentTarget.value);
  };

  return (
    <div className="mt-auto flex justify-center my-2">
      <textarea
        className="w-9/12 h-10"
        placeholder="Give your input here"
        id="input"
        value={props.input}
        onChange={onChange}
      />
      <button
        ref={buttonRef}
        className="w-2/12 ml-5 h-10 self-center bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 border border-blue-700 rounded"
        onClick={props.onClickPrompt}
      >
        Send
      </button>
    </div>
  );
}

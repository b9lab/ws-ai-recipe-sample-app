import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface ReceipeProps {
  setIngredients: Dispatch<SetStateAction<string[]>>;
  ingredients: string[];
  onClickPrompt: () => Promise<void>;
}

export default function Receipe(props: ReceipeProps) {
  const [input, setInput] = useState("");

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const onClickAddIngredient = () => {
    if (input === "") {
      return;
    }
    props.setIngredients([...props.ingredients, input]);
    setInput("");
  };

  const onClickRemoveIngredient = (removeIndex: number) => {
    props.setIngredients(
      props.ingredients.filter((_, index) => index != removeIndex)
    );
  };

  return (
    <div className="py-2">
      <h2>Receipe</h2>
      <ul className="pl-4 list-disc pb-2">
        {props.ingredients.map((ingredient, index) => (
          <li>
            {ingredient}{" "}
            <button onClick={() => onClickRemoveIngredient(index)}>X</button>
          </li>
        ))}
      </ul>

      <input
        placeholder="Ingredient"
        type="text"
        value={input}
        onChange={onChange}
      />
      <button className="block mt-2" onClick={onClickAddIngredient}>
        Add
      </button>
      <button className="my-2" onClick={props.onClickPrompt}>
        Send prompt
      </button>
    </div>
  );
}

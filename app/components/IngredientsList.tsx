import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface IngredientsListProps {
  setIngredients: Dispatch<SetStateAction<string[]>>;
  ingredients: string[];
  onClickPrompt: () => Promise<void>;
}

export default function IngredientsList(props: IngredientsListProps) {
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
      <h2>Ingredients</h2>
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

        <button className="block mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={onClickAddIngredient}>
          Add
        </button>

      <br/>
      <button className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={props.onClickPrompt}>
        Send prompt
      </button>
    </div>
  );
}

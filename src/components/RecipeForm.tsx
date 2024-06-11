import React, { useState } from "react";
import { Recipe } from "../types";

interface RecipeFormProps {
  addRecipe: (recipe: Recipe) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ addRecipe }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe: Recipe = {
      title,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      instructions,
      prepTime,
    };
    addRecipe(newRecipe);
    setTitle("");
    setIngredients("");
    setInstructions("");
    setPrepTime(0);
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />
      <input
        type="number"
        placeholder="Preparation Time (minutes)"
        value={prepTime}
        onChange={(e) => setPrepTime(parseInt(e.target.value))}
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;

import React from "react";
import { Recipe } from "../types";

interface RecipeListProps {
  recipes: Recipe[];
  updateRecipe: (index: number, updatedRecipe: Recipe) => void;
  deleteRecipe: (index: number) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  updateRecipe,
  deleteRecipe,
}) => {
  return (
    <ul className="recipe-list">
      {recipes.map((recipe, index) => (
        <li key={index} className="recipe-item">
          <h3>{recipe.title}</h3>
          <p>Ingredients: {recipe.ingredients.join(", ")}</p>
          <p>Instructions: {recipe.instructions}</p>
          <p>Preparation Time: {recipe.prepTime} minutes</p>
          <button
            onClick={() =>
              updateRecipe(index, { ...recipe, prepTime: recipe.prepTime + 10 })
            }
          >
            Increase Time
          </button>
          <button onClick={() => deleteRecipe(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;

import { debounce } from "lodash";
import React, { useState, useEffect } from "react";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import { Recipe } from "./types";
import "./App.css";

const getRecipesFromStorage = (): Recipe[] => {
  const storedRecipes = localStorage.getItem("recipes");
  return storedRecipes ? JSON.parse(storedRecipes) : [];
};

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(getRecipesFromStorage());
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(
    getRecipesFromStorage()
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe: Recipe) => {
    setRecipes([...recipes, recipe]);
    setFilteredRecipes([...recipes, recipe]);
  };

  const updateRecipe = (index: number, updatedRecipe: Recipe) => {
    const newRecipes = [...recipes];
    newRecipes[index] = updatedRecipe;
    setRecipes(newRecipes);
    setFilteredRecipes(newRecipes);
  };

  const deleteRecipe = (index: number) => {
    const newRecipes = [...recipes];
    newRecipes.splice(index, 1);
    setRecipes(newRecipes);
    setFilteredRecipes(newRecipes);
  };

  const filterRecipes = (filterTerm: string) => {
    const filtered = recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(filterTerm.toLowerCase())
        )
    );
    setFilteredRecipes(filtered);
  };

  const debouncedFilterRecipes = debounce(filterRecipes, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    debouncedFilterRecipes(event.target.value);
  };

  const sortRecipesByTime = (order: "asc" | "desc") => {
    const sorted = [...filteredRecipes].sort((a, b) =>
      order === "asc" ? a.prepTime - b.prepTime : b.prepTime - a.prepTime
    );
    setFilteredRecipes(sorted);
  };

  return (
    <div className="container">
      <RecipeForm addRecipe={addRecipe} />
      <input
        type="text"
        className="search-input"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button className="button" onClick={() => sortRecipesByTime("asc")}>
        Sort by Time (Asc)
      </button>
      <button className="button" onClick={() => sortRecipesByTime("desc")}>
        Sort by Time (Desc)
      </button>
      <RecipeList
        recipes={filteredRecipes}
        updateRecipe={updateRecipe}
        deleteRecipe={deleteRecipe}
      />
    </div>
  );
};

export default App;

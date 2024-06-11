import { useState } from "react";
import "./App.css";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <div>
        <RecipeForm />
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button>Sort by Time (Asc)</button>
        <button>Sort by Time (Desc)</button>
        <RecipeList />
      </div>
    </>
  );
}

export default App;

import { useEffect, useState } from "react"
import useLocalStorage from "./useLocalStorage";

const url = 'https://dummyjson.com/recipes';

interface Recipe {
    id: number,
    name: string,
    ingredients: string [],
    image: string,
    rating: string,
    mealType: string[],
    tags: string[]
  }


  
const useRecipe = () => {
    const [recipe,setRecipe] = useLocalStorage("RecipeData",[])
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    async function fetchData() {
        try {
            setLoading(true);
            const response = await fetch(url);
            const data = await response.json();
            setRecipes(data?.recipes);
            setRecipe(data?.recipes);
            console.log(data);
            setLoading(false);

        } catch (error) {
            console.log(error);
            alert(error);
            setError(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return { recipes, loading,error, fetchData }

}

export default useRecipe;

/*
{
    import { useEffect, useState } from "react";

const url = 'https://dummyjson.com/recipes';

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  image: string;
  rating: string;
  mealType: string[];
  tags: string[];
}

interface RecipeState {
  loading: boolean;
  error: boolean;
  recipes: Recipe[];
}

const useRecipe = () => {
  const [state, setState] = useState<RecipeState>({
    loading: false,
    error: false,
    recipes: [],
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true, error: false }));

    try {
      const response = await fetch(url);
      const data = await response.json();
      setState({
        loading: false,
        error: false,
        recipes: data.recipes || [],
      });
    } catch (err) {
      console.error(err);
      setState(prev => ({ ...prev, loading: false, error: true }));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { ...state, fetchData };
};

export default useRecipe;

}*/
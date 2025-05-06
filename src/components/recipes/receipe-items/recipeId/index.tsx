import { useParams } from 'react-router-dom';
// import useRecipe from '../../../../hooks/useRecipe';
import Box from '@mui/material/Box';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import style from './style.module.css'


interface Recipe {
    id: number,
    name: string,
    ingredients: string [],
    image: string,
    rating: string,
    mealType: string[],
    tags: string[]
  }

export default function RecipeId() {

    const {id} = useParams();
    // const {recipes} = useRecipe();
    // console.log(recipes);
    // const currRecipe =  recipes[parseInt(id)];
    // console.log("currReccipe: ",currRecipe);

    const [recipe] = useLocalStorage("RecipeData",[])
    const currRecipe: Recipe = recipe[id-1];
    console.log(currRecipe);
    
  return (
    <>
       <Box className={style.container}>
       <Box className={style.border}>
        <Box>
            <img src={currRecipe.image} alt=""  width='300px' height='300px'/>
        </Box>
        <Box className = {style.name}>
            {currRecipe.name}
        </Box>
        <Box className={style.tags}>
       {
          currRecipe.tags.slice(0,3).map((tag)=>
          (
            <Box className={style.tag} >
             {tag}
            </Box>
          ))

        }
       </Box>
       
    </Box>
       </Box>
    </>
  )
}

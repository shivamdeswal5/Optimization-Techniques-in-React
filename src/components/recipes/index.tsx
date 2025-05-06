import style from './style.module.css';
import Box from '@mui/material/Box';
import RecipeItem from './receipe-items';
import Typography from '@mui/material/Typography';
import useRecipe from '../../hooks/useRecipe';
import Pagination from '../pagination';
import { useState } from 'react';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router';

export default function Recipe() {
  const {recipes } = useRecipe();
  const [currentPage,setCurrentPage] = useState(1);
  const [postPerPage,setPostPerPage] = useState(8);
  const navigate  = useNavigate();

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const paginationData = recipes.slice(firstPostIndex,lastPostIndex);


  function logoutHandler(){
    sessionStorage.removeItem('currentUser');
    navigate('/login');   
  }

  
  return (
    <Box className={style.recipeContainer}>
      <Box className = {style.logout}>
        <Typography variant="h2" gutterBottom className={style.heading}>
          Recipes
        </Typography>
        <Button onClick={logoutHandler}>Logout</Button>
      </Box>
      <Box className={style.recipeItems}>
        {
          paginationData.map((recipe)=>{
            return <RecipeItem key = {recipe.id} 
            name = {recipe.name}
            ingredients = {recipe.ingredients}
            image = {recipe.image}
            rating = {recipe.rating}
            mealType = {recipe.mealType}
            tags = {recipe.tags}
            id = {recipe.id}
             />
          })
               
        }

      </Box>
      <Box className = {style.pagination}>
        <Pagination 
        totalPosts = {recipes.length} 
        postPerPage = {postPerPage} 
        setCurrentPage ={setCurrentPage}
        currentPage = {currentPage}
        setPostPerPage = {setPostPerPage}
        />
      </Box>
    </Box>
  )
}
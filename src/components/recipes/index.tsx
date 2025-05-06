import style from './style.module.css';
import Box from '@mui/material/Box';
import RecipeItem from './receipe-items';
import Typography from '@mui/material/Typography';
import useRecipe from '../../hooks/useRecipe';
import Pagination from '../pagination';
import {useState,useCallback,useMemo } from 'react';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router';


export default function Recipe() {
  const {recipes} = useRecipe();
  const [searchItem, setSearchItem] = useState("");
  const [currentPage,setCurrentPage] = useState(1);
  const [postPerPage,setPostPerPage] = useState(8);
  const navigate  = useNavigate();
  
  type SomeFunction = (...args: any[]) => void;

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;


  // filter data
  const filterData = recipes.filter((recipe)=>{
    return searchItem.toLowerCase() === '' ? recipe : recipe.name.toLowerCase().includes(searchItem);
  });

  
  const paginationData = filterData.slice(firstPostIndex,lastPostIndex);


  function logoutHandler(){
    sessionStorage.removeItem('currentUser');
    navigate('/login');   
  }

  const handleSearch = (e:React.ChangeEvent<HTMLInputElement >) => {
    setSearchItem(e.target.value);
    console.log(searchItem);
    setCurrentPage(1);
  }



  const debounce = (func:SomeFunction,wait:number) =>{
    let timerId : number
    return (...args:unknown[]) =>{
      clearTimeout(timerId);
      timerId = setTimeout(()=> func(...args),wait)
    }
  }
  
  const debounceCall = debounce(handleSearch,400);
  
  return (
    <Box className={style.recipeContainer}>
 
      <Box className = {style.logout}>
        <Typography variant="h2" gutterBottom className={style.heading}>
          Recipes
        </Typography>
        <Button onClick={logoutHandler}>Logout</Button>
      </Box>

      <div className={style.searchBar}>
        <input className={style.search} type="text" placeholder='Search for Products' onChange={debounceCall} />
      </div>

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
        totalPosts = {filterData.length} 
        postPerPage = {postPerPage} 
        setCurrentPage ={setCurrentPage}
        currentPage = {currentPage}
        setPostPerPage = {setPostPerPage}
        />
      </Box>
    </Box>
  )
}
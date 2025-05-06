import Box from '@mui/material/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import style from './style.module.css';
import Button from '@mui/joy/Button';
import { useNavigate } from 'react-router';

interface Recipe {
  name: string,
  ingredients: string [],
  image: string,
  rating: string,
  mealType: string[],
  tags: string[],
  id:number
}


export default function RecipeItem({name,ingredients,image,rating,mealType,tags,id}:Recipe) {

 const navigate = useNavigate();

 function handleClick(){
    navigate(`/recipe/${id}`)
 }

  return (
    <Box>
      <Card sx={{ width: 350 ,height:420 , maxWidth: '100%', boxShadow: 'lg' }} className={style.container}>

      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img
            src= {image}
          />
        </AspectRatio>
      </CardOverflow>

      <CardContent>
        <Typography level="body-xs">{mealType}</Typography>
        <Box
          
          sx={{ fontWeight: 'bolder' }}
        >
         {name}
        </Box>

        <Typography
          sx={{ mt: 1, fontWeight: 'sm' }}
          endDecorator={
            <Chip component="span" size="sm" variant="soft" color="success">
              {rating}
            </Chip>
          }      
        >
          {ingredients.slice(0,5)}
          
        </Typography>
      </CardContent>
      
      <Box className= {style.redBtn} >
      <Button  size="lg" onClick = {handleClick} >
          Read More
        </Button>
      </Box>

    </Card>
    </Box>
  )
}
import React, { useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useGetAllProductsQuery, useGetProductQuery } from '../../features/apiSlice'
import { Box} from '@mui/system';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import style from './style.module.css'
import Typography from '@mui/material/Typography';
type SomeFunction = (...args: any[]) => void;

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'description', headerName: 'Description', width: 400 },
  { field: 'category',headerName: 'Category', width: 100,},
  { field: 'price',headerName: 'Price', width: 160, },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function Products() {
    let {data} = useGetProductQuery(""); 
    console.log("Testing Query: ",useGetProductQuery(""))
    const [searchItem, setSearchItem] = useState("");
    const navigate  = useNavigate();

    function logoutHandler(){
        sessionStorage.removeItem('currentUser');
        navigate('/login');   
      }

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement >) => {
        setSearchItem(e.target.value);
        console.log(searchItem);

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

    <div className={style.table}>

        <Box className = {style.logout}>
        <Typography variant="h2" gutterBottom className={style.heading}>
          Recipes
        </Typography>
        <Button onClick={logoutHandler}>Logout</Button>
      </Box>

        <div className={style.searchBar}>
            <input className={style.search} type="text" placeholder='Search for Products' onChange={debounceCall} />
            <Button>Search</Button>
        </div>

        <Paper sx={{ height: 400, width: '80%'}}>
        <DataGrid
            rows={data?.products}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ border: 0 }}
        />
        </Paper>
    </div>

  )
}

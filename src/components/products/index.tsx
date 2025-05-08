import React, { useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useGetProductQuery} from '../../features/apiSlice'
import { Box} from '@mui/system';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import style from './style.module.css'
import Typography from '@mui/material/Typography';
type SomeFunction = (...args: any[]) => void;

export default function Products() {
    
    console.log("Testing Query: ",useGetProductQuery(""))
    const [searchItem, setSearchItem] = useState("");
    const [pagination,setPagination] = useState({
      search: searchItem,
      limit: 5,
      skip : 0
    })
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 50 },
      { field: 'title', headerName: 'Title', width: 250 },
      { field: 'description', headerName: 'Description', width: 400 },
      { field: 'category',headerName: 'Category', width: 100,},
      { field: 'price',headerName: 'Price', width: 160, },
      {field: 'action',headerName: 'More Details', width:160,
        renderCell: (params) =>(
          <Button onClick={()=>handleSubmit(params.row.id)}>View</Button>
        )
      }
    ];
    
    function handleSubmit(id:number){
      navigate(`/products/${id}`)          
    }
    const navigate  = useNavigate();
    const {data} = useGetProductQuery({
        search: searchItem,
        limit: pagination.limit,
        skip: pagination.skip
    }); 

    console.log("Data: ",data)

    const totalPages = data ? Math.ceil(data.total / pagination.limit) : 0;

    function logoutHandler(){
        sessionStorage.removeItem('currentUser');
        navigate('/login');   
      }

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement >) => {
        setSearchItem(e.target.value);
        setPagination(prev => ({
          ...prev,
          skip: 0
        }));

        console.log(searchItem);
    }
    
      const debounce = (func:SomeFunction,wait:number) =>{
        let timerId : number
        return (...args:unknown[]) =>{
          clearTimeout(timerId);
          timerId = setTimeout(()=> func(...args),wait)
        }
      }
    
      const debounceCall = debounce(handleSearch,600);

  return (

    <div className={style.table}>

        <Box className = {style.logout}>
        <Typography variant="h2" gutterBottom className={style.heading}>
          Products
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
            // initialState={{ pagination: { paginationModel } }}
            // pageSizeOptions={[5, 10]}
            hideFooterPagination  
            sx={{ border: 0 }}
        />
        </Paper>
        <Box sx={{display:'flex' ,alignItems:'center' ,justifyContent:'center', gap:'1rem'}}>
          <Button 
          disabled ={pagination.skip===0}
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              skip: Math.max(prev.skip - 5, 0),
              search: searchItem,
            }))}
          >Prev</Button>

              <Typography variant="body1">
              Page {Math.floor(pagination.skip / pagination.limit) + 1} of {totalPages}
            </Typography>

           <Button
          disabled={pagination.skip + pagination.limit >= data?.total}
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              skip: prev.skip + 5,
              search: searchItem,
            }))
          }
        >
          Next
        </Button>
        </Box>
    </div>

  )
}

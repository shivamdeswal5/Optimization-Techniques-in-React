import React from 'react'
import { useGetProductByIdQuery } from '../../../features/apiSlice'
import { useParams } from 'react-router'
import { Box } from '@mui/material';


export default function Product() {
    const {id} = useParams();
     const {data}  = useGetProductByIdQuery(id);
  return (
    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',flexDirection:'column', gap:'1rem'}}>
        <img src={data?.thumbnail} alt="" /> 
        <Box>{data?.title}</Box>      
        <Box sx={{width:'40%'}}>{data?.description}</Box>      
        <Box>Price {data?.price} $</Box>
    </Box>
  )
}

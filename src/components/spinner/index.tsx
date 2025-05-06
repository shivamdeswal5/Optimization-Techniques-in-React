import style from './style.module.css';
import Box from '@mui/material/Box';


export default function Spinner() {
  return (
    <Box className={style.spinner}>
      <Box className={style.loader}>
      </Box>
    </Box>
  )
}
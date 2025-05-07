import style from './style.module.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useRecipe from '../../hooks/useRecipe';
import {useState} from 'react';
import Button from '@mui/joy/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router';

interface Column {
  id: 'name' | 'ingredients' | 'tags' | 'rating';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 150 },
  {
    id: 'ingredients',
    label: 'Ingredients',
    minWidth: 270,
    align: 'left',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'tags',
    label: 'Tags',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'rating',
    label: 'Rating',
    minWidth: 170,
    align: 'left',
    format: (value: number) => value.toFixed(2),
  },
];

type SomeFunction = (...args: any[]) => void;

export default function RecipeData() {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [searchItem, setSearchItem] = useState("");
    const navigate  = useNavigate();
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

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
    
  const debounceCall = debounce(handleSearch,300);
    
  const {recipes} = useRecipe();
  const filterData = recipes.filter((recipe)=>{
    return searchItem.toLowerCase() === '' ? recipe : recipe.name.toLowerCase().includes(searchItem);
  })

  return (
    <Box className={style.recipeContainer}>
 
      <Box className = {style.logout}>
        <Typography variant="h2" gutterBottom className={style.heading}>
          Recipes
        </Typography>
        <Button onClick={logoutHandler}>Logout</Button>
      </Box>

      <Box className={style.searchBar}>
        <input className={style.search} type="text" placeholder='Search for Products' onChange={debounceCall} />
      </Box>
      {
        filterData.length === 0 ?
        <Box className = {style.noDataFound}>
          No Such Data Found ...
        </Box> :
        <Paper sx={{ width: '70%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((recipe) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={recipe.id}>
                      {columns.map((column) => {
                        const value = recipe[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[4, 6, 10]}
          component="div"
          count={recipes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Paper>
      }

    </Box>
  )
}
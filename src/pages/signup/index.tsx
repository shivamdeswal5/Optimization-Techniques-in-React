import style from  './style.module.css'
import Box from '@mui/material/Box';
import {
  Typography, Grid, Stack, Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import coverImg from '../../assets/img/image.png'
import useLocalStorage from '../../hooks/useLocalStorage';
import { useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from "react-router";
import { useNavigate } from 'react-router';

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().label('Confirm Password').required().oneOf([yup.ref('password')], 'Passwords must match')
  })
  .required()

export default function Signup() {

  type Inputs = {
    email: string
    password: string
    confirmPassword: string
  }

  
  const [users, setUsers] = useLocalStorage('users', []);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset 
  } = useForm<Inputs>({
      resolver: yupResolver(schema),    
  })

  const onSubmit = (data: Inputs) => {
    console.log(data);
    setUsers([...users,{
      email:data.email,
      password: data.password
    }])
    reset();
    alert("Signup Successful ...");
    navigate('/login');
    
};

  return (
    <>

      <Grid
        container
        spacing={{ xs: 2, md: 10 }} columns={{ xs: 4, sm: 8, md: 12 }}
        className={style.bgColor}
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          gap: "6rem",
          height: "100vh",
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}

      >
        <Box display={{ xs: 'none', md: 'none', sm: 'none', lg: 'block' }}>
          <img src={coverImg} alt="coverimg" />
        </Box>

        <Stack direction={{ xs: 'column', sm: 'column' }}
          spacing={{ xs: 2, sm: 4, md: 4 }}>

          <Typography variant="h3" component="h2">
            Create an Account
          </Typography>

          <Box sx={{ color: 'gray' }}>
            Already have an account? <Link className={style.linkColor} to="/login">Login</Link>
          </Box>

          <form className= {style.formClass} onSubmit={handleSubmit(onSubmit)}>
            <TextField
             {...register('email')}
              id="outlined-required"
              label="Email"
              placeholder='Required'
              className={style.changeColor}
              name="email"
              sx={{
                border: 'white',
                // Root class for the input field
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  // Class for the border around the input field
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "",
                  },
                },
                // Class for the label of the input field
                "& .MuiInputLabel-outlined": {
                  color: "rgba(160, 160, 160, 0.842)",
                },

                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                    borderWidth: "3px",
                  },
                },
                "&:hover:not(.Mui-focused)": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                },

              }}
            />

            <TextField
            {...register('password')}
              id="outlined-required"
              label="Password"
              placeholder='Required'
              className={style.changeColor}
              name="password"
              sx={{
                border: 'white',
                // Root class for the input field
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  // Class for the border around the input field
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "",
                  },
                },
                // Class for the label of the input field
                "& .MuiInputLabel-outlined": {
                  color: "rgba(160, 160, 160, 0.842)",
                },

                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                    borderWidth: "3px",
                  },
                },
                "&:hover:not(.Mui-focused)": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                },

              }}
            />
            
            <TextField
            {...register('confirmPassword')}
              id="outlined-required"
              label="Confirm Password"
              placeholder='Required'
              className={style.changeColor}
              name="confirmPassword"
              sx={{
                border: 'white',
                // Root class for the input field
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  // Class for the border around the input field
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "",
                  },
                },
                // Class for the label of the input field
                "& .MuiInputLabel-outlined": {
                  color: "rgba(160, 160, 160, 0.842)",
                },

                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                    borderWidth: "3px",
                  },
                },
                "&:hover:not(.Mui-focused)": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                },

              }}
            />
            {<p>{errors.confirmPassword?.message}</p>}

            <Button type='submit' variant="contained"
              sx={{ color: 'white', backgroundColor: '#7055b5', border: '0px' }}
              className='submitBtn'
            > Signup</Button>
          </form>
        </Stack>

      </Grid>

    </>
  )
}
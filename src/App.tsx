import './App.css';
import Signup from './pages/signup';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from './pages/login';
import Recipe from './components/recipes';
import ProtectedRoute from './routes/protected';
import RecipeId from './components/recipes/receipe-items/recipeId';
import RecipeData from './components/recipe-mui-table';
import useRecipe from './hooks/useRecipe';
import Spinner from './components/spinner';


function App() {
  const {loading} = useRecipe();
  return (
    <>
         <BrowserRouter>
        <Routes>

          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/recipe"
            element={
              <ProtectedRoute >
                    {
                      loading ? (<Spinner/>) : (<Recipe/>)
                    }
              </ProtectedRoute>
            }
          />

          <Route
            path="/recipedata"
            element={
              <ProtectedRoute >
                    {
                      loading ? (<Spinner/>) : (<RecipeData/>)
                    }
              </ProtectedRoute>
            }
          />

          <Route
            path="/recipe/:id"
            element={
              <ProtectedRoute >
                                      {
                      loading ? (<Spinner/>) : (<RecipeId/>)
                    }
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

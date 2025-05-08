import './App.css';
import Signup from './pages/signup';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from './pages/login';
import ProtectedRoute from './routes/protected';
import Products from './components/products';
import Product from './components/products/product';


function App() {
  return (
    <>
         <BrowserRouter>
        <Routes>

          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute >
                  <Products/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute >
                  <Product/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

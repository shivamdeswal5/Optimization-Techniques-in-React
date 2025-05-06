
import { Navigate } from 'react-router-dom';
interface Props{
  children:React.ReactNode
}
const ProtectedRoute = ({ children} : Props) => {
  const currentUser = sessionStorage.getItem("currentUser");

  if (!currentUser) {
    alert("Proteected Route");
    return <Navigate to='/login'/>;
  }
  return children; 
};

export default ProtectedRoute;
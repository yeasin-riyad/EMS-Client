import { Outlet, useNavigate } from 'react-router-dom'
import GlobalContextProvider from './provider/GlobalContextProvider';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const App = () => {
   const user = useSelector((state) => state?.user);
     const navigate=useNavigate()


   useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
 
  
  return (
    <GlobalContextProvider>
      <div className="">
      
        
      <Outlet/>
    </div>
    </GlobalContextProvider>
  )
}

export default App

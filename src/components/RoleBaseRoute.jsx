import React from 'react'
import { useSelector } from 'react-redux';
import { useGlobalContext } from '../provider/GlobalContextProvider';
import UnauthorizedAccess from '../pages/UnauthorizedAccess ';
import { Navigate } from 'react-router-dom';
import Loading from './Loading';

const RoleBaseRoute = ({children,requiredRole}) => {
     const user = useSelector((state) => state?.user);
      const {userIsLoading}=useGlobalContext()

      if(userIsLoading){
        return <Loading/>
      }

      if(user?.role && !requiredRole.includes(user.role)){
        return <UnauthorizedAccess/>
      }else{
        return user?._id ? children : <Navigate to="/login"/>
      }
 
}

export default RoleBaseRoute

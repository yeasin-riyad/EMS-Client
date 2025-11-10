import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../provider/GlobalContextProvider';
import Loading from './Loading'; // Assuming it's a spinner or something

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state?.user);
  const { userIsLoading } = useGlobalContext();

  console.log(userIsLoading, "User is Loading......");
  console.log(user, "from private route");

  // When loading, show loading spinner
  if (userIsLoading) {
    return <Loading />;
  }

  // If no user found, redirect
  if (!user || !user._id) {
    return <Navigate to="/login" />;
  }

  // If user exists, render children
  return children;
};

export default PrivateRoute;

import React, { useContext } from 'react';
import { AuthContext } from './authContext';

function ProtectedRoute ({children}) {
  const {user} = useContext(AuthContext);
  if (user === null) {
    return <Route to="/" />;
  }
  return children;
}


export default ProtectedRoute;
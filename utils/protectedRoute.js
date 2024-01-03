import React, { useContext } from 'react';
import { AuthContext } from './authContext';
import { useRouter } from 'next/navigation';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (!user) {
    router.push('/'); // Redirect to the home page if the user is not authenticated
    return null; // Render nothing while redirecting
  }

  return children;
}

export default ProtectedRoute;
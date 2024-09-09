// components/ProtectedRoute.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../firebase'; 

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    const checkAuthentication = async () => {
      const user = auth.currentUser;

      if (!user) {
        // If the user is not authenticated, redirect to the login page
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router, auth]);

  return <>{children}</>;
};

export default ProtectedRoute;

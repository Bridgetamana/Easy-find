import { useContext } from 'react';
import { AuthContext } from '../context//authContext';
import { useRouter } from 'next/navigation';
import secureLocalStorage from "react-secure-storage";
import { useEffect, useState } from 'react';
import { useAuth } from '../firebase';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user } = useAuth(); // Destructure user directly if your context provides it this way
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // If the user is not authenticated, redirect to the login page
      router.push('/login');
    } else {
      setLoading(false); // User is authenticated, allow rendering of children
    }
  }, [user, router]);

  if (loading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return <>{children}</>;
};

export default ProtectedRoute;
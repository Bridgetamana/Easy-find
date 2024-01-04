import { useContext } from 'react';
import { AuthContext } from './authContext';
import { useRouter } from 'next/navigation';

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (!user) {
    router.push('/'); 
    return null; 
  }

  return children;
}

export default ProtectedRoute;
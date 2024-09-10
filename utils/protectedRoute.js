import { useContext } from 'react';
import { AuthContext } from '../context//authContext';
import { useRouter } from 'next/navigation';
import secureLocalStorage from "react-secure-storage";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const token = secureLocalStorage.getItem("userToken");

  if (!user || !token) {
    router.push("/signin");
    return null;
  }

  return children;
}

export default ProtectedRoute;
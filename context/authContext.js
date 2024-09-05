import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebaseConfig/firebase';
import { createContext, useContext, useEffect, useState } from 'react';
import LoadingScreen from '@/components/utils/Loaders/Loader';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const [authData, setAuthData] = useState({ phoneNumber: null, confirmationResult: null });

  const setPhoneAuthData = (phoneNumber, confirmationResult) => {
    setAuthData({ phoneNumber, confirmationResult });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuthState(false);
    });

    return () => unsubscribe();  
  }, []);

  if (loadingAuthState) {
    return <LoadingScreen />; 
  }

  const contextValue = {
    user,
    loadingAuthState,
    authData,
    setPhoneAuthData,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
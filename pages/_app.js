import { AuthProvider } from '@/context/authContext'; 
import { UserContext } from '@/context/userContext';
import '../styles/global.scss'; 
import { UserProvider } from '../context/userContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserProvider>
      <Component {...pageProps} />
      </UserProvider>
    </AuthProvider>
  );
}

export default MyApp;

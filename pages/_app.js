import { AuthProvider } from '../utils/authContext'; 
import { UserContext } from '../context/userContext';
import '../styles/global.scss'; 

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserContext>
      <Component {...pageProps} />
      </UserContext>
    </AuthProvider>
  );
}

export default MyApp;

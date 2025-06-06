// pages/_app.jsx
import Layout from '@/components/Layout';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../styles/globals.css';

import { AuthProvider, AuthContext } from '@/context/AuthContext';
import { useEffect, useContext, useRef } from 'react';
import AuthGuard from '@/components/auth/AuthGuard';
import { patchGlobalFetch } from '@/utils/interceptedFetch';

function AppContent({ Component, pageProps }) {
  const { token, updateToken, isValidToken } = useContext(AuthContext);
  const intervalRef = useRef(null);

  useEffect(() => {
    patchGlobalFetch(token, updateToken);



    if (!token) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const checkToken = async () => {
      const isValid = await isValidToken();
      if (isValid) {
        updateToken(token);
      } else {
        updateToken(null);
        clearInterval(intervalRef.current);
      }
    };
    checkToken();
    intervalRef.current = setInterval(checkToken, 4 * 60 * 1000);
    return () => clearInterval(intervalRef.current);
  }, [token]);

  const PageComponent = Component.auth ? (
    <AuthGuard>
      <Component {...pageProps} />
    </AuthGuard>
  ) : (
    <Component {...pageProps} />
  );

  return <Layout>{PageComponent}</Layout>;
}

function MyApp(props) {
  return (
    <AuthProvider>
      <AppContent {...props} />
    </AuthProvider>
  );
}

export default MyApp;

// pages/_app.jsx
import Layout from '@/components/Layout';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../styles/globals.css';

import { AuthProvider, AuthContext } from '@/context/AuthContext';
import { useEffect, useContext } from 'react';
import AuthGuard from '@/components/auth/AuthGuard';
import { patchGlobalFetch } from '@/utils/interceptedFetch';

function AppContent({ Component, pageProps }) {
  const { token, updateToken } = useContext(AuthContext);

  useEffect(() => {
    patchGlobalFetch(token, updateToken);
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

// pages/_app.jsx
import Layout from '@/components/Layout';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import '../styles/globals.css';
import { AuthProvider, AuthContext } from '@/context/AuthContext';
import { useContext, useEffect } from 'react';
import AlertNoAutenticado from '@/components/auth/AlertNoAutenticado';
import { patchGlobalFetch } from '@/utils/interceptedFetch';

function AuthGuard({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Cargando...</div>;
  if (!user) return <AlertNoAutenticado />;

  return children;
}

function MyApp({ Component, pageProps }) {
  const PageComponent = Component.auth ? (
    <AuthGuard>
      <Component {...pageProps} />
    </AuthGuard>
  ) : (
    <Component {...pageProps} />
  );

  useEffect(() => {
    patchGlobalFetch();
  }, []);

  return (
    <AuthProvider>
      <Layout>{PageComponent}</Layout>
    </AuthProvider>
  );
}

export default MyApp;

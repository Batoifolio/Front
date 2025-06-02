import Layout from '@/components/Layout';
import '../styles/globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AuthProvider } from '@/context/AuthContext';



function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;

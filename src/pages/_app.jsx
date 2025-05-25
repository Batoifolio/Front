import Layout from '../components/Layout';
import '../styles/globals.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';


function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

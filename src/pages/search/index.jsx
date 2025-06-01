import React, { useEffect } from 'react';
import { withAuth } from '@/utils/auth/withAuth';
import { withAuthPage } from '@/utils/auth/withAuthPage';

export const getServerSideProps = withAuth();

const AboutPage = ({ user }) => {
    useEffect(() => {
        document.title = 'Batoifolio - Sobre Nosotros';
    }, []);
    return (
        <div>
            <h1>About Page</h1>
            <p>Hola, {user?.name} 👋</p>
        </div>
    );
};

export default withAuthPage(AboutPage);


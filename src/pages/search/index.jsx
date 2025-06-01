import React, { useEffect } from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import UnauthorizedRequiredLogin from '../../components/UnauthorizedRequiredLogin';

export async function getServerSideProps(ctx) {
    const { token } = nookies.get(ctx);

    let isAuthorized = false;

    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            isAuthorized = true;
        } catch (err) {
            isAuthorized = false;
        }
    }

    return {
        props: {
            isAuthorized,
        },
    };
}

const AboutPage = ({ isAuthorized }) => {
    useEffect(() => {
        document.title = 'Batoifolio - Buscar';
    }, []);

    if (!isAuthorized) {
        return <UnauthorizedRequiredLogin />;
    }

    return (
        <div>
            <h1>About Page</h1>
            <p>This is the about page content.</p>
        </div>
    );
};

export default AboutPage;

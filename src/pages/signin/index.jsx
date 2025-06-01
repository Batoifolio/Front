import React, { useEffect } from 'react';

const AboutPage = () => {
    useEffect(() => {
        document.title = 'Batoifolio - Sign In';
    }, []);
    return (
        <div>
            <h1>About Page</h1>
            <p>This is the about page content.</p>
        </div>
    );
};

export default AboutPage;
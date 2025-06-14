import React, { useEffect } from 'react';
import styles from './style.module.css';

const AboutPage = () => {
    useEffect(() => {
        document.title = 'Batoifolio - Sobre Nosotros';
    }, []);

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <h2 className={styles.title}>
                    Sobre Batoi<span className={styles.folio}>Folio</span>
                </h2>

                <p className={styles.subtitle}>
                    <strong>Batoifolio</strong> nace de la combinación de <strong>Batoi</strong> y <strong>Portfolio</strong>, como una
                    plataforma pensada para dar visibilidad a los talentos de nuestro centro educativo. Aquí los alumnos pueden mostrar sus
                    <strong> currículums</strong> y <strong>proyectos realizados</strong>, facilitando a las empresas encontrar perfiles
                    adecuados para prácticas, FCT o contratos.
                </p>
            </section>

            <div className={styles.cardsContainer}>
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Visibilidad</h3>
                    <p className={styles.cardText}>
                        Ayudamos a los alumnos a mostrar sus habilidades, trabajos y experiencia.
                    </p>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Facilidad</h3>
                    <p className={styles.cardText}>
                        Las tutoras pueden gestionar y filtrar los perfiles para contactar con las empresas más adecuadas.
                    </p>
                </div>

                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>Oportunidad</h3>
                    <p className={styles.cardText}>
                        Las empresas pueden descubrir fácilmente los perfiles que mejor se adaptan a sus necesidades.
                    </p>
                </div>
                <div className={styles.marqueeContainer}>
                    <div className={styles.marqueeTrack}>
                        {/* Contenido original */}
                        {[...Array(4)].map((_, i) => (
                            <>
                                <a href="https://www.linkedin.com/">
                                    <div key={`item0-${i}`} className={styles.item}>
                                        <img src="/LinkedIn.png" alt="LinkedIn" />
                                        <span>LinkedIn</span>
                                    </div>
                                </a>
                                <a href="https://devfolio.co/">
                                    <div key={`item2-${i}`} className={styles.item}>
                                        <img src="/DevFolio.png" alt="DevFolio" />
                                        <span>Devfolio</span>
                                    </div>
                                </a>
                                <a href="https://www.infojobs.net/">
                                    <div key={`item3-${i}`} className={styles.item}>
                                        <img src="/InfoJobs.png" alt="InfoJobs" />
                                        <span>InfoJobs</span>
                                    </div>
                                </a>
                            </>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AboutPage;

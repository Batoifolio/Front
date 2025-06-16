import React, { useEffect } from 'react';
import styles from './index.module.css';

export default function Home() {
  useEffect(() => {
    document.title = 'Batoifolio - Inicio';
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h2 className={styles.title}>Bienvenido a Batoi<span className={styles.folio}>Folio</span></h2>

        <p className={styles.subtitle}>
          Una plataforma para <strong>destacar los talentos</strong> de los alumnos del <strong>CIP FP Batoi</strong>. Explora perfiles,
          proyectos y encuentra oportunidades de <span className={styles.highlight}>FCT o DUAL</span>.
        </p>
      </section>

      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Explora perfiles</h3>
          <p className={styles.cardText}>Consulta la información profesional de los alumnos.</p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Descubre proyectos</h3>
          <p className={styles.cardText}>Visualiza trabajos, proyectos y experiencias reales.</p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Conecta con empresas</h3>
          <p className={styles.cardText}>Facilitamos el contacto entre alumnos y empresas colaboradoras.</p>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Oportunidades reales</h3>
          <p className={styles.cardText}>Accede a ofertas de FCT, DUAL o contratos laborales.</p>
        </div>
      </div>

    </div>
  );
}

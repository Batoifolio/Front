import React, { useEffect, useState } from 'react';
import styles from './style.module.css';

const allFilters = {
    Carrera: ['Ingeniería', 'Diseño', 'Negocios', 'Artes'],
    Habilidades: ['React', 'Python', 'Figma', 'Excel'],
    Nivel: ['Principiante', 'Intermedio', 'Avanzado'],
};

function SearchPage() {
    const [search, setSearch] = useState('');
    const [activeFilters, setActiveFilters] = useState([]);

    useEffect(() => {
        document.title = 'Batoifolio - Buscar Alumnos';
    }, []);

    const toggleFilter = (filter) => {
        setActiveFilters((prev) =>
            prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
        );
    };

    const clearFilter = (filter) => {
        setActiveFilters((prev) => prev.filter((f) => f !== filter));
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Buscar Alumnos</h1>

            <input
                type="text"
                className={styles.input}
                placeholder="Buscar por nombre, proyecto, etc."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {Object.entries(allFilters).map(([category, values]) => (
                <div key={category} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{category}</h2>
                    <div className={styles.badgeContainer}>
                        {values.map((value) => (
                            <span
                                key={value}
                                className={`${styles.badge} ${activeFilters.includes(value)
                                    ? styles.badgeDefault
                                    : styles.badgeOutline
                                    }`}
                                onClick={() => toggleFilter(value)}
                            >
                                {value}
                            </span>
                        ))}
                    </div>
                </div>
            ))}

            {activeFilters.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Filtros Activos</h2>
                    <div className={styles.badgeContainer}>
                        {activeFilters.map((filter) => (
                            <span
                                key={filter}
                                className={`${styles.badge} ${styles.badgeDefault}`}
                            >
                                {filter}
                                <i
                                    className={`bi bi-x ${styles.icon}`}
                                    onClick={() => clearFilter(filter)}
                                />
                            </span>
                        ))}
                        <button
                            className={styles.clearButton}
                            onClick={() => setActiveFilters([])}
                        >
                            Limpiar todo
                        </button>
                    </div>
                </div>
            )}

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Resultados</h2>
                <p className={styles.resultText}>[Aquí se mostrarían los resultados filtrados]</p>
            </div>
        </div>

    );
}

SearchPage.auth = true;

export default SearchPage;

'use client';
import React from 'react';
import styles from './Paginate.module.css'; // renombrado el css

function Paginate({ paginate, page, onPageChange }) {
    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > paginate.totalPages) return;
        onPageChange(pageNumber);
    };

    const pageNumbers = [];
    for (let i = 0; i < 5; i++) {
        const pageNumber = page + i;
        if (pageNumber <= paginate.totalPages) {
            pageNumbers.push(pageNumber);
        }
    }

    return (
        <div className={styles.paginate}>
            <button
                className={styles.prevButton}
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
            >
                Anterior
            </button>

            <span className={styles.pageInfo}>
                Página {page} de {paginate.totalPages}
            </span>

            {/* Si quieres activar los numeritos descomenta */}
            {/*
            <div>
                {pageNumbers.map((num) => (
                    <button
                        key={num}
                        className={`${styles.pageButton} ${num === page ? styles.activePage : ''}`}
                        onClick={() => handlePageChange(num)}
                    >
                        {num}
                    </button>
                ))}
            </div>
            */}

            <button
                className={styles.nextButton}
                onClick={() => handlePageChange(page + 1)}
                disabled={page === paginate.totalPages}
            >
                Siguiente
            </button>
        </div>
    );
}

export default Paginate;

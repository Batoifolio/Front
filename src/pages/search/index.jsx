'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './style.module.css';
import stylesCard from './card.module.css';
import Swal from 'sweetalert2';

const api = process.env.NEXT_PUBLIC_API_URL;

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

            {/* Si quieres los numeritos, descomenta esto */}
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

function SearchPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const pageParam = searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginate, setPaginate] = useState({
        totalPages: 1,
        totalItems: 0,
        limit: 10,
        currentPage: 1,
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${api}users/filter/?page=${page}&limit=10`);
                const res = await response.json();

                if (res) {
                    setData(res.data);
                    setPaginate(res.pagination);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > paginate.totalPages) return;
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage);
        router.push(`/search?${params.toString()}`);
    };

    const openProfile = async (id) => {
        const card = document.getElementById(`${id}`);
        if (card) {
            card.classList.add(stylesCard.active);
        }
        await Swal.fire({
            title: 'Perfil del Alumno',
            text: `ID del Alumno: ${id}`,
            icon: 'info',
            confirmButtonText: 'Aceptar',
        }).finally(() => {
            setTimeout(() => {
                card.classList.remove(stylesCard.active);
            }, 3000);
        });
    };

    if (loading) {
        return <div className={styles.loading}>Cargando...</div>;
    }

    if (!data || data.length === 0) {
        return <div className={styles.noData}>No hay alumnos disponibles</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Buscar Alumnos</h1>
            <Paginate paginate={paginate} page={page} onPageChange={handlePageChange} />
            <div className={styles.cards}>
                {data.map((item) => (
                    <div key={item.id} id={item.id} className={`${stylesCard.card}`}>
                        <div className={stylesCard.buttons} onClick={() => openProfile(item.id)}>
                            <button type="button" className={stylesCard.see}>
                                <i className="bi bi-eyeglasses"></i>
                            </button>
                        </div>
                        <img src={item.fotoPerfil} alt={`${item.nombre} ${item.apellidos}`} className={stylesCard.image} />
                        <h2 className={stylesCard.name}>{item.nombre} {item.apellidos}</h2>
                        <p className={stylesCard.username}>@{item.username}</p>
                        <p className={stylesCard.email}>{item.email}</p>
                        <p className={stylesCard.pueblo}>{item.pueblo}</p>
                        <p className={stylesCard.grado}>Grado: {item.grado.nombre}</p>
                        <p className={stylesCard.rama}>Rama: {item.rama.nombre}</p>
                        {item.descripcion && <p className={stylesCard.descripcion}>{item.descripcion}</p>}
                    </div>
                ))}
            </div>
            <Paginate paginate={paginate} page={page} onPageChange={handlePageChange} />
        </div>
    );
}

SearchPage.auth = true;

export default SearchPage;

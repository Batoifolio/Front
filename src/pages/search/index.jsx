'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Paginate from '@/components/Paginate';
import UserCard from '@/components/UserCard';
import styles from './style.module.css';
import Loader from '@/components/Loader';

const api = process.env.NEXT_PUBLIC_API_URL;

function Filter({ filter, setFilter }) {
    const [fields, setFields] = useState({
        nombre: filter.nombre || '',
        email: filter.email || '',
        pueblo: filter.pueblo || '',
        gradoId: filter.gradoId || '',
        ramaId: filter.ramaId || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFilter({
            nombre: fields.nombre,
            email: fields.email,
            pueblo: fields.pueblo,
            gradoId: fields.gradoId,
            ramaId: fields.ramaId,
        });
        // Aquí asumo que el submit hará la búsqueda (o cambiará la url)
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={fields.nombre}
                onChange={handleChange}
                className={`${styles.formInput} ${styles.nombre}`}
            />
            <input
                type="text"
                name="email"
                placeholder="Email"
                value={fields.email}
                onChange={handleChange}
                className={`${styles.formInput} ${styles.email}`}
            />
            <input
                type="text"
                name="pueblo"
                placeholder="Pueblo"
                value={fields.pueblo}
                onChange={handleChange}
                className={`${styles.formInput} ${styles.pueblo}`}
            />
            <input
                type="text"
                name="ramaId"
                placeholder="Rama ID"
                value={fields.ramaId}
                onChange={handleChange}
                className={`${styles.formInput} ${styles.ramaId}`}
            />
            <input
                type="text"
                name="gradoId"
                placeholder="Grado ID"
                value={fields.gradoId}
                onChange={handleChange}
                className={`${styles.formInput} ${styles.gradoId}`}
            />
            <button type="submit" className={styles.button}>Buscar</button>
        </form>
    );
}




function SearchPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const pageParam = searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    // const [page, setPage] = useState(pageParam ? parseInt(pageParam, 10) : 1);
    if (isNaN(page) || page < 1) {
        router.push('/search?page=1');
    }

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginate, setPaginate] = useState({
        totalPages: 1,
        totalItems: 0,
        limit: 10,
        currentPage: 1,
    });
    const [filter, setFilter] = useState({
        nombre: searchParams.get('nombre') || '',
        email: searchParams.get('email') || '',
        pueblo: searchParams.get('pueblo') || '',
        gradoId: searchParams.get('gradoId') || '',
        ramaId: searchParams.get('ramaId') || '',
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let query = '';
                if (filter.nombre) query += `nombre=${filter.nombre}&`;
                if (filter.email) query += `email=${filter.email}&`;
                if (filter.pueblo) query += `pueblo=${filter.pueblo}&`;
                if (filter.gradoId) query += `gradoId=${filter.gradoId}&`;
                if (filter.ramaId) query += `ramaId=${filter.ramaId}&`;

                const response = await fetch(`${api}users/filter/?page=${page}&limit=10&${query}`);
                const res = await response.json();

                if (res) {
                    setData(res.data);
                    setPaginate(res.pagination);
                    if (res.pagination?.totalPages != undefined && page > res.pagination.totalPages) {
                        router.push(`/search?page=${res.pagination.totalPages}`);
                    }

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };
        fetchData();
    }, [page, filter]);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > paginate.totalPages) return;
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage);
        router.push(`/search?${params.toString()}`);
    };

    if (loading) {
        return (<Loader show={loading} />);
    }

    if (!data || data.length === 0) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Buscar Alumnos</h1>
                <Filter filter={filter} setFilter={setFilter} setPage={setPage} />
                <Paginate paginate={paginate} page={page} onPageChange={handlePageChange} />
                <div>No se han encontrado Alumnos.</div>
                <Paginate paginate={paginate} page={page} onPageChange={handlePageChange} />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Buscar Alumnos</h1>
            <Filter filter={filter} setFilter={setFilter} />
            <Paginate paginate={paginate} page={page} onPageChange={handlePageChange} />
            <div className={styles.cards}>
                {data.map((item) => (
                    <UserCard key={item.id} item={item} />
                ))}
            </div>
            <Paginate paginate={paginate} page={page} onPageChange={handlePageChange} />
        </div>
    );
}

SearchPage.auth = true;

export default SearchPage;

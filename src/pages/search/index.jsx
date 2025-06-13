'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Paginate from '@/components/Paginate';
import UserCard from '@/components/UserCard';
import styles from './style.module.css';
import Loader from '@/components/Loader';

const api = process.env.NEXT_PUBLIC_API_URL;

function Filter({ filter, onSubmit }) {
    const [fields, setFields] = useState(filter);

    useEffect(() => {
        setFields(filter); // sincronizamos si los filtros cambian desde fuera
    }, [filter]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(fields);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <input type="text" name="nombre" placeholder="Nombre" value={fields.nombre} onChange={handleChange} className={`${styles.formInput} ${styles.nombre}`} />
            <input type="text" name="email" placeholder="Email" value={fields.email} onChange={handleChange} className={`${styles.formInput} ${styles.email}`} />
            <input type="text" name="pueblo" placeholder="Pueblo" value={fields.pueblo} onChange={handleChange} className={`${styles.formInput} ${styles.pueblo}`} />
            <input type="text" name="ramaId" placeholder="Rama ID" value={fields.ramaId} onChange={handleChange} className={`${styles.formInput} ${styles.ramaId}`} />
            <input type="text" name="gradoId" placeholder="Grado ID" value={fields.gradoId} onChange={handleChange} className={`${styles.formInput} ${styles.gradoId}`} />
            <button type="submit" className={styles.button}>Buscar</button>
        </form>
    );
}

function SearchPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({
        nombre: '',
        email: '',
        pueblo: '',
        gradoId: '',
        ramaId: '',
    });

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginate, setPaginate] = useState({
        totalPages: 1,
        totalItems: 0,
        limit: 10,
        currentPage: 1,
    });

    // Este effect inicializa el estado a partir de la URL
    useEffect(() => {
        const pageParam = parseInt(searchParams.get('page') || '1', 10);
        setPage(isNaN(pageParam) || pageParam < 1 ? 1 : pageParam);

        setFilter({
            nombre: searchParams.get('nombre') || '',
            email: searchParams.get('email') || '',
            pueblo: searchParams.get('pueblo') || '',
            gradoId: searchParams.get('gradoId') || '',
            ramaId: searchParams.get('ramaId') || '',
        });
    }, [searchParams]);

    // Cada vez que cambian filtros o página -> fetch
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const query = new URLSearchParams();

                if (filter.nombre) query.append('nombre', filter.nombre);
                if (filter.email) query.append('email', filter.email);
                if (filter.pueblo) query.append('pueblo', filter.pueblo);
                if (filter.gradoId) query.append('gradoId', filter.gradoId);
                if (filter.ramaId) query.append('ramaId', filter.ramaId);

                const response = await fetch(`${api}users/filter/?page=${page}&limit=10&${query.toString()}`);
                const res = await response.json();

                if (res) {
                    setData(res.data);
                    setPaginate(res.pagination);
                    if (res.pagination?.totalPages != undefined && page > res.pagination.totalPages) {
                        const params = new URLSearchParams('');
                        Object.entries(filter).forEach(([key, value]) => {
                            if (key !== 'page' && value) params.set(key, value);
                        });
                        const query = params.toString()
                        router.push(`/search?page=${res.pagination.totalPages}&${query}`);
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

    const handleFilterSubmit = (newFilter) => {
        const params = new URLSearchParams();

        Object.entries(newFilter).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });

        params.set('page', '1'); // reset de página al buscar
        router.push(`/search?${params.toString()}`);
    };

    if (loading) {
        return (<Loader show={loading} />);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Buscar Alumnos</h1>
            <Filter filter={filter} onSubmit={handleFilterSubmit} />
            <Paginate paginate={paginate} page={page} onPageChange={handlePageChange} />
            <div className={styles.cards}>
                {data !== undefined && data !== null && data.length > 0 ? (
                    data.map((item) => <UserCard key={item.id} item={item} />)
                ) : (
                    <div>No se han encontrado Alumnos.</div>
                )}
            </div>
            <Paginate paginate={paginate} page={page} onPageChange={handlePageChange} />
        </div>
    );
}

SearchPage.auth = true;
export default SearchPage;

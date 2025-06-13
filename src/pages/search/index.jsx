'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Paginate from '@/components/Paginate/Paginate';
import UserCard from '@/components/User/Card/UserCard';
import styles from './style.module.css';
import Loader from '@/components/Loader';
import Filter from '@/components/User/Filter/UserFilter';

const api = process.env.NEXT_PUBLIC_API_URL;

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

                    const totalPages = res.pagination?.totalPages ?? 0;

                    if (totalPages === 0) {
                        // No hay resultados, nos quedamos en página 1
                        if (page !== 1) {
                            const params = new URLSearchParams('');
                            Object.entries(filter).forEach(([key, value]) => {
                                if (value) params.set(key, value);
                            });
                            router.push(`/search?page=1&${params.toString()}`);
                        }
                    } else if (page > totalPages) {
                        // Página fuera de rango, redirigir a la última válida
                        const params = new URLSearchParams('');
                        Object.entries(filter).forEach(([key, value]) => {
                            if (value) params.set(key, value);
                        });
                        router.push(`/search?page=${totalPages}&${params.toString()}`);
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
            {paginate?.totalPages !== undefined && paginate.totalPages > 0 && (
                <Paginate paginate={paginate} page={page} onPageChange={handlePageChange} />
            )}

            <div className={styles.cards}>
                {data !== undefined && data !== null && data.length > 0 ? (
                    data.map((item) => <UserCard key={item.id} item={item} />)
                ) : (
                    <div>No se han encontrado Alumnos.</div>
                )}
            </div>
            {paginate?.totalPages !== undefined && paginate.totalPages > 0 && (
                <Paginate paginate={paginate} page={page} onPageChange={handlePageChange} />
            )}

        </div>
    );
}

SearchPage.auth = true;
export default SearchPage;

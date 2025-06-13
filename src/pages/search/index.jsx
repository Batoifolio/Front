'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Paginate from '@/components/Paginate';
import UserCard from '@/components/UserCard';
import styles from './style.module.css';
import Loader from '@/components/Loader';

const api = process.env.NEXT_PUBLIC_API_URL;

function SearchPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const pageParam = searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${api}users/filter/?page=${page}&limit=10`);
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
    }, [page]);

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
        return <div className={styles.noData}>No hay alumnos disponibles</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Buscar Alumnos</h1>
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

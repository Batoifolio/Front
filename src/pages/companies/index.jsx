'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Paginate from '@/components/Paginate/Paginate';
import CompanyCard from '@/components/Companies/Card/CompaniesCard';
import styles from './style.module.css';
import Loader from '@/components/Loader';

const api = process.env.NEXT_PUBLIC_API_URL;

function CompaniesPage() {
    const companiesParams = useSearchParams();
    const router = useRouter();

    const [page, setPage] = useState(1);

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
        const pageParam = parseInt(companiesParams.get('page') || '1', 10);
        setPage(isNaN(pageParam) || pageParam < 1 ? 1 : pageParam);
    }, [companiesParams]);

    // Cada vez que cambian filtros o página -> fetch
    useEffect(() => {
        document.title = 'Batoifolio - Empresas';
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${api}empresas/?page=${page}&limit=10`);
                const res = await response.json();

                if (res) {
                    setData(res.data);
                    setPaginate(res.pagination);

                    const totalPages = res.pagination?.totalPages ?? 0;

                    if (totalPages === 0) {
                        // No hay resultados, nos quedamos en página 1
                        if (page !== 1) {
                            router.push(`/companies?page=1`);
                        }
                    } else if (page > totalPages) {
                        router.push(`/companies?page=${totalPages}`);
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
        const params = new URLSearchParams('');
        params.set('page', newPage);
        router.push(`/companies?${params.toString()}`);
    };

    if (loading) {
        return (<Loader show={loading} />);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Empresas</h1>
            {paginate?.totalPages !== undefined && paginate.totalPages > 0 && (
                <Paginate paginate={paginate} page={page} onPageChange={handlePageChange} />
            )}

            <div className={styles.cards}>
                {data !== undefined && data !== null && data.length > 0 ? (
                    data.map((item) => <CompanyCard key={item.id} item={item} />)
                ) : (
                    <div>No se han encontrado Empresas.</div>
                )}
            </div>
            {paginate?.totalPages !== undefined && paginate.totalPages > 0 && (
                <Paginate paginate={paginate} page={page} onPageChange={handlePageChange} />
            )}

        </div>
    );
}

CompaniesPage.auth = true;
export default CompaniesPage;

'use client';
import React, { useEffect, useState } from 'react';
import styles from './style.module.css';

const api = process.env.NEXT_PUBLIC_API_URL;

export default function Filter({ filter, onSubmit }) {
    const [fields, setFields] = useState(filter);
    const [grados, setGrados] = useState([]);
    const [ramas, setRamas] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const resGrados = await fetch(`${api}grados/`);
                const dataGrados = await resGrados.json();
                setGrados(Array.isArray(dataGrados.data) ? dataGrados.data : []);

                const resRamas = await fetch(`${api}ramas/`);
                const dataRamas = await resRamas.json();
                setRamas(Array.isArray(dataRamas.data) ? dataRamas.data : []);
            } catch (err) {
                console.error(err);
                setGrados([]);
                setRamas([]);
            }
        }
        fetchData();
        setFields(filter);
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

            <select name="ramaId" value={fields.ramaId} onChange={handleChange} className={`${styles.formInput} ${styles.ramaId}`}>
                <option value="">Selecciona una rama</option>
                {ramas && ramas.length > 0 ? (
                    ramas.map(rama => (
                        <option key={rama.id} value={rama.id}>{rama.nombre}</option>
                    ))
                ) : (
                    <option disabled>No hay ramas disponibles</option>
                )}
            </select>

            <select name="gradoId" value={fields.gradoId} onChange={handleChange} className={`${styles.formInput} ${styles.gradoId}`}>
                <option value="">Selecciona un grado</option>
                {grados && grados.length > 0 ? (
                    grados.map(grado => (
                        <option key={grado.id} value={grado.id}>{grado.nombre}</option>
                    ))
                ) : (
                    <option disabled>No hay grados disponibles</option>
                )}
            </select>

            <button type="submit" className={styles.button}>Buscar</button>
        </form>
    );
}

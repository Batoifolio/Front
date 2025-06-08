import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import BackArrow from '@/components/BackArrow';
import Link from 'next/link';
import styles from './style.module.css';

function ExperienceItem({ index, data }) {
    return (
        <div className={styles.experienceItem}>
            <div className={styles.experienceHeader}>
                <strong>Experiencia #{index + 1}</strong>
            </div>
            <p><strong>Empresa:</strong> {data.empresa}</p>
            <p><strong>Cargo:</strong> {data.cargo}</p>
            <p><strong>Descripción:</strong> {data.descripcion}</p>
            <p><strong>Fecha Inicio:</strong> {data.fechaInicio}</p>
            <p><strong>Fecha Fin:</strong> {data.fechaFin}</p>
        </div>
    );
}

function CurriculumViewPage() {
    const { user } = useContext(AuthContext);
    const [curriculum, setCurriculum] = useState({
        titulo: '',
        resumen: '',
        experiencia: [],
        educacion: '',
        habilidades: ''
    });

    useEffect(() => {
        document.title = 'Batoifolio - Currículum';
        const fetchCurriculum = async () => {
            try {
                // const res = await fetch(`/api/curriculum/${user.id}`);
                // const data = await res.json();
                const data = {};
                if (data?.curriculum) {
                    setCurriculum({
                        titulo: data.curriculum.titulo || '',
                        resumen: data.curriculum.resumen || '',
                        experiencia: (data.curriculum.experiencia || []).map((exp) => ({
                            ...exp,
                            id: exp.id || crypto.randomUUID()
                        })),
                        educacion: data.curriculum.educacion || '',
                        habilidades: data.curriculum.habilidades || ''
                    });
                }
            } catch (err) {
                console.error('Error al cargar el currículum:', err);
            }
        };
        if (user?.id) fetchCurriculum();
    }, [user]);

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <BackArrow href="/profile" label="Perfil" />
                <div className={styles.avatar}>
                    <img src={user.fotoPerfil || '/default-avatar.png'} alt="Avatar" />
                </div>
                <div className={styles.userInfo}>
                    <h1><strong>Currículum de:</strong> @{user.username}</h1>
                </div>
            </div>

            <div className={styles.mainInfo}>
                <div className={styles.cardSection}>
                    <label><strong>Título Profesional</strong></label>
                    <p>{curriculum.titulo}</p>
                </div>

                <div className={styles.cardSection}>
                    <label><strong>Resumen Profesional</strong></label>
                    <p>{curriculum.resumen}</p>
                </div>

                <div className={styles.cardSection}>
                    <label><strong>Experiencia Laboral</strong></label>
                    {curriculum.experiencia.length === 0 && <p>No hay experiencias registradas.</p>}
                    {curriculum.experiencia.map((exp, index) => (
                        <ExperienceItem key={exp.id} index={index} data={exp} />
                    ))}
                </div>

                <div className={styles.cardSection}>
                    <label><strong>Educación</strong></label>
                    <p>{curriculum.educacion}</p>
                </div>

                <div className={styles.cardSection}>
                    <label><strong>Habilidades</strong></label>
                    <p>{curriculum.habilidades}</p>
                </div>
                <div className={styles.buttons}>
                    <button type="submit" className={styles.editButton}>
                        Descargar Currículum
                    </button>
                    <Link href="/profile/curriculum/edit" className={styles.editButton}>
                        Editar Currículum
                    </Link>
                </div>
            </div>
        </div>
    );
}

CurriculumViewPage.auth = true;

export default CurriculumViewPage;

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import BackArrow from '@/components/BackArrow';
import Link from 'next/link';
import styles from './style.module.css';
import dynamic from 'next/dynamic';
const PDFViewer = dynamic(() => import('@/components/Curriculum/CurriculumPDF'), { ssr: false });

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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

function EducationItem({ index, data }) {
    return (
        <div className={styles.experienceItem}>
            <div className={styles.experienceHeader}>
                <strong>Educación #{index + 1}</strong>
            </div>
            <p><strong>Institución:</strong> {data.institucion}</p>
            <p><strong>Título:</strong> {data.titulo}</p>
            <p><strong>Descripción:</strong> {data.descripcion}</p>
            <p><strong>Fecha Inicio:</strong> {data.fechaInicio}</p>
            <p><strong>Fecha Fin:</strong> {data.fechaFin}</p>
        </div>
    );
}
function IdiomaItem({ index, data }) {
    return (
        <div className={styles.experienceItem}>
            <div className={styles.experienceHeader}>
                <strong>Idioma #{index + 1}</strong>
            </div>
            <p><strong>Idioma:</strong> {data.idioma}</p>
            <p><strong>Nivel:</strong> {data.nivel}</p>
        </div>
    );
}

function CurriculumViewPage() {
    const { user } = useContext(AuthContext);
    const [curriculum, setCurriculum] = useState({
        titulo: '',
        resumen: '',
        experiencia: [],
        educacion: [],
        habilidades: [],
        idiomas: []
    });

    useEffect(() => {
        document.title = 'Batoifolio - Currículum';

        const fetchCurriculum = async () => {
            try {
                const res = await fetch(`${apiUrl}users/${user.id}/curriculum`);
                const data = await res.json();

                if (data?.data) {
                    setCurriculum({
                        titulo: data.data.titulo || '',
                        resumen: data.data.resumen || '',
                        experiencia: data.data.experiencia || [],
                        educacion: data.data.educacion || [],
                        habilidades: data.data.habilidades || [],
                        idiomas: data.data.idiomas || []
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
                    {curriculum.experiencia.length === 0 ? (
                        <p>No hay experiencias registradas.</p>
                    ) : (
                        curriculum.experiencia.map((exp, index) => (
                            <ExperienceItem key={exp.id} index={index} data={exp} />
                        ))
                    )}
                </div>

                <div className={styles.cardSection}>
                    <label><strong>Educación</strong></label>
                    {curriculum.educacion.length === 0 ? (
                        <p>No hay registros educativos.</p>
                    ) : (
                        curriculum.educacion.map((edu, index) => (
                            <EducationItem key={edu.id} index={index} data={edu} />
                        ))
                    )}
                </div>

                <div className={styles.cardSection}>
                    <label><strong>Habilidades</strong></label>
                    {curriculum.habilidades.length === 0 ? (
                        <p>No se han añadido habilidades.</p>
                    ) : (
                        <div className={styles.tagList}>
                            {curriculum.habilidades.map((tag, index) => (
                                <span key={index} className={styles.tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.cardSection}>
                    <label><strong>Idiomas</strong></label>
                    {curriculum.educacion.length === 0 ? (
                        <p>No hay idiomas registrados.</p>
                    ) : (
                        curriculum.idiomas.map((edu, index) => (
                            <IdiomaItem key={edu.id} index={index} data={edu} />
                        ))
                    )}
                </div>

                <div className={styles.buttons}>
                    <PDFViewer data={curriculum} user={user} />
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

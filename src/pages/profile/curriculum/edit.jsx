import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import TagInput from './TagInput';
import { useRouter } from 'next/router';
import styles from './style.module.css';
import Swal from 'sweetalert2';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableExperienceItem({ id, index, data, onChange, onRemove }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className={styles.experienceItem}>
            <div className={styles.experienceHeader}>
                <button
                    type="button"
                    {...attributes}
                    {...listeners}
                    className={styles.dragHandle}
                    title="Arrastrar para reordenar"
                >
                    ☰
                </button>
                <strong>Experiencia #{index + 1}</strong>
            </div>

            <label>Nombre de Empresa:</label>
            <input
                type="text"
                value={data.empresa}
                onChange={(e) => onChange(index, 'empresa', e.target.value)}
            />
            <label>Cargo:</label>
            <input
                type="text"
                value={data.cargo}
                onChange={(e) => onChange(index, 'cargo', e.target.value)}
            />
            <label>Descripción:</label>
            <textarea
                value={data.descripcion}
                onChange={(e) => onChange(index, 'descripcion', e.target.value)}
            />
            <label>Fecha Inicio:</label>
            <input
                type="date"
                value={data.fechaInicio}
                onChange={(e) => onChange(index, 'fechaInicio', e.target.value)}
            />
            <label>Fecha Fin:</label>
            <input
                type="date"
                value={data.fechaFin}
                onChange={(e) => onChange(index, 'fechaFin', e.target.value)}
            />
            <button type="button" onClick={() => onRemove(index)} className={styles.removeButton}>
                Eliminar
            </button>
        </div>
    );
}

function SortableEducationItem({ id, index, data, onChange, onRemove }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className={styles.experienceItem}>
            <div className={styles.experienceHeader}>
                <button
                    type="button"
                    {...attributes}
                    {...listeners}
                    className={styles.dragHandle}
                    title="Arrastrar para reordenar"
                >
                    ☰
                </button>
                <strong>Educación #{index + 1}</strong>
            </div>

            <label>Institución:</label>
            <input
                type="text"
                value={data.institucion}
                onChange={(e) => onChange(index, 'institucion', e.target.value)}
            />
            <label>Título obtenido:</label>
            <input
                type="text"
                value={data.titulo}
                onChange={(e) => onChange(index, 'titulo', e.target.value)}
            />
            <label>Descripción:</label>
            <textarea
                value={data.descripcion}
                onChange={(e) => onChange(index, 'descripcion', e.target.value)}
            />
            <label>Fecha Inicio:</label>
            <input
                type="date"
                value={data.fechaInicio}
                onChange={(e) => onChange(index, 'fechaInicio', e.target.value)}
            />
            <label>Fecha Fin:</label>
            <input
                type="date"
                value={data.fechaFin}
                onChange={(e) => onChange(index, 'fechaFin', e.target.value)}
            />
            <button type="button" onClick={() => onRemove(index)} className={styles.removeButton}>
                Eliminar
            </button>
        </div>
    );
}

function SortableIdiomaItem({ id, index, data, onChange, onRemove }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className={styles.experienceItem}>
            <div className={styles.experienceHeader}>
                <button
                    type="button"
                    {...attributes}
                    {...listeners}
                    className={styles.dragHandle}
                    title="Arrastrar para reordenar"
                >
                    ☰
                </button>
                <strong>Idioma #{index + 1}</strong>
            </div>

            <label>Idioma:</label>
            <input
                type="text"
                value={data.idioma}
                onChange={(e) => onChange(index, 'idioma', e.target.value)}
            />
            <label>Nivel:</label>
            <select
                name=""
                id=""
                value={data.nivel}  // <--- Aquí es la clave
                onChange={(e) => onChange(index, 'nivel', e.target.value)}
            >
                <option value="" disabled>Selecciona un nivel</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
            </select>

            <button type="button" onClick={() => onRemove(index)} className={styles.removeButton}>
                Eliminar
            </button>
        </div>
    );
}

function CurriculumEditorPage() {
    const { user } = useContext(AuthContext);
    // const [serverError, setServerError] = useState('');
    const router = useRouter();
    const [curriculum, setCurriculum] = useState({
        titulo: '',
        resumen: '',
        experiencia: [],
        educacion: [],
        habilidades: [],
        idiomas: []
    });

    useEffect(() => {
        document.title = 'Batoifolio - Editor de Currículum';

        const fetchCurriculum = async () => {
            try {
                const res = await fetch(`${apiUrl}users/${user.id}/curriculum`);
                const respuesta = await res.json();

                if (respuesta.data) {
                    setCurriculum({
                        titulo: respuesta.data?.titulo || '',
                        resumen: respuesta.data?.resumen || '',
                        experiencia: respuesta.data?.experiencia || [],
                        experiencia: respuesta.data?.experiencia.map(exp => ({
                            ...exp,
                            fechaInicio: exp.fechaInicio ? new Date(exp.fechaInicio).toISOString().split('T')[0] : '',
                            fechaFin: exp.fechaFin ? new Date(exp.fechaFin).toISOString().split('T')[0] : ''
                        })) || [],
                        educacion: respuesta.data?.educacion.map(exp => ({
                            ...exp,
                            fechaInicio: exp.fechaInicio ? new Date(exp.fechaInicio).toISOString().split('T')[0] : '',
                            fechaFin: exp.fechaFin ? new Date(exp.fechaFin).toISOString().split('T')[0] : ''
                        })) || [],
                        habilidades: respuesta.data?.habilidades || [],
                        idiomas: respuesta.data?.idiomas || [],
                    });
                }
            } catch (err) {
                console.error('Error al cargar el currículum:', err);
            }
        };

        if (user?.id) fetchCurriculum();

    }, [user]);


    const handleChange = (e) => {
        setCurriculum({ ...curriculum, [e.target.name]: e.target.value });
    };

    const handleExperienceChange = (index, field, value) => {
        const newExperiencia = [...curriculum.experiencia];
        newExperiencia[index][field] = value;
        setCurriculum({ ...curriculum, experiencia: newExperiencia });
    };

    const addExperience = () => {
        if (curriculum.experiencia.length < 3) {
            setCurriculum((prev) => ({
                ...prev,
                experiencia: [
                    ...prev.experiencia,
                    {
                        id: crypto.randomUUID(), // <-- ID ÚNICO
                        empresa: '',
                        cargo: '',
                        descripcion: '',
                        fechaInicio: '',
                        fechaFin: ''
                    }
                ]
            }));
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Límite Alcanzado',
                text: 'Solo puedes añadir hasta 3 experiencias laborales.',
                confirmButtonText: 'Aceptar',
            });
        }
    };


    const removeExperience = (index) => {
        const newExperiencia = curriculum.experiencia.filter((_, i) => i !== index);
        setCurriculum({ ...curriculum, experiencia: newExperiencia });
    };

    const sensors = useSensors(useSensor(PointerSensor));

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = curriculum.experiencia.findIndex((item) => item.id === active.id);
        const newIndex = curriculum.experiencia.findIndex((item) => item.id === over.id);

        const reordered = arrayMove(curriculum.experiencia, oldIndex, newIndex);
        setCurriculum((prev) => ({
            ...prev,
            experiencia: reordered
        }));
    };

    const handleEducationChange = (index, field, value) => {
        const newEducacion = [...curriculum.educacion];
        newEducacion[index][field] = value;
        setCurriculum({ ...curriculum, educacion: newEducacion });
    };

    const addEducation = () => {
        if (curriculum.educacion.length < 3) {
            setCurriculum((prev) => ({
                ...prev,
                educacion: [
                    ...prev.educacion,
                    {
                        id: crypto.randomUUID(),
                        institucion: '',
                        titulo: '',
                        descripcion: '',
                        fechaInicio: '',
                        fechaFin: ''
                    }
                ]
            }));
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Límite Alcanzado',
                text: 'Solo puedes añadir hasta 3 educaciones.',
                confirmButtonText: 'Aceptar',
            });
        }
    };

    const removeEducation = (index) => {
        const newEducacion = curriculum.educacion.filter((_, i) => i !== index);
        setCurriculum({ ...curriculum, educacion: newEducacion });
    };

    const handleEducationDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = curriculum.educacion.findIndex((item) => item.id === active.id);
        const newIndex = curriculum.educacion.findIndex((item) => item.id === over.id);

        const reordered = arrayMove(curriculum.educacion, oldIndex, newIndex);
        setCurriculum((prev) => ({
            ...prev,
            educacion: reordered
        }));
    };











    const handleIdiomaChange = (index, field, value) => {
        const newIdioma = [...curriculum.idiomas];
        newIdioma[index][field] = value;
        setCurriculum({ ...curriculum, idiomas: newIdioma });
    };

    const addIdioma = () => {
        if (curriculum.idiomas.length < 5) {
            setCurriculum((prev) => ({
                ...prev,
                idiomas: [
                    ...prev.idiomas,
                    {
                        id: crypto.randomUUID(),
                        idioma: '',
                        nivel: ''
                    }
                ]
            }));
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Límite Alcanzado',
                text: 'Solo puedes añadir hasta 5 idiomas.',
                confirmButtonText: 'Aceptar',
            });
        }
    };

    const removeIdioma = (index) => {
        const newIdioma = curriculum.idiomas.filter((_, i) => i !== index);
        setCurriculum({ ...curriculum, idiomas: newIdioma });
    };

    const handleIdiomaDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = curriculum.idiomas.findIndex((item) => item.id === active.id);
        const newIndex = curriculum.idiomas.findIndex((item) => item.id === over.id);

        const reordered = arrayMove(curriculum.idiomas, oldIndex, newIndex);
        setCurriculum((prev) => ({
            ...prev,
            idiomas: reordered
        }));
    };




    const handleSave = async () => {
        try {
            const res = await fetch(`${apiUrl}users/${user.id}/curriculum/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(curriculum)
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Error al guardar el currículum');
            }
            router.push('/profile/curriculum');
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error al Guardar',
                text: err.message,
                confirmButtonText: 'Aceptar',
            })
            return;
        }
    };

    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    <img src={user.fotoPerfil || '/default-avatar.png'} alt="Avatar" />
                </div>
                <div className={styles.userInfo}>
                    <h1><strong>Editor de Currículum para:</strong> @{user.username}</h1>
                </div>
            </div>

            <div className={styles.mainInfo}>
                <div className={styles.cardSection}>
                    <label><strong>Título Profesional</strong></label>
                    <input type="text" name="titulo" value={curriculum.titulo} onChange={handleChange} />
                </div>

                <div className={styles.cardSection}>
                    <label><strong>Resumen Profesional</strong></label>
                    <textarea name="resumen" value={curriculum.resumen} onChange={handleChange} />
                </div>

                <div className={styles.cardSection}>
                    <label><strong>Experiencia Laboral</strong></label>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext
                            items={curriculum.experiencia.map((exp) => exp.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {curriculum.experiencia.map((exp, index) => (
                                <SortableExperienceItem
                                    key={exp.id}
                                    id={exp.id}
                                    index={index}
                                    data={exp}
                                    onChange={handleExperienceChange}
                                    onRemove={removeExperience}
                                />
                            ))}
                        </SortableContext>

                    </DndContext>
                    <button type="button" onClick={addExperience} className={styles.editButton}>
                        Añadir experiencia
                    </button>
                </div>

                <div className={styles.cardSection}>
                    <label><strong>Educación</strong></label>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleEducationDragEnd}>
                        <SortableContext
                            items={curriculum.educacion.map((edu) => edu.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {curriculum.educacion.map((edu, index) => (
                                <SortableEducationItem
                                    key={edu.id}
                                    id={edu.id}
                                    index={index}
                                    data={edu}
                                    onChange={handleEducationChange}
                                    onRemove={removeEducation}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                    <button type="button" onClick={addEducation} className={styles.editButton}>
                        Añadir educación
                    </button>
                </div>


                <div className={styles.cardSection}>
                    <label><strong>Habilidades</strong></label>
                    <TagInput
                        tags={curriculum.habilidades}
                        setTags={(newTags) =>
                            setCurriculum({ ...curriculum, habilidades: newTags })
                        }
                    />
                </div>
                <div className={styles.cardSection}>
                    <label><strong>Idiomas</strong></label>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleIdiomaDragEnd}>
                        <SortableContext
                            items={curriculum.idiomas.map((idi) => idi.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {curriculum.idiomas.map((idi, index) => (
                                <SortableIdiomaItem
                                    key={idi.id}
                                    id={idi.id}
                                    index={index}
                                    data={idi}
                                    onChange={handleIdiomaChange}
                                    onRemove={removeIdioma}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                    <button type="button" onClick={addIdioma} className={styles.editButton}>
                        Añadir idioma
                    </button>
                </div>

            </div>
            <div className={styles.buttons}>
                <Link href="/profile/curriculum" className={styles.cancelButton}>Cancelar</Link>
                <button className={styles.editButton} onClick={handleSave}>
                    Guardar Currículum
                </button>
            </div>
        </div>
    );
}

CurriculumEditorPage.auth = true;

export default CurriculumEditorPage;

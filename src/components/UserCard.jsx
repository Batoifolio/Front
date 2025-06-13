'use client';
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';


import Swal from 'sweetalert2';
import dynamic from 'next/dynamic';
import stylesCard from './UserCard.module.css';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const PDFViewer = dynamic(() => import('@/components/Curriculum/CurriculumPDF'), { ssr: false });

async function fetchCurriculumData(userId) {
    const res = await fetch(`${apiUrl}users/${userId}/curriculum`);
    const data = await res.json();
    return data?.data ?? null;
}

function UserCard({ item }) {
    const openProfile = async () => {
        const card = document.getElementById(`${item.id}`);
        if (card) card.classList.add(stylesCard.active);

        try {
            const curriculum = await fetchCurriculumData(item.id);
            let root = null;

            await Swal.fire({
                title: `${item.nombre} ${item.apellidos}`,
                html: `<div id="pdf-container"></div>
                <div style="text-align: left;">
                        <p><strong>Nombre:</strong> ${item.nombre} ${item.apellidos}</p>
                        <p><strong>Username:</strong> @${item.username}</p>
                        <p><strong>Email:</strong> ${item.email}</p>
                        <p><strong>Pueblo:</strong> ${item.pueblo}</p>
                        <p><strong>Grado:</strong> ${item.grado?.nombre || ''}</p>
                        <p><strong>Rama:</strong> ${item.rama?.nombre || ''}</p>
                        ${item.descripcion ? `<p><strong>Descripción:</strong> ${item.descripcion}</p>` : ''}
                </div>`,
                imageUrl: item.fotoPerfil,
                imageAlt: `${item.nombre} ${item.apellidos}`,
                confirmButtonText: 'Aceptar',
                width: '800px',
                customClass: {
                    popup: 'swal2-custom-popup'
                },
                didOpen: () => {
                    const container = document.getElementById('pdf-container');
                    if (!curriculum || !item) return;
                    if (container) {
                        root = createRoot(container);
                        root.render(<PDFViewer data={curriculum} user={item} />);
                    }
                },
                willClose: () => {
                    if (root) {
                        root.unmount();
                    }
                }
            });



            // Si quieres mostrar el PDF, lo ideal sería hacerlo fuera del Swal

        } catch (error) {
            console.error('Error al cargar el perfil:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo cargar el perfil del alumno.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        } finally {
            setTimeout(() => {
                card?.classList.remove(stylesCard.active);
            }, 3000);
        }
    };

    return (
        <div key={item.id} id={item.id} className={stylesCard.card}>
            <div className={stylesCard.buttons} onClick={openProfile}>
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
    );
}

export default UserCard;

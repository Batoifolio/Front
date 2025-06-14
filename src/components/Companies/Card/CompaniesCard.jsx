'use client';
import React, { useState, useEffect } from 'react';
import CompaniesInfoSwalContent from '../CompaniesInfoSwalContent/CompaniesInfoSwalContent';
import ReactDOMServer from 'react-dom/server';

import Swal from 'sweetalert2';
import stylesCard from './CompaniesCard.module.css';

function CompanyCard({ item }) {
    const openProfile = async () => {
        const card = document.getElementById(`${item.id}`);
        if (card) card.classList.add(stylesCard.active);

        try {
            let root = null;

            if (item.User != null && item.User !== undefined) {

                const html = ReactDOMServer.renderToString(<CompaniesInfoSwalContent item={item.User} />);

                await Swal.fire({
                    title: `${item.User.nombre} ${item.User.apellidos}`,
                    html,
                    imageUrl: item.User.fotoPerfil,
                    imageWidth: 200,
                    imageHeight: 200,
                    imageAlt: `${item.User.nombre} ${item.User.apellidos}`,
                    confirmButtonText: 'Aceptar',
                    width: '800px',
                    customClass: {
                        popup: 'swal2-custom-popup swal2-custom-popup-user-info',
                    },
                    willClose: () => {
                        if (root) {
                            root.unmount();
                        }
                    }
                });
            } else {
                await Swal.fire({
                    title: 'Perfil no disponible',
                    text: 'El perfil del Reclutador no está disponible.',
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                });
            }

        } catch (error) {
            console.error('Error al cargar el perfil:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo cargar el perfil del Reclutador.',
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
            <i className="bi bi-buildings-fill" style={{ fontSize: '3rem', color: '#333', marginBottom: '10px' }}></i>
            <h2 className={stylesCard.name}>{item.nombre}</h2>
            <p className={stylesCard.email}>{item.email}</p>
            <p className={stylesCard.cif}>CIF: {item.cif}</p>
            <p className={stylesCard.telefono}>Teléfono: {item.telefono}</p>
            <p className={stylesCard.direccion}>Direccion: {item.direccion}</p>
            <p className={stylesCard.sector}>Sector: {item.sector}</p>
        </div>
    );
}

export default CompanyCard;

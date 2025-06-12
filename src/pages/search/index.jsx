import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import stylesCard from './card.module.css';



function SearchPage() {
    const data = [
        {
            "id": 3,
            "nombre": "Carlos",
            "apellidos": "Ruiz Fernández",
            "username": "carlos.ruiz",
            "email": "carlos@example.com",
            "password": "$2b$10$jO8k3lPvM3HjvKY/yG6fAuW6T1b9BGtfxXy2QYLrpvZUwhGnFaFEC",
            "pueblo": "Valencia",
            "gradoId": 4,
            "ramaId": 1,
            "estado": "conectado",
            "fotoPerfil": "https://ui-avatars.com/api/?uppercase=false&name=Carlos+Ruiz Fernández",
            "descripcion": "Desde Valencia, apasionado por el mundo del software, el desarrollo y las nuevas tecnologías. Siempre conectado y en constante aprendizaje, Carlos destaca por su compromiso y curiosidad para enfrentarse a nuevos retos de programación. Su perfil combina la solidez técnica con una gran capacidad de adaptación, preparado para abordar proyectos tanto académicos como profesionales. 🚀",
            "telefono": null,
            "ultimaConexion": "2025-06-10T19:39:46.021Z",
            "rolId": null,
            "empresaId": null,
            "buscaEmpresa": false,
            "visibilidad": true,
            "creadoEn": "2025-06-10T19:39:46.021Z",
            "grado": {
                "id": 4,
                "nombre": "2 DAM"
            },
            "rama": {
                "id": 1,
                "nombre": "Informática"
            },
            "borrado": false
        },
        {
            "id": 3,
            "nombre": "Carlos",
            "apellidos": "Ruiz Fernández",
            "username": "carlos.ruiz",
            "email": "carlos@example.com",
            "password": "$2b$10$jO8k3lPvM3HjvKY/yG6fAuW6T1b9BGtfxXy2QYLrpvZUwhGnFaFEC",
            "pueblo": "Valencia",
            "gradoId": 4,
            "ramaId": 1,
            "estado": "conectado",
            "fotoPerfil": "https://ui-avatars.com/api/?uppercase=false&name=Carlos+Ruiz Fernández",
            "descripcion": "Desde Valencia, apasionado por el mundo del software, el desarrollo y las nuevas tecnologías. Siempre conectado y en constante aprendizaje, Carlos destaca por su compromiso y curiosidad para enfrentarse a nuevos retos de programación. Su perfil combina la solidez técnica con una gran capacidad de adaptación, preparado para abordar proyectos tanto académicos como profesionales. 🚀",
            "telefono": null,
            "ultimaConexion": "2025-06-10T19:39:46.021Z",
            "rolId": null,
            "empresaId": null,
            "buscaEmpresa": false,
            "visibilidad": true,
            "creadoEn": "2025-06-10T19:39:46.021Z",
            "grado": {
                "id": 4,
                "nombre": "2 DAM"
            },
            "rama": {
                "id": 1,
                "nombre": "Informática"
            },
            "borrado": false
        },
        {
            "id": 3,
            "nombre": "Carlos",
            "apellidos": "Ruiz Fernández",
            "username": "carlos.ruiz",
            "email": "carlos@example.com",
            "password": "$2b$10$jO8k3lPvM3HjvKY/yG6fAuW6T1b9BGtfxXy2QYLrpvZUwhGnFaFEC",
            "pueblo": "Valencia",
            "gradoId": 4,
            "ramaId": 1,
            "estado": "conectado",
            "fotoPerfil": "https://ui-avatars.com/api/?uppercase=false&name=Carlos+Ruiz Fernández",
            "descripcion": "Desde Valencia, apasionado por el mundo del software, el desarrollo y las nuevas tecnologías. Siempre conectado y en constante aprendizaje, Carlos destaca por su compromiso y curiosidad para enfrentarse a nuevos retos de programación. Su perfil combina la solidez técnica con una gran capacidad de adaptación, preparado para abordar proyectos tanto académicos como profesionales. 🚀",
            "telefono": null,
            "ultimaConexion": "2025-06-10T19:39:46.021Z",
            "rolId": null,
            "empresaId": null,
            "buscaEmpresa": false,
            "visibilidad": true,
            "creadoEn": "2025-06-10T19:39:46.021Z",
            "grado": {
                "id": 4,
                "nombre": "2 DAM"
            },
            "rama": {
                "id": 1,
                "nombre": "Informática"
            },
            "borrado": false
        },
        {
            "id": 3,
            "nombre": "Carlos",
            "apellidos": "Ruiz Fernández",
            "username": "carlos.ruiz",
            "email": "carlos@example.com",
            "password": "$2b$10$jO8k3lPvM3HjvKY/yG6fAuW6T1b9BGtfxXy2QYLrpvZUwhGnFaFEC",
            "pueblo": "Valencia",
            "gradoId": 4,
            "ramaId": 1,
            "estado": "conectado",
            "fotoPerfil": "https://ui-avatars.com/api/?uppercase=false&name=Carlos+Ruiz Fernández",
            "descripcion": "Desde Valencia, apasionado por el mundo del software, el desarrollo y las nuevas tecnologías. Siempre conectado y en constante aprendizaje, Carlos destaca por su compromiso y curiosidad para enfrentarse a nuevos retos de programación. Su perfil combina la solidez técnica con una gran capacidad de adaptación, preparado para abordar proyectos tanto académicos como profesionales. 🚀",
            "telefono": null,
            "ultimaConexion": "2025-06-10T19:39:46.021Z",
            "rolId": null,
            "empresaId": null,
            "buscaEmpresa": false,
            "visibilidad": true,
            "creadoEn": "2025-06-10T19:39:46.021Z",
            "grado": {
                "id": 4,
                "nombre": "2 DAM"
            },
            "rama": {
                "id": 1,
                "nombre": "Informática"
            },
            "borrado": false
        },
        {
            "id": 3,
            "nombre": "Carlos",
            "apellidos": "Ruiz Fernández",
            "username": "carlos.ruiz",
            "email": "carlos@example.com",
            "password": "$2b$10$jO8k3lPvM3HjvKY/yG6fAuW6T1b9BGtfxXy2QYLrpvZUwhGnFaFEC",
            "pueblo": "Valencia",
            "gradoId": 4,
            "ramaId": 1,
            "estado": "conectado",
            "fotoPerfil": "https://ui-avatars.com/api/?uppercase=false&name=Carlos+Ruiz Fernández",
            "descripcion": "Desde Valencia, apasionado por el mundo del software, el desarrollo y las nuevas tecnologías. Siempre conectado y en constante aprendizaje, Carlos destaca por su compromiso y curiosidad para enfrentarse a nuevos retos de programación. Su perfil combina la solidez técnica con una gran capacidad de adaptación, preparado para abordar proyectos tanto académicos como profesionales. 🚀",
            "telefono": null,
            "ultimaConexion": "2025-06-10T19:39:46.021Z",
            "rolId": null,
            "empresaId": null,
            "buscaEmpresa": false,
            "visibilidad": true,
            "creadoEn": "2025-06-10T19:39:46.021Z",
            "grado": {
                "id": 4,
                "nombre": "2 DAM"
            },
            "rama": {
                "id": 1,
                "nombre": "Informática"
            },
            "borrado": false
        },
        {
            "id": 3,
            "nombre": "Carlos",
            "apellidos": "Ruiz Fernández",
            "username": "carlos.ruiz",
            "email": "carlos@example.com",
            "password": "$2b$10$jO8k3lPvM3HjvKY/yG6fAuW6T1b9BGtfxXy2QYLrpvZUwhGnFaFEC",
            "pueblo": "Valencia",
            "gradoId": 4,
            "ramaId": 1,
            "estado": "conectado",
            "fotoPerfil": "https://ui-avatars.com/api/?uppercase=false&name=Carlos+Ruiz Fernández",
            "descripcion": "Desde Valencia, apasionado por el mundo del software, el desarrollo y las nuevas tecnologías. Siempre conectado y en constante aprendizaje, Carlos destaca por su compromiso y curiosidad para enfrentarse a nuevos retos de programación. Su perfil combina la solidez técnica con una gran capacidad de adaptación, preparado para abordar proyectos tanto académicos como profesionales. 🚀",
            "telefono": null,
            "ultimaConexion": "2025-06-10T19:39:46.021Z",
            "rolId": null,
            "empresaId": null,
            "buscaEmpresa": false,
            "visibilidad": true,
            "creadoEn": "2025-06-10T19:39:46.021Z",
            "grado": {
                "id": 4,
                "nombre": "2 DAM"
            },
            "rama": {
                "id": 1,
                "nombre": "Informática"
            },
            "borrado": false
        },
        {
            "id": 3,
            "nombre": "Carlos",
            "apellidos": "Ruiz Fernández",
            "username": "carlos.ruiz",
            "email": "carlos@example.com",
            "password": "$2b$10$jO8k3lPvM3HjvKY/yG6fAuW6T1b9BGtfxXy2QYLrpvZUwhGnFaFEC",
            "pueblo": "Valencia",
            "gradoId": 4,
            "ramaId": 1,
            "estado": "conectado",
            "fotoPerfil": "https://ui-avatars.com/api/?uppercase=false&name=Carlos+Ruiz Fernández",
            "descripcion": "Desde Valencia, apasionado por el mundo del software, el desarrollo y las nuevas tecnologías. Siempre conectado y en constante aprendizaje, Carlos destaca por su compromiso y curiosidad para enfrentarse a nuevos retos de programación. Su perfil combina la solidez técnica con una gran capacidad de adaptación, preparado para abordar proyectos tanto académicos como profesionales. 🚀",
            "telefono": null,
            "ultimaConexion": "2025-06-10T19:39:46.021Z",
            "rolId": null,
            "empresaId": null,
            "buscaEmpresa": false,
            "visibilidad": true,
            "creadoEn": "2025-06-10T19:39:46.021Z",
            "grado": {
                "id": 4,
                "nombre": "2 DAM"
            },
            "rama": {
                "id": 1,
                "nombre": "Informática"
            },
            "borrado": false
        },

    ]

    const openProfile = (id) => {
        console.log(`Abrir perfil del alumno con ID: ${id}`);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Buscar Alumnos</h1>

            <div className={styles.cards}>
                {data.map((item) => (
                    <div key={item.id} className={stylesCard.card}>
                        <div className={stylesCard.buttons} onClick={() => openProfile(item.id)}><button type='button' className={stylesCard.see}><i className="bi bi-eyeglasses"></i></button></div>
                        <img src={item.fotoPerfil} alt={`${item.nombre} ${item.apellidos}`} className={stylesCard.image} />
                        <h2 className={stylesCard.name}>{item.nombre} {item.apellidos}</h2>
                        <p className={stylesCard.username}>@{item.username}</p>
                        <p className={stylesCard.email}>{item.email}</p>
                        <p className={stylesCard.pueblo}>{item.pueblo}</p>
                        <p className={stylesCard.grado}>Grado: {item.grado.nombre}</p>
                        <p className={stylesCard.rama}>Rama: {item.rama.nombre}</p>
                        <p className={stylesCard.descripcion}>{item.descripcion}</p>
                    </div>
                ))}
            </div>
        </div>

    );
}

SearchPage.auth = true;

export default SearchPage;

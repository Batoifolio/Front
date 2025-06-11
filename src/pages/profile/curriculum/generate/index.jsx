import React, { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import dynamic from 'next/dynamic';

// Solo carga en el cliente
const PDFViewer = dynamic(() => import('@/components/CurriculumPDF'), { ssr: false });
// todo limitar las experiencias y educacion a 3 cada una, si hay más, que no se muestren
const data = {
    titulo: "Desarrollador Frontend",
    resumen: "Desarrollador entusiasta con experiencia en la creación de interfaces de usuario atractivas y funcionales utilizando tecnologías modernas. Comprometido con la mejora continua y la experiencia del usuario.",
    experiencia: [
        {
            id: "a12f34bc-5678-90de-1234-56789abcdef1",
            empresa: "Innovatech S.L.",
            cargo: "Desarrollador Frontend",
            descripcion: "Desarrollo de aplicaciones web utilizando React, implementación de diseños responsivos y optimización del rendimiento de la aplicación.",
            fechaInicio: "2022-03-01",
            fechaFin: "2023-12-31"
        },
        {
            id: "a12f34bc-5678-90de-1234-56789abcdef2",
            empresa: "Creative Solutions",
            cargo: "Desarrollador Junior",
            descripcion: "Colaboración en el desarrollo de proyectos web, mantenimiento de aplicaciones existentes y soporte técnico.",
            fechaInicio: "2021-06-01",
            fechaFin: "2022-02-28"
        },
        {
            id: "a12f34bc-5678-90de-1234-56789abcdef3",
            empresa: "Tech Innovators",
            cargo: "Practicante de Desarrollo Web",
            descripcion: "Asistencia en el desarrollo de proyectos web, pruebas de usabilidad y documentación técnica.",
            fechaInicio: "2020-01-01",
            fechaFin: "2021-05-31"
        }
    ],
    educacion: [
        {
            id: "b084deba-2078-4485-9c92-c199dd68da2b",
            institucion: "Universidad de Barcelona",
            titulo: "Grado en Diseño de Interfaces",
            descripcion: "Formación en diseño de experiencia de usuario, usabilidad y desarrollo frontend.",
            fechaInicio: "2019-09-01",
            fechaFin: "2023-06-30"
        },
        {
            id: "c1234567-89ab-cdef-0123-456789abcdef",
            institucion: "Escuela de Tecnología Avanzada",
            titulo: "Curso de Desarrollo Web Full Stack",
            descripcion: "Curso intensivo de 6 meses en desarrollo web, cubriendo tanto frontend como backend.",
            fechaInicio: "2020-01-01",
            fechaFin: "2020-06-30"
        },
        {
            id: "d2345678-90ab-cdef-1234-56789abcdef0",
            institucion: "Academia de Programación",
            titulo: "Curso de JavaScript Avanzado",
            descripcion: "Curso especializado en JavaScript, incluyendo ES6, asincronía y patrones de diseño.",
            fechaInicio: "2021-01-01",
            fechaFin: "2021-05-31"
        },
    ],
    habilidades: [
        "React", "JavaScript", "CSS", "HTML", "Git", "Figma", "Redux", "Node.js", "TypeScript", "Responsive Design", "Testing"
    ],
    idiomas: [
        {
            id: "dc599232-ddc0-4b78-a349-fdfeea488cc9",
            nivel: "B2",
            idioma: "Francés"
        },
        {
            id: "466571a0-6e77-4b16-9c30-a1b0bbdb74a8",
            nivel: "Nativo",
            idioma: "Español"
        },
        {
            id: "c9f0f895-2244-4b8a-8d6c-8e3f2d3a1b2c",
            nivel: "C1",
            idioma: "Inglés"
        },
        {
            id: "b1a0c2d3-4e5f-6789-0123-456789abcdef",
            nivel: "C1",
            idioma: "Valenciano"
        }
    ]
};


const CVPage = () => {
    const user = {
        "id": 1,
        "nombre": "Jordi",
        "apellidos": "Gisbert",
        "username": "jordiGisbert",
        "email": "jordigisbert@batoifolio.com",
        "password": "$2b$10$qxchuQmrb5Me2.K0/nNCkeXSrP/iRfwRmpu9SqVQmAfDalVX5xv6G",
        "pueblo": "Alicante",
        "gradoId": 1,
        "ramaId": 1,
        "estado": "conectado",
        "fotoPerfil": "https://ui-avatars.com/api/?uppercase=false&name=admin+",
        "descripcion": "Administrar.",
        "telefono": "611111111",
        "ultimaConexion": "2025-06-11T16:26:58.000Z",
        "rolId": null,
        "empresaId": null,
        "buscaEmpresa": false,
        "visibilidad": true,
        "creadoEn": "2025-06-11T16:26:58.000Z",
        "grado": {
            "id": 1,
            "nombre": "2 DAW"
        },
        "rama": {
            "id": 1,
            "nombre": "Informática"
        },
    }
    return (
        <div style={{ padding: '40px' }}>
            <h1>Curriculum del Alumno</h1>

            {/* Aquí pintas el botón para descargar */}
            <PDFViewer data={data} user={user} />

        </div>
    );
};

export default CVPage;

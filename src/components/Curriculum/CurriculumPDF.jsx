import React, { useState, useEffect } from 'react';
import { pdf } from '@react-pdf/renderer';
import { PDFDownloadLink, Document, Page, Text, View, Image, BlobProvider } from '@react-pdf/renderer';
import { pdfStyles as styles } from './pdfStyles';
import htmlStyle from './style.module.css';
import Swal from 'sweetalert2';
import Loader from '../Loader';


const MyDocument = ({ data, user }) => (
    <Document >
        <Page size="A4" style={styles.page}>
            <View style={styles.iconosApp}>
                <Image src="/batoi-icon.png" style={styles.icon} />
                <Image src="/batoifolio-icon.png" style={styles.icon} />
            </View>

            {/* Cabecera con foto y datos personales */}
            <View style={styles.headerPersonal}>

                <View style={styles.avatarContainer}>
                    <Image src={user.fotoPerfil} style={styles.avatar} />
                </View>

                <View style={styles.personalData}>
                    <Text style={styles.name}>{user.nombre} {user.apellidos}</Text>
                    <Text style={styles.jobTitle}>{data.titulo}</Text>
                    <Text style={styles.summary}>{data.resumen}</Text>

                    <View style={styles.contactInfo}>
                        <Text>Email: {user.email}</Text>
                        <Text>Teléfono: {user.telefono}</Text>
                        <Text>Ubicación: {user.pueblo}</Text>
                        <Text>Grado: {user.grado?.nombre}</Text>
                        <Text>Rama: {user.rama?.nombre}</Text>
                    </View>
                </View>

            </View>

            {/* Después seguimos con el resto igual */}
            {/* Experiencia, Educación, Habilidades/Idiomas, etc */}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experiencia</Text>
                {data.experiencia.map(exp => (
                    <View key={exp.id} style={styles.itemContainer}>
                        <Text style={styles.itemHeader}>{exp.empresa} - {exp.cargo}</Text>
                        <Text style={styles.itemSubHeader}>
                            {exp.fechaInicio} {exp.fechaFin ? `- ${exp.fechaFin}` : '- Actualidad'}
                        </Text>
                        <Text style={styles.itemDescription}>{exp.descripcion}</Text>
                    </View>
                ))}
            </View>

            {/* Educación */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Educación</Text>
                {data.educacion.map(edu => (
                    <View key={edu.id} style={styles.itemContainer}>
                        <Text style={styles.itemHeader}>{edu.titulo} - {edu.institucion}</Text>
                        <Text style={styles.itemSubHeader}>{edu.fechaInicio} - {edu.fechaFin}</Text>
                        <Text style={styles.itemDescription}>{edu.descripcion}</Text>
                    </View>
                ))}
            </View>

            {/* Habilidades e idiomas (ya con las dos columnas que hicimos antes) */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Habilidades & Idiomas</Text>

                <View style={styles.skillsLanguagesContainer}>
                    <View style={styles.skillsSection}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Habilidades</Text>
                        <View style={styles.skillsContainer}>
                            {data.habilidades.map((skill, idx) => (
                                <Text key={idx} style={styles.skillBadge}>{skill}</Text>
                            ))}
                        </View>
                    </View>

                    <View style={styles.languagesSection}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Idiomas</Text>
                        {data.idiomas.map((idioma, idx) => (
                            <Text key={idx} style={styles.language}>
                                {idioma.idioma} - Nivel: {idioma.nivel}
                            </Text>
                        ))}
                    </View>
                </View>
            </View>

        </Page>
    </Document >
);

const PDFViewer = ({ data, user }) => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const generatePDF = async () => {
            const blob = await pdf(<MyDocument data={data} user={user} />).toBlob();
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
            setLoading(false);
        };

        generatePDF();

        // Limpiar el blob cuando el componente se desmonta
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [data, user]);

    const handleOpenPDF = () => {
        Swal.fire({
            title: 'Vista previa del CV',
            html: `<iframe src="${pdfUrl}" width="100%" height="600px" style="border:none;"></iframe>`,
            width: '80%',
            confirmButtonText: 'Cerrar',
            showCloseButton: true
        });
    };

    if (loading) {
        return <button className={htmlStyle.button} disabled>Generando PDF...</button >;
    }

    return (
        <button className={htmlStyle.button} onClick={handleOpenPDF}>
            Visualizar PDF
        </button>
    );
};

export default PDFViewer;

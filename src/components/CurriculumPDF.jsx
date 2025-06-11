import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Paleta de colores moderna
const colors = {
    primary: '#2c3e50',
    secondary: '#2980b9',
    lightGray: '#ecf0f1',
    darkGray: '#7f8c8d'
};

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff',
        color: '#2c3e50'
    },
    header: {
        borderBottom: `2 solid ${colors.secondary}`,
        paddingBottom: 10,
        marginBottom: 20
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.primary
    },
    summary: {
        fontSize: 12,
        marginTop: 10,
        color: colors.darkGray
    },
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.secondary,
        borderBottom: `1 solid ${colors.lightGray}`,
        paddingBottom: 4
    },
    itemContainer: {
        marginBottom: 10
    },
    itemHeader: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    itemSubHeader: {
        fontSize: 10,
        color: colors.darkGray,
        marginBottom: 4
    },
    itemDescription: {
        fontSize: 10,
        color: colors.primary
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    skillBadge: {
        backgroundColor: colors.secondary,
        color: '#ffffff',
        fontSize: 10,
        padding: '4px 8px',
        borderRadius: 12,
        marginRight: 5,
        marginBottom: 5
    },
    language: {
        fontSize: 10,
        marginBottom: 4
    }
});

const MyDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Cabecera */}
            <View style={styles.header}>
                <Text style={styles.name}>{data.titulo}</Text>
                <Text style={styles.summary}>{data.resumen}</Text>
            </View>

            {/* Experiencia */}
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
                        <Text style={styles.itemSubHeader}>
                            {edu.fechaInicio} - {edu.fechaFin}
                        </Text>
                        <Text style={styles.itemDescription}>{edu.descripcion}</Text>
                    </View>
                ))}
            </View>

            {/* Habilidades */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Habilidades</Text>
                <View style={styles.skillsContainer}>
                    {data.habilidades.map((skill, idx) => (
                        <Text key={idx} style={styles.skillBadge}>{skill}</Text>
                    ))}
                </View>
            </View>

            {/* Idiomas */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Idiomas</Text>
                {data.idiomas.map((idioma, idx) => (
                    <Text key={idx} style={styles.language}>
                        {idioma.idioma} - Nivel: {idioma.nivel}
                    </Text>
                ))}
            </View>
        </Page>
    </Document>
);

const PDFViewer = ({ data }) => {
    return (
        <PDFDownloadLink document={<MyDocument data={data} />} fileName="cv.pdf">
            {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar CV')}
        </PDFDownloadLink>
    );
};

export default PDFViewer;

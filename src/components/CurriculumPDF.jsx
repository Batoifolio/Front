import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer';
import { pdfStyles as styles } from './pdfStyles';

const MyDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.name}>{data.titulo}</Text>
                <Text style={styles.summary}>{data.resumen}</Text>
            </View>

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

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Habilidades</Text>
                <View style={styles.skillsContainer}>
                    {data.habilidades.map((skill, idx) => (
                        <Text key={idx} style={styles.skillBadge}>{skill}</Text>
                    ))}
                </View>
            </View>

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

const PDFViewer = ({ data }) => (
    <PDFDownloadLink document={<MyDocument data={data} />} fileName="cv.pdf">
        {({ loading }) => (loading ? 'Generando PDF...' : 'Descargar CV')}
    </PDFDownloadLink>
);

export default PDFViewer;

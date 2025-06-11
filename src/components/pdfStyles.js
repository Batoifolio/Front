import { StyleSheet } from '@react-pdf/renderer';

export const pdfStyles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff',
        color: '#2c3e50'
    },
    header: {
        borderBottom: '2 solid #2980b9',
        paddingBottom: 10,
        marginBottom: 20
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    summary: {
        fontSize: 12,
        marginTop: 10,
        color: '#7f8c8d'
    },
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#2980b9',
        borderBottom: '1 solid #ecf0f1',
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
        color: '#7f8c8d',
        marginBottom: 4
    },
    itemDescription: {
        fontSize: 10,
        color: '#2c3e50'
    },
    skillsLanguagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20 // esto es opcional, depende de la versión, si no funciona usamos padding o margin
    },
    skillsSection: {
        flex: 1,
        marginRight: 10
    },
    languagesSection: {
        flex: 1,
        marginLeft: 10
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    skillBadge: {
        backgroundColor: '#2980b9',
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

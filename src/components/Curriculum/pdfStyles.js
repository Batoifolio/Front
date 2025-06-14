import { StyleSheet } from '@react-pdf/renderer';

export const pdfStyles = StyleSheet.create({
    iconosApp: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        opacity: 0.8,
        marginRight: 20,
        gap: 5
    },
    icon: {
        width: 30,
        height: 30,
    },
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
    headerPersonal: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottom: '2 solid #2980b9',
        paddingBottom: 10
    },
    avatarContainer: {
        width: 100,
        height: 100,
        marginRight: 20
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    personalData: {
        flex: 1,
        justifyContent: 'center'
    },
    jobTitle: {
        fontSize: 14,
        marginTop: 4,
        color: '#34495e'
    },
    contactInfo: {
        fontSize: 10,
        marginTop: 8,
        color: '#7f8c8d',
        lineHeight: 1.4
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

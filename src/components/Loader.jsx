export default function Loader({ show = false }) {
    if (!show) return null;

    return (
        <div className="loader-modal">
            <div className="loader"></div>
            <div className="loader-text">Cargando...</div>
        </div>
    );
}
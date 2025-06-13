// components/UserInfoSwalContent.jsx
import style from './UserInfoSwalContent.module.css';

export default function UserInfoSwalContent({ item }) {
    if (!item) return null;

    return (
        <div className={style.card}>
            <div className={style.section}>
                <InfoRow label="Email" value={item.email} />
                <InfoRow label="Pueblo" value={item.pueblo} />
                <InfoRow label="Grado" value={item.grado?.nombre || 'N/A'} />
                <InfoRow label="Rama" value={item.rama?.nombre || 'N/A'} />
            </div>

            {item.descripcion && (
                <div className={style.section}>
                    <p className={style.label}>Descripción:</p>
                    <p className={style.description}>{item.descripcion}</p>
                </div>
            )}
            <div id='pdf-container'></div>
        </div>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className={style.row}>
            <span className={style.label}>{label}:</span>
            <span className={style.value}>{value}</span>
        </div>
    );
}

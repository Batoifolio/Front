import { useState } from 'react';
import styles from './style.module.css';

export default function ImageUploader({ onUpload, defaultImage = '/default-avatar.png' }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result.split(',')[1];
            setUploading(true);

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        filename: selectedFile.name,
                        data: base64,
                    }),
                });

                const data = await res.json();
                if (res.ok) onUpload(data.url);
                else alert('Error subiendo imagen');
            } catch {
                alert('Error de conexión');
            } finally {
                setUploading(false);
            }
        };
        reader.readAsDataURL(selectedFile);
    };

    return (
        <div className={styles.container}>
            <img
                src={preview || defaultImage}
                alt="Avatar"
                className={styles.avatarImage}
            />

            <div className={styles.controls}>
                <label className={styles.fileButton}>
                    Seleccionar
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={styles.fileInput}
                    />
                </label>

                <button
                    type='button'
                    onClick={handleUpload}
                    disabled={uploading || !selectedFile}
                    className={styles.uploadButton}
                >
                    {uploading ? 'Subiendo...' : 'Subir'}
                </button>
            </div>
        </div>
    );
}
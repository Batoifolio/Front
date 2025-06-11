import { useState } from 'react';

export default function ImageUploader({ onUpload }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result.split(',')[1]; // Solo el contenido, sin el prefijo

            setUploading(true);

            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filename: selectedFile.name,
                    data: base64,
                }),
            });

            const data = await res.json();
            setUploading(false);

            if (res.ok) {
                onUpload(data.url); // devuelve la URL pública
            } else {
                alert('Error subiendo imagen');
            }
        };

        reader.readAsDataURL(selectedFile);
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && <img src={preview} alt="preview" style={{ width: 150 }} />}
            <button onClick={handleUpload} type='button' disabled={uploading}>
                {uploading ? 'Subiendo...' : 'Subir'}
            </button>
        </div>
    );
}

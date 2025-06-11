import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: true, // activamos el parser de JSON
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Solo POST permitido' });
    }

    const { filename, data } = req.body;

    if (!filename || !data) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    const uploadDir = path.join(process.cwd(), '/public/uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const ext = path.extname(filename);
    const safeFilename = `${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, safeFilename);

    const buffer = Buffer.from(data, 'base64');
    fs.writeFileSync(filePath, buffer);

    return res.status(200).json({ url: `/uploads/${safeFilename}` });
}

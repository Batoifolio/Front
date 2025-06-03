import { NextResponse } from 'next/server';
import { getToken } from './utils/auth/token';
import jwt from 'jsonwebtoken';

export function middleware(req) {
    const token = getToken();

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

// Opcional: configurar rutas protegidas en middleware.config.js
export const config = {
    matcher: ['/dashboard'], // rutas protegidas
};

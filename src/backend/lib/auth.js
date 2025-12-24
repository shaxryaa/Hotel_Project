import { NextResponse } from 'next/server';
import { verifyToken } from '@/backend/lib/jwt';
import prisma from '@/backend/lib/prisma';

export async function authenticateAdmin(request) {
    const authHeader = request.headers.get('authorization') || '';

    if (!authHeader.startsWith('Bearer ')) {
        return { error: 'Invalid auth header format', status: 401 };
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return { error: 'Unauthorized', status: 401 };
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
        return { error: 'Invalid token', status: 401 };
    }

    const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
    });

    if (!user) {
        return { error: 'User not found', status: 401 };
    }

    if (!user.isAdmin) {
        return { error: 'Forbidden: Admin access required', status: 403 };
    }

    if (user.email !== 'example@gmail.com') {
        return { error: 'Forbidden: You are not authorized', status: 403 };
    }

    return { user };
}

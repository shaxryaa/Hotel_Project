import { NextResponse } from 'next/server'
import prisma from '@/backend/lib/prisma'
import { verifyToken } from '@/backend/lib/jwt'

export async function GET(request) {
    try {
        const authHeader = request.headers.get('authorization') || ''
        const token = authHeader.split(' ')[1]

        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const decoded = verifyToken(token)
        if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

        const bookings = await prisma.booking.findMany({
            where: { userId: decoded.userId },
            include: {
                room: {
                    include: {
                        hotel: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json({ bookings })
    } catch (error) {
        console.error('Error fetching my bookings:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

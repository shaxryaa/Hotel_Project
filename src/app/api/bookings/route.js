import { NextResponse } from 'next/server'
import prisma from '@/backend/lib/prisma'
import { verifyToken } from '@/backend/lib/jwt'

export async function POST(request) {
    try {
        const authHeader = request.headers.get('authorization') || ''
        const token = authHeader.split(' ')[1]

        if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const decoded = verifyToken(token)
        if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

        const body = await request.json()
        const { roomId, checkIn, checkOut } = body

        // Calculate total price (needs room fetch)
        const room = await prisma.room.findUnique({ where: { id: roomId } })
        if (!room) return NextResponse.json({ error: 'Room not found' }, { status: 404 })

        const start = new Date(checkIn)
        const end = new Date(checkOut)
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
        const totalPrice = room.price * nights

        const booking = await prisma.booking.create({
            data: {
                userId: decoded.userId,
                roomId,
                checkIn: start,
                checkOut: end,
                totalPrice,
                status: 'PENDING'
            }
        })

        return NextResponse.json({ booking }, { status: 201 })
    } catch (error) {
        console.error('Error creating booking:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

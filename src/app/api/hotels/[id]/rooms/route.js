import { NextResponse } from 'next/server'
import prisma from '@/backend/lib/prisma'
import { authenticateAdmin } from '@/backend/lib/auth'

export async function GET(request, { params }) {
    try {
        const { id } = await params
        const rooms = await prisma.room.findMany({
            where: { hotelId: parseInt(id) }
        })

        return NextResponse.json({ rooms })
    } catch (error) {
        console.error('Error fetching rooms:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function POST(request, { params }) {
    try {
        const auth = await authenticateAdmin(request);
        if (auth.error) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        const { id } = await params
        const body = await request.json()
        const { name, description, price, capacity, amenities } = body

        const room = await prisma.room.create({
            data: {
                hotelId: parseInt(id),
                name,
                description,
                price: parseFloat(price),
                capacity: parseInt(capacity),
                amenities: amenities || []
            }
        })

        return NextResponse.json({ room }, { status: 201 })
    } catch (error) {
        console.error('Error creating room:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

import { NextResponse } from 'next/server'
import prisma from '@/backend/lib/prisma'
import { authenticateAdmin } from '@/backend/lib/auth'

export async function GET(request, { params }) {
    try {
        const { id } = await params
        const hotel = await prisma.hotel.findUnique({
            where: { id: parseInt(id) },
            include: {
                rooms: true,
                reviews: {
                    include: { user: { select: { name: true } } }
                }
            }
        })

        if (!hotel) {
            return NextResponse.json({ error: 'Hotel not found' }, { status: 404 })
        }

        return NextResponse.json({ hotel })
    } catch (error) {
        console.error('Error fetching hotel details:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function PUT(request, { params }) {
    try {
        const auth = await authenticateAdmin(request);
        if (auth.error) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        const { id } = await params
        const body = await request.json()
        const { name, description, city, country, address, mainImage, images, amenities } = body

        const hotel = await prisma.hotel.update({
            where: { id: parseInt(id) },
            data: {
                name, description, city, country, address, mainImage, images, amenities
            }
        })

        return NextResponse.json({ hotel })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update hotel' }, { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        const auth = await authenticateAdmin(request);
        if (auth.error) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        const { id } = await params
        // Check for dependencies (bookings) - simplistic approach: delete cascade logic should be in schema or handle manually
        // For now, let's assume we can just delete (Prisma might throw if FK constraints exist without cascade)

        await prisma.hotel.delete({
            where: { id: parseInt(id) }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to delete hotel' }, { status: 500 })
    }
}

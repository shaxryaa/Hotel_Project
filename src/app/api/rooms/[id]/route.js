import { NextResponse } from 'next/server'
import prisma from '@/backend/lib/prisma'
import { authenticateAdmin } from '@/backend/lib/auth'

export async function DELETE(request, { params }) {
    try {
        const auth = await authenticateAdmin(request);
        if (auth.error) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        const { id } = await params // Room ID

        await prisma.room.delete({
            where: { id: parseInt(id) }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting room:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

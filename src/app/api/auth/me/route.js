import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/jwt'

export async function GET(request) {
  try {
    // Accept token from Authorization header first, then cookie as fallback
    const authHeader = request.headers.get('authorization') || ''
    const tokenFromHeader = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null
    const token = tokenFromHeader || request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


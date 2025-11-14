import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma.js';
import { generateToken } from '@/lib/jwt'

export async function POST(request) {
  try {
    if (!process.env.DATABASE_URL || !process.env.JWT_SECRET) {
      console.error('Missing required environment variables');
      return NextResponse.json(
        { error: 'Server misconfigured' },
        { status: 500 }
      );
    }
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const token = generateToken(user.id)

    return NextResponse.json(
      { 
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


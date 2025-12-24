import { NextResponse } from 'next/server'
import prisma from '@/backend/lib/prisma'
import { authenticateAdmin } from '@/backend/lib/auth'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')

    // Build query conditions
    const where = {}
    if (city) {
      where.city = { contains: city, mode: 'insensitive' }
    }

    const hotels = await prisma.hotel.findMany({
      where,
      include: {
        rooms: true,
        reviews: true,
      }
    })

    return NextResponse.json({ hotels })
  } catch (error) {
    console.error('Error fetching hotels:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const auth = await authenticateAdmin(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await request.json()
    const { name, description, city, country, address, mainImage, images, amenities } = body

    const hotel = await prisma.hotel.create({
      data: {
        name,
        description,
        city,
        country,
        address,
        mainImage,
        images: images || [],
        amenities: amenities || [],
      }
    })

    return NextResponse.json({ hotel }, { status: 201 })
  } catch (error) {
    console.error('Error creating hotel:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

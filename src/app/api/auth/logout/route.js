import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json(
    { message: 'Logged out successfully' },
    { status: 200 }
  )

  // If the client is storing token in localStorage, they should remove it there.
  // Server-side logout remains a no-op for localStorage-based tokens.
  return response
}


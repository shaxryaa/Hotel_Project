import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { authenticateAdmin } from '@/backend/lib/auth';

export async function POST(request) {
    try {
        // 1. Auth Check
        const auth = await authenticateAdmin(request);
        if (auth.error) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        // 2. Parse FormData
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file received.' }, { status: 400 });
        }

        // 3. Convert to Buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // 4. Generate unique filename
        // Sanitize filename: remove spaces, special chars
        const originalName = file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.-]/g, '');
        const filename = `${Date.now()}-${originalName}`;

        // 5. Write to public/uploads
        // Ensure directory exists (we did mkdir already, but good to be safe logically)
        const uploadDir = path.join(process.cwd(), 'public/uploads');
        const filePath = path.join(uploadDir, filename);

        await writeFile(filePath, buffer);

        // 6. Return public URL
        const url = `/uploads/${filename}`;

        return NextResponse.json({ url }, { status: 201 });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}

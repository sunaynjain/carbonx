import { NextResponse } from 'next/server';
import { addDocument } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const category = formData.get('category') as string | null;
    const farmId = formData.get('farmId') as string | null;
    const projectId = formData.get('projectId') as string | null;

    if (!file || !category) {
      return NextResponse.json({ error: 'File and category are required' }, { status: 400 });
    }

    // Validate size (e.g., 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    // Convert file to base64 for demo purposes
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString('base64');
    const mimeType = file.type;
    const url = `data:${mimeType};base64,${base64Data}`;

    const doc = {
      farmId: farmId || undefined,
      projectId: projectId || undefined,
      fileName: file.name,
      fileType: mimeType,
      category,
      url,
    };

    const newDoc = await addDocument(doc);
    return NextResponse.json({ success: true, document: newDoc });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload document' }, { status: 500 });
  }
}

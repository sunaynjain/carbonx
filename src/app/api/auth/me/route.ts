import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    user: { id: 'demo-user', name: 'Demo User', role: 'admin' }
  });
}

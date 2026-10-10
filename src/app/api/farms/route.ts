import { NextResponse } from 'next/server';
import { getFarms, addFarm } from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET() {
  noStore();
  try {
    const farms = await getFarms();
    return NextResponse.json({ farms });
  } catch (error: unknown) {
    console.error("Farms GET Error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Failed to load farms" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validate inputs loosely
    if (!body.name || !body.ownerName || !body.area) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const newFarm = await addFarm({
      name: body.name,
      ownerName: body.ownerName,
      area: Number(body.area),
      cropType: body.cropType || 'Unknown',
      location: body.location || { lat: 20.5937, lng: 78.9629 },
      geometry: body.geometry
    });
    
    return NextResponse.json({ farm: newFarm }, { status: 201 });
  } catch (error: unknown) {
    console.error("Farms POST Error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Failed to add farm' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getFarm } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ farmId: string }> }
) {
  const { farmId } = await params;
  const farm = await getFarm(farmId);
  
  if (!farm) {
    return NextResponse.json({ error: 'Farm not found' }, { status: 404 });
  }

  // Adding mocked carbon potential and MRV data for the demo
  const enhancedFarm = {
    ...farm,
    documents: [
      { id: 'doc1', file_name: 'Land_Title.pdf', type: 'pdf', uploaded_at: farm.createdAt, status: 'verified' },
    ],
    carbonPotential: {
      estimated_tco2e_per_year: Math.round(farm.area * 3.5),
      additionality_score: 'High',
      permanence_risk: 'Low',
      project_readiness: 'Eligible'
    }
  };

  return NextResponse.json({ farm: enhancedFarm });
}

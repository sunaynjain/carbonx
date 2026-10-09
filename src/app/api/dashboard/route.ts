import { NextResponse } from 'next/server';
import { getDashboardStats, getFarms, getActivities } from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';

export async function GET() {
  noStore();
  try {
    const stats = await getDashboardStats();
    const farms = await getFarms();
    const allActivities = await getActivities();
    const activities = allActivities.slice(0, 5); // Latest 5
    return NextResponse.json({ stats, farms, activities });
  } catch (error: unknown) {
    console.error("Dashboard API Error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Failed to load dashboard data" }, { status: 500 });
  }
}

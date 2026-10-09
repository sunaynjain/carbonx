import { neon } from '@neondatabase/serverless';

export interface Farm {
  id: string;
  name: string;
  ownerName: string;
  area: number; 
  cropType: string;
  status: 'Pending' | 'Mapped' | 'Assessed' | 'Verified';
  createdAt: string;
  location?: Record<string, unknown>; 
  geometry?: Record<string, unknown>; 
  readinessScore: number;
}

export interface FPO {
  id: string;
  name: string;
  farmsCount: number;
}

export interface ActivityEvent {
  id: string;
  farm_id?: string;
  action: string;
  timestamp: string;
  type: 'registration' | 'evidence' | 'assessment' | 'report';
}

// Ensure database URL is available, otherwise provide a clear error message.
// In production, Next.js will use the Vercel env variable.
const sql = process.env.DATABASE_URL 
  ? neon(process.env.DATABASE_URL) 
  : null;

/**
 * Migration Script / Schema setup.
 * Run this function manually or via a separate script to initialize the DB.
 */
export async function runMigrations() {
  if (!sql) throw new Error("DATABASE_URL is not set.");
  
  await sql`
    CREATE TABLE IF NOT EXISTS farms (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      owner_name VARCHAR(255) NOT NULL,
      area DECIMAL NOT NULL,
      crop_type VARCHAR(255) NOT NULL,
      status VARCHAR(50) NOT NULL,
      created_at TIMESTAMP NOT NULL,
      location JSONB,
      readiness_score INTEGER NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS fpos (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      farms_count INTEGER NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS activities (
      id VARCHAR(255) PRIMARY KEY,
      farm_id VARCHAR(255),
      action TEXT NOT NULL,
      timestamp TIMESTAMP NOT NULL,
      type VARCHAR(50) NOT NULL
    );
  `;
}

interface DBFarm {
  id: string;
  name: string;
  owner_name: string;
  area: number;
  crop_type: string;
  status: 'Pending' | 'Mapped' | 'Assessed' | 'Verified';
  created_at?: Date | string;
  location?: Record<string, unknown>;
  readiness_score: number;
}

const mapFarm = (f: DBFarm): Farm => ({
  id: String(f.id),
  name: String(f.name),
  ownerName: String(f.owner_name),
  area: Number(f.area),
  cropType: String(f.crop_type),
  status: f.status,
  createdAt: f.created_at 
    ? (f.created_at instanceof Date ? f.created_at.toISOString() : String(f.created_at)) 
    : new Date().toISOString(),
  location: f.location,
  readinessScore: Number(f.readiness_score)
});

export const getFarms = async () => {
  if (!sql) return []; // Fallback for local testing if DB not connected
  const result = await sql`SELECT * FROM farms ORDER BY created_at DESC;`;
  return result.map((row) => mapFarm(row as unknown as DBFarm));
};

export const getActivities = async () => {
  if (!sql) return [];
  const result = await sql`SELECT * FROM activities ORDER BY timestamp DESC;`;
  type DBActivity = { id: string; farm_id?: string; action: string; timestamp?: Date | string; type: string };
  return result.map((row) => {
    const a = row as unknown as DBActivity;
    return {
      id: String(a.id),
      farmId: a.farm_id ? String(a.farm_id) : undefined,
      action: String(a.action),
      type: a.type as 'registration' | 'evidence' | 'assessment' | 'report',
      timestamp: a.timestamp 
        ? (a.timestamp instanceof Date ? a.timestamp.toISOString() : String(a.timestamp)) 
        : new Date().toISOString()
    };
  });
};

export const getFarm = async (id: string) => {
  if (!sql) return null;
  const result = await sql`SELECT * FROM farms WHERE id = ${id} LIMIT 1;`;
  return result.length > 0 ? mapFarm(result[0] as unknown as DBFarm) : null;
};

export const addFarm = async (farm: { name: string; ownerName: string; area: number; cropType: string; location: Record<string, unknown> }) => {
  if (!sql) throw new Error("Database not connected");

  const id = `farm-${Date.now()}`;
  const createdAt = new Date().toISOString();
  const status = 'Pending';
  const readinessScore = 25;

  await sql`
    INSERT INTO farms (id, name, owner_name, area, crop_type, status, created_at, location, readiness_score)
    VALUES (${id}, ${farm.name}, ${farm.ownerName}, ${farm.area}, ${farm.cropType}, ${status}, ${createdAt}, ${JSON.stringify(farm.location)}, ${readinessScore});
  `;

  const activityId = `act-${Date.now()}`;
  await sql`
    INSERT INTO activities (id, farm_id, action, timestamp, type)
    VALUES (${activityId}, ${id}, ${'Farm ' + farm.name + ' registered'}, ${createdAt}, 'registration');
  `;

  return { id, name: farm.name, ownerName: farm.ownerName, area: farm.area, cropType: farm.cropType, status, createdAt: createdAt, location: farm.location, readinessScore: readinessScore };
};

export const getDashboardStats = async () => {
  if (!sql) {
    return {
      registeredFarms: 0,
      totalArea: 0,
      activeFpos: 0,
      estCarbonPotential: '0 tCO2e',
      verifiedProjects: 0,
    };
  }

  const farmsCountRes = await sql`SELECT COUNT(*) as count, SUM(area) as total_area FROM farms;`;
  const fposCountRes = await sql`SELECT COUNT(*) as count FROM fpos;`;
  
  const registeredFarms = parseInt(farmsCountRes[0].count, 10);
  const totalArea = parseFloat(farmsCountRes[0].total_area || '0');
  const activeFpos = parseInt(fposCountRes[0].count, 10);

  return {
    registeredFarms,
    totalArea,
    activeFpos,
    estCarbonPotential: `${Math.round(totalArea * 3.5)} tCO2e`,
    verifiedProjects: 3, // Mocked for now
  };
};

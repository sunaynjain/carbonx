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
  location: string;
  farmsCount: number;
  totalArea: number;
}

export interface ActivityEvent {
  id: string;
  farmId?: string;
  projectId?: string;
  action: string;
  timestamp: string;
  type: 'registration' | 'evidence' | 'assessment' | 'report' | 'project';
}

export interface DocumentRecord {
  id: string;
  farmId?: string;
  projectId?: string;
  fileName: string;
  fileType: string;
  category: string;
  status: 'Uploaded' | 'Pending Review' | 'Accepted' | 'Needs Correction' | 'Rejected';
  uploadedAt: string;
  url: string; // URL or mock path
}

export interface Project {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'Proposed' | 'Under Preparation' | 'Submitted' | 'Verified';
  aggregatedArea: number;
  createdAt: string;
}

// Ensure database URL is available, otherwise provide a clear error message.
export const sql = process.env.DATABASE_URL 
  ? neon(process.env.DATABASE_URL) 
  : null;

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
      geometry JSONB,
      readiness_score INTEGER NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS fpos (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255) DEFAULT '',
      farms_count INTEGER NOT NULL DEFAULT 0,
      total_area DECIMAL NOT NULL DEFAULT 0
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS activities (
      id VARCHAR(255) PRIMARY KEY,
      farm_id VARCHAR(255),
      project_id VARCHAR(255),
      action TEXT NOT NULL,
      timestamp TIMESTAMP NOT NULL,
      type VARCHAR(50) NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS documents (
      id VARCHAR(255) PRIMARY KEY,
      farm_id VARCHAR(255),
      project_id VARCHAR(255),
      file_name VARCHAR(255) NOT NULL,
      file_type VARCHAR(50) NOT NULL,
      category VARCHAR(100) NOT NULL,
      status VARCHAR(50) NOT NULL,
      uploaded_at TIMESTAMP NOT NULL,
      url TEXT NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      type VARCHAR(100) NOT NULL,
      status VARCHAR(50) NOT NULL,
      aggregated_area DECIMAL NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS project_farms (
      project_id VARCHAR(255) NOT NULL,
      farm_id VARCHAR(255) NOT NULL,
      PRIMARY KEY (project_id, farm_id)
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
  geometry?: Record<string, unknown>;
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
  geometry: f.geometry,
  readinessScore: Number(f.readiness_score)
});

export const getFarms = async () => {
  if (!sql) return []; 
  const result = await sql`SELECT * FROM farms ORDER BY created_at DESC;`;
  return result.map((row) => mapFarm(row as unknown as DBFarm));
};

export const getFarm = async (id: string) => {
  if (!sql) return null;
  const result = await sql`SELECT * FROM farms WHERE id = ${id} LIMIT 1;`;
  return result.length > 0 ? mapFarm(result[0] as unknown as DBFarm) : null;
};

export const addFarm = async (farm: { name: string; ownerName: string; area: number; cropType: string; location: Record<string, unknown>; geometry?: Record<string, unknown> }) => {
  if (!sql) throw new Error("Database not connected");

  const id = `farm-${Date.now()}`;
  const createdAt = new Date().toISOString();
  const status = 'Pending';
  const readinessScore = 25;

  await sql`
    INSERT INTO farms (id, name, owner_name, area, crop_type, status, created_at, location, geometry, readiness_score)
    VALUES (${id}, ${farm.name}, ${farm.ownerName}, ${farm.area}, ${farm.cropType}, ${status}, ${createdAt}, ${JSON.stringify(farm.location)}, ${farm.geometry ? JSON.stringify(farm.geometry) : null}, ${readinessScore});
  `;

  const activityId = `act-${Date.now()}`;
  await sql`
    INSERT INTO activities (id, farm_id, action, timestamp, type)
    VALUES (${activityId}, ${id}, ${'Farm ' + farm.name + ' registered'}, ${createdAt}, 'registration');
  `;

  return getFarm(id);
};

export const updateFarmGeometry = async (id: string, area: number, geometry: any) => {
  if (!sql) throw new Error("Database not connected");
  await sql`UPDATE farms SET geometry = ${JSON.stringify(geometry)}, area = ${area}, status = 'Mapped' WHERE id = ${id}`;
  
  const activityId = `act-${Date.now()}`;
  await sql`
    INSERT INTO activities (id, farm_id, action, timestamp, type)
    VALUES (${activityId}, ${id}, 'Farm boundaries mapped', ${new Date().toISOString()}, 'registration');
  `;
  return getFarm(id);
};

export const getActivities = async (farmId?: string) => {
  if (!sql) return [];
  const result = farmId 
    ? await sql`SELECT * FROM activities WHERE farm_id = ${farmId} ORDER BY timestamp DESC;`
    : await sql`SELECT * FROM activities ORDER BY timestamp DESC;`;
  
  type DBActivity = { id: string; farm_id?: string; action: string; timestamp?: Date | string; type: string };
  return result.map((row) => {
    const a = row as unknown as DBActivity;
    return {
      id: String(a.id),
      farmId: a.farm_id ? String(a.farm_id) : undefined,
      action: String(a.action),
      type: a.type as ActivityEvent['type'],
      timestamp: a.timestamp 
        ? (a.timestamp instanceof Date ? a.timestamp.toISOString() : String(a.timestamp)) 
        : new Date().toISOString()
    };
  });
};

export const getDocuments = async (farmId?: string) => {
  if (!sql) return [];
  const result = farmId
    ? await sql`SELECT * FROM documents WHERE farm_id = ${farmId} ORDER BY uploaded_at DESC;`
    : await sql`SELECT * FROM documents ORDER BY uploaded_at DESC;`;
  return result.map((row) => ({
    id: String(row.id),
    farmId: row.farm_id ? String(row.farm_id) : undefined,
    projectId: row.project_id ? String(row.project_id) : undefined,
    fileName: String(row.file_name),
    fileType: String(row.file_type),
    category: String(row.category),
    status: String(row.status) as DocumentRecord['status'],
    uploadedAt: row.uploaded_at instanceof Date ? row.uploaded_at.toISOString() : String(row.uploaded_at),
    url: String(row.url)
  }));
};

export const addDocument = async (doc: { farmId?: string; projectId?: string; fileName: string; fileType: string; category: string; url: string }) => {
  if (!sql) throw new Error("Database not connected");
  const id = `doc-${Date.now()}`;
  const uploadedAt = new Date().toISOString();
  await sql`
    INSERT INTO documents (id, farm_id, project_id, file_name, file_type, category, status, uploaded_at, url)
    VALUES (${id}, ${doc.farmId || null}, ${doc.projectId || null}, ${doc.fileName}, ${doc.fileType}, ${doc.category}, 'Uploaded', ${uploadedAt}, ${doc.url})
  `;
  return { id, ...doc, status: 'Uploaded', uploadedAt };
};

export const getDashboardStats = async () => {
  if (!sql) {
    return { registeredFarms: 0, totalArea: 0, activeFpos: 0, estCarbonPotential: '0 tCO2e', verifiedProjects: 0 };
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
    verifiedProjects: 0,
  };
};

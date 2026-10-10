import React from 'react';
import Link from 'next/link';
import { Briefcase, ChevronRight, Leaf, Sprout, AlertTriangle, ShieldCheck, TrendingUp, Calendar, MapPin } from 'lucide-react';

const mockProjects = [
  {
    id: 'prj-101',
    name: 'Maha Agro-Forestry Initiative',
    type: 'Agroforestry',
    fpos: ['FPO-001 (Kisan Union)', 'FPO-004 (Green Horizon)'],
    farmsCount: 120,
    landArea: 1540, // hectares
    status: 'Development',
    timeline: 'Q1 2024 - Q4 2029',
    readiness: 78,
    estCredits: 45000,
    evidenceCompletion: 85,
    risks: 'Low',
    activityTrend: '+12%',
  },
  {
    id: 'prj-102',
    name: 'Punjab Soil Carbon Transition',
    type: 'Regenerative Agriculture',
    fpos: ['FPO-002 (Punjab Farmers Co)'],
    farmsCount: 85,
    landArea: 890,
    status: 'Feasibility',
    timeline: 'Q3 2024 - Q2 2030',
    readiness: 45,
    estCredits: 22000,
    evidenceCompletion: 40,
    risks: 'Medium',
    activityTrend: '+5%',
  },
  {
    id: 'prj-103',
    name: 'Coastal Mangrove Restoration',
    type: 'Blue Carbon / Afforestation',
    fpos: ['FPO-005 (Coastal Agro)'],
    farmsCount: 42,
    landArea: 320,
    status: 'Implementation',
    timeline: 'Q1 2023 - Q4 2028',
    readiness: 95,
    estCredits: 12500,
    evidenceCompletion: 98,
    risks: 'Low',
    activityTrend: '+18%',
  }
];

export default function ProjectsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif text-forest-deep mb-2">Projects Dashboard</h1>
          <p className="text-text-muted">Manage your aggregated carbon projects, track readiness, and monitor estimated yields.</p>
        </div>
        <button className="px-5 py-2.5 bg-forest hover:bg-forest-deep text-ivory rounded-lg transition-colors shadow-sm font-medium flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          Create New Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-xl border border-border-subtle shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center mr-4 text-forest">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium">Active Projects</p>
            <p className="text-3xl font-bold text-forest-deep">3</p>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-border-subtle shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-full bg-earth/10 flex items-center justify-center mr-4 text-earth">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium">Total Area Under Mgmt</p>
            <p className="text-3xl font-bold text-forest-deep">2,750 <span className="text-lg font-normal text-text-muted">ha</span></p>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-border-subtle shadow-sm flex items-center">
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mr-4 text-gold-deep">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium">Est. Potential Yield</p>
            <p className="text-3xl font-bold text-forest-deep">79.5k <span className="text-lg font-normal text-text-muted">tCO2e</span></p>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border-subtle rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border-subtle bg-surface-muted/50">
          <h2 className="text-lg font-semibold text-text-main">Project Portfolio</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-border-subtle text-xs uppercase text-text-muted">
                <th className="px-6 py-4 font-semibold">Project Name & Type</th>
                <th className="px-6 py-4 font-semibold">Scale</th>
                <th className="px-6 py-4 font-semibold">Readiness & Evidence</th>
                <th className="px-6 py-4 font-semibold">Risks & Trend</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {mockProjects.map((project) => (
                <tr key={project.id} className="hover:bg-surface-muted/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="font-semibold text-text-main text-base">{project.name}</div>
                    <div className="text-sm text-text-muted flex items-center mt-1">
                      <Leaf className="w-3 h-3 mr-1" />
                      {project.type}
                    </div>
                    <div className="text-xs text-text-muted mt-2 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.timeline}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm text-text-main font-medium">{project.landArea} ha</div>
                    <div className="text-xs text-text-muted mt-1">{project.farmsCount} farms</div>
                    <div className="text-xs text-text-muted mt-1 truncate max-w-[150px]" title={project.fpos.join(', ')}>
                      {project.fpos.length} FPOs
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-muted">Readiness</span>
                        <span className="font-medium">{project.readiness}%</span>
                      </div>
                      <div className="w-full bg-border-subtle rounded-full h-1.5">
                        <div className="bg-forest h-1.5 rounded-full" style={{ width: `${project.readiness}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-muted">Evidence</span>
                        <span className="font-medium">{project.evidenceCompletion}%</span>
                      </div>
                      <div className="w-full bg-border-subtle rounded-full h-1.5">
                        <div className="bg-earth h-1.5 rounded-full" style={{ width: `${project.evidenceCompletion}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-fit
                        ${project.risks === 'Low' ? 'bg-green-100 text-green-800' : 
                          project.risks === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {project.risks === 'Low' ? <ShieldCheck className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                        {project.risks} Risk
                      </span>
                      <span className="inline-flex items-center text-xs font-medium text-forest">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {project.activityTrend} Activity
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Link href={`/projects/${project.id}`}>
                      <button className="inline-flex items-center text-sm font-medium text-forest hover:text-forest-deep transition-colors bg-forest/5 hover:bg-forest/10 px-3 py-1.5 rounded-lg">
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

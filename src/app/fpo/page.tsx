'use client';
import React, { useState } from 'react';
import { Search, Users, Map, ShieldCheck, Plus, Building2, ChevronRight } from 'lucide-react';

export default function FPOPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Demo FPO data
  const fpos = [
    {
      id: 'fpo-1',
      name: 'Vidhya Farmers FPO',
      region: 'Madhya Pradesh',
      farmsCount: 124,
      totalAcreage: 3450,
      readiness: 65,
      clusters: 3
    },
    {
      id: 'fpo-2',
      name: 'Green Earth Collectives',
      region: 'Maharashtra',
      farmsCount: 89,
      totalAcreage: 1800,
      readiness: 40,
      clusters: 1
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif text-forest-deep mb-1">Farmer Producer Organizations</h2>
          <p className="text-text-muted">Manage FPO profiles and analyze aggregated carbon project clusters.</p>
        </div>
        <button className="bg-forest text-ivory px-5 py-2.5 rounded-lg font-medium hover:bg-forest-deep transition-colors flex items-center shadow-sm">
          <Plus className="w-5 h-5 mr-2" />
          Register FPO
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6">
          <div className="flex items-center mb-2">
            <Building2 className="w-5 h-5 text-forest mr-2" />
            <h3 className="font-medium text-text-muted">Active FPOs</h3>
          </div>
          <p className="text-3xl font-serif text-forest-deep">2</p>
        </div>
        <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6">
          <div className="flex items-center mb-2">
            <Users className="w-5 h-5 text-forest mr-2" />
            <h3 className="font-medium text-text-muted">Total Farmers</h3>
          </div>
          <p className="text-3xl font-serif text-forest-deep">213</p>
        </div>
        <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6">
          <div className="flex items-center mb-2">
            <Map className="w-5 h-5 text-forest mr-2" />
            <h3 className="font-medium text-text-muted">Aggregated Area</h3>
          </div>
          <p className="text-3xl font-serif text-forest-deep">5,250 <span className="text-lg font-sans text-text-muted">Acres</span></p>
        </div>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle overflow-hidden">
        <div className="p-5 border-b border-border-subtle flex justify-between items-center bg-surface-muted/30">
          <h3 className="text-xl font-serif text-forest-deep hidden sm:block">Organization Directory</h3>
          <div className="relative flex-1 sm:max-w-md ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search FPOs..." 
              className="w-full pl-10 pr-4 py-2 bg-surface border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-forest text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="divide-y divide-border-subtle">
          {fpos.map(fpo => (
            <div key={fpo.id} className="p-6 hover:bg-surface-muted/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-bold text-forest-deep">{fpo.name}</h4>
                  <span className="px-2.5 py-0.5 bg-sage/20 text-forest text-xs font-medium rounded-full">Active</span>
                </div>
                <p className="text-sm text-text-muted flex items-center">
                  <Map className="w-4 h-4 mr-1.5" /> {fpo.region}
                </p>
              </div>
              
              <div className="flex items-center gap-8 text-sm">
                <div className="text-center">
                  <p className="text-text-muted mb-1">Farms</p>
                  <p className="font-bold text-forest-deep">{fpo.farmsCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-text-muted mb-1">Total Acreage</p>
                  <p className="font-bold text-forest-deep">{fpo.totalAcreage}</p>
                </div>
                <div className="text-center">
                  <p className="text-text-muted mb-1">Project Clusters</p>
                  <p className="font-bold text-forest-deep">{fpo.clusters}</p>
                </div>
                <div className="text-center">
                  <p className="text-text-muted mb-1">Avg Readiness</p>
                  <div className="flex items-center">
                    <ShieldCheck className="w-4 h-4 text-gold mr-1" />
                    <p className="font-bold text-forest-deep">{fpo.readiness}%</p>
                  </div>
                </div>
              </div>
              
              <div className="md:ml-4 flex items-center">
                <button className="flex items-center text-forest font-medium hover:text-forest-deep group">
                  View Clusters
                  <ChevronRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

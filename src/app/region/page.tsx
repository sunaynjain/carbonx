'use client';
import React, { useState } from 'react';
import { MapPin, Filter, Search, ChevronRight, Layers } from 'lucide-react';
import LeafletMap from '@/components/ui/Map';

export default function RegionPage() {
  const [activeRegion, setActiveRegion] = useState('all');

  return (
    <div className="space-y-8 h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 shrink-0">
        <div>
          <h2 className="text-3xl font-serif text-forest-deep mb-1">Regional Carbon Opportunity</h2>
          <p className="text-text-muted">Explore candidate farms and potential clusters geographically.</p>
        </div>
        <div className="flex gap-3">
          <select 
            className="bg-surface border border-border-subtle text-text-main rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-forest text-sm font-medium"
            value={activeRegion}
            onChange={(e) => setActiveRegion(e.target.value)}
          >
            <option value="all">All Regions</option>
            <option value="mh">Maharashtra</option>
            <option value="mp">Madhya Pradesh</option>
            <option value="rj">Rajasthan</option>
          </select>
          <button className="bg-surface text-forest border border-border-subtle px-4 py-2 rounded-lg text-sm font-medium hover:border-sage transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-surface rounded-2xl shadow-sm border border-border-subtle overflow-hidden flex flex-col md:flex-row min-h-0">
        
        {/* Map Area */}
        <div className="flex-1 relative z-0 h-[400px] md:h-auto">
          <LeafletMap />
          
          <div className="absolute bottom-6 left-6 z-[1000] bg-surface/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-border-subtle">
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Map Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <span className="w-3 h-3 rounded-full bg-forest mr-2"></span> Registered Farm
              </div>
              <div className="flex items-center text-sm">
                <span className="w-3 h-3 rounded-full bg-gold mr-2"></span> Assessment Pending
              </div>
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 border-2 border-sage border-dashed mr-2"></div> Potential Cluster
              </div>
            </div>
          </div>
          
          <div className="absolute top-6 left-6 z-[1000]">
            <button className="bg-surface p-2 rounded-lg shadow-md border border-border-subtle text-text-muted hover:text-forest transition-colors">
              <Layers className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-96 bg-surface-muted/30 border-t md:border-t-0 md:border-l border-border-subtle flex flex-col shrink-0 h-full overflow-y-auto">
          <div className="p-6 border-b border-border-subtle bg-surface sticky top-0 z-10">
            <h3 className="text-xl font-serif text-forest-deep mb-4">Cluster Explorer</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search clusters..." 
                className="w-full pl-10 pr-4 py-2 bg-surface-muted border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-forest text-sm"
              />
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="bg-surface p-4 rounded-xl border border-border-subtle hover:border-forest hover:shadow-md transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-forest-deep">Vidhya FPO Cluster</h4>
                <span className="px-2 py-0.5 bg-sage/20 text-forest text-xs font-medium rounded">High Priority</span>
              </div>
              <p className="text-sm text-text-muted mb-4 flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> Madhya Pradesh
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <p className="text-text-muted text-xs">Agg. Area</p>
                  <p className="font-medium text-text-main">3,450 ac</p>
                </div>
                <div>
                  <p className="text-text-muted text-xs">Farms</p>
                  <p className="font-medium text-text-main">124</p>
                </div>
              </div>
              <button className="w-full text-center text-sm font-medium text-forest group-hover:text-forest-deep transition-colors flex items-center justify-center">
                View Records <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="bg-surface p-4 rounded-xl border border-border-subtle hover:border-forest hover:shadow-md transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-forest-deep">Green Earth South</h4>
                <span className="px-2 py-0.5 bg-gold/10 text-gold text-xs font-medium rounded">Review Needed</span>
              </div>
              <p className="text-sm text-text-muted mb-4 flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> Maharashtra
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div>
                  <p className="text-text-muted text-xs">Agg. Area</p>
                  <p className="font-medium text-text-main">1,800 ac</p>
                </div>
                <div>
                  <p className="text-text-muted text-xs">Farms</p>
                  <p className="font-medium text-text-main">89</p>
                </div>
              </div>
              <button className="w-full text-center text-sm font-medium text-forest group-hover:text-forest-deep transition-colors flex items-center justify-center">
                View Records <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <p className="text-xs text-center text-text-muted pt-4 italic">
              * Map uses demo coordinates and does not display real project boundaries.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

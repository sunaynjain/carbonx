"use client";
import React, { useState, useEffect } from 'react';
import { Loader2, Calendar, MapPin, Eye, ChevronDown } from 'lucide-react';
import BeforeAfterSlider from '@/components/monitoring/BeforeAfterSlider';

export default function MonitoringStudio() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [farms, setFarms] = useState<any[]>([]);
  const [selectedFarmId, setSelectedFarmId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/farms')
      .then(res => res.json())
      .then(d => {
        setFarms(d.farms || []);
        if (d.farms && d.farms.length > 0) {
          setSelectedFarmId(d.farms[0].id);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const selectedFarm = farms.find(f => f.id === selectedFarmId);

  // Mock available observation dates
  const observationDates = [
    { id: 'obs-1', date: '2025-10-01', label: 'Baseline', image: 'https://images.unsplash.com/photo-1592982537447-6f23342d8f63?auto=format&fit=crop&q=80&w=1200' },
    { id: 'obs-2', date: '2026-05-15', label: 'Mid-Season', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1200' },
    { id: 'obs-3', date: '2026-10-10', label: 'Current', image: 'https://images.unsplash.com/photo-1586771107445-d3af1b017b20?auto=format&fit=crop&q=80&w=1200' }
  ];

  const [beforeObsId, setBeforeObsId] = useState<string>(observationDates[0].id);
  const [afterObsId, setAfterObsId] = useState<string>(observationDates[2].id);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-forest" />
      </div>
    );
  }

  const beforeObs = observationDates.find(o => o.id === beforeObsId) || observationDates[0];
  const afterObs = observationDates.find(o => o.id === afterObsId) || observationDates[2];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif text-forest-deep mb-1">Change Detection Studio</h2>
          <p className="text-text-muted">Satellite imagery monitoring and practice verification.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6">
            <h3 className="font-serif text-forest-deep text-lg mb-4">Workspace Selection</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-main mb-1">Farm</label>
                <div className="relative">
                  <select 
                    value={selectedFarmId} 
                    onChange={e => setSelectedFarmId(e.target.value)}
                    className="w-full appearance-none bg-surface border border-border-subtle rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/50 focus:border-forest"
                  >
                    {farms.map(f => (
                      <option key={f.id} value={f.id}>{f.name} ({f.ownerName})</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-text-muted pointer-events-none" />
                </div>
              </div>
              
              {selectedFarm && (
                <div className="p-3 bg-surface-muted rounded-xl text-sm space-y-2 border border-border-subtle">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Area</span>
                    <span className="font-medium">{selectedFarm.area} Acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Crop</span>
                    <span className="font-medium">{selectedFarm.cropType}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <h4 className="font-medium text-sm text-text-main border-t border-border-subtle pt-4">Observation Dates</h4>
              
              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">Before Image</label>
                <select 
                  value={beforeObsId} 
                  onChange={e => setBeforeObsId(e.target.value)}
                  className="w-full bg-surface border border-border-subtle rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-forest"
                >
                  {observationDates.map(o => (
                    <option key={o.id} value={o.id}>{o.date} - {o.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-text-muted mb-1">After Image</label>
                <select 
                  value={afterObsId} 
                  onChange={e => setAfterObsId(e.target.value)}
                  className="w-full bg-surface border border-border-subtle rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-forest"
                >
                  {observationDates.map(o => (
                    <option key={o.id} value={o.id}>{o.date} - {o.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6">
            <h3 className="font-serif text-forest-deep text-lg mb-4">Reviewer Notes</h3>
            <textarea 
              className="w-full bg-surface border border-border-subtle rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest/50 min-h-[120px]"
              placeholder="Add observation notes on crop cover changes, boundary anomalies, etc..."
              defaultValue="Significant increase in vegetative cover observed in the northern quadrant between Baseline and Current observation. Boundary markers appear consistent."
            />
            <button className="mt-3 w-full bg-forest text-ivory px-4 py-2 rounded-lg text-sm font-medium hover:bg-forest-deep transition-colors">
              Save Annotation
            </button>
          </div>
        </div>

        {/* Main View */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle overflow-hidden p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif text-forest-deep">Comparison View</h3>
              <div className="flex space-x-2">
                <button className="flex items-center px-3 py-1.5 bg-surface-muted rounded-lg text-sm font-medium text-text-main border border-border-subtle hover:bg-border-subtle/50 transition-colors">
                  <MapPin className="w-4 h-4 mr-2" />
                  Toggle Boundary
                </button>
                <button className="flex items-center px-3 py-1.5 bg-surface-muted rounded-lg text-sm font-medium text-text-main border border-border-subtle hover:bg-border-subtle/50 transition-colors">
                  <Eye className="w-4 h-4 mr-2" />
                  Enhance Contrast
                </button>
              </div>
            </div>
            
            <BeforeAfterSlider 
              beforeImage={beforeObs.image}
              afterImage={afterObs.image}
              beforeLabel={`${beforeObs.label} (${beforeObs.date})`}
              afterLabel={`${afterObs.label} (${afterObs.date})`}
            />

            <div className="mt-4 flex gap-4 p-4 bg-sage/10 rounded-xl border border-sage/20">
              <div className="flex-1 flex items-start">
                <Calendar className="w-5 h-5 text-forest mt-0.5 mr-3 shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-forest-deep">Temporal Delta: {Math.abs(new Date(afterObs.date).getTime() - new Date(beforeObs.date).getTime()) / (1000 * 60 * 60 * 24)} days</h4>
                  <p className="text-xs text-text-muted mt-1">Comparing {beforeObs.label} against {afterObs.label}. Note the progression of cover crop density.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import React, { useEffect, useState } from 'react';
import { Leaf, Map as MapIcon, ShieldCheck, Loader2, Plus, AlertCircle, Clock, Activity, FileText } from 'lucide-react';
import Link from 'next/link';
import LeafletMap from '@/components/ui/Map';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<{stats: Record<string, any>, farms: any[], activities: any[]} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-forest" />
      </div>
    );
  }

  const chartData = [
    { name: 'Jan', area: 400 },
    { name: 'Feb', area: 800 },
    { name: 'Mar', area: 1500 },
    { name: 'Apr', area: 2100 },
    { name: 'May', area: 3400 },
    { name: 'Jun', area: Math.round((data.stats.totalArea || 3400) + 850) },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif text-forest-deep mb-1">Carbon Command Center</h2>
          <p className="text-text-muted">Overview of active carbon projects and registration pipeline.</p>
        </div>
        <Link 
          href="/farm/add" 
          className="bg-forest text-ivory px-5 py-2.5 rounded-lg font-medium hover:bg-forest-deep transition-colors flex items-center shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Farm
        </Link>
      </div>

      {/* Metric Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-sage/20 p-3 rounded-xl text-forest">
              <MapIcon className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-text-muted mb-1">Registered Farms</p>
          <p className="text-3xl font-serif text-forest-deep">{data.stats.registeredFarms}</p>
        </div>
        <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-sage/20 p-3 rounded-xl text-forest">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-text-muted mb-1">Total Acreage</p>
          <p className="text-3xl font-serif text-forest-deep">
            {data.farms.reduce((acc, f) => acc + Number(f.area), 0).toLocaleString()} <span className="text-lg font-sans text-text-muted">Acres</span>
          </p>
        </div>
        <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-forest/10 p-3 rounded-xl text-forest">
              <Leaf className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium bg-forest text-ivory px-2 py-1 rounded-full">Demo Estimate</span>
          </div>
          <p className="text-sm font-medium text-text-muted mb-1">Est. Carbon Potential</p>
          <p className="text-3xl font-serif text-forest-deep">{data.stats.estCarbonPotential}</p>
        </div>
        <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-gold/20 p-3 rounded-xl text-gold">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-medium text-text-muted mb-1">Project Readiness</p>
          <p className="text-3xl font-serif text-forest-deep">
            {Math.round(data.farms.reduce((acc, f) => acc + (f.readinessScore || 0), 0) / (data.farms.length || 1))}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Map */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border-subtle flex justify-between items-center bg-surface-muted/50">
              <h3 className="text-xl font-serif text-forest-deep">Geospatial Overview</h3>
              <div className="flex gap-2">
                <span className="flex items-center text-xs font-medium text-text-muted bg-surface px-3 py-1.5 rounded-full border border-border-subtle shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-forest mr-2"></span>
                  Active Farms
                </span>
              </div>
            </div>
            <div className="h-[400px] w-full z-0 relative">
              <LeafletMap farms={data.farms} />
            </div>
          </div>

          <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6">
            <h3 className="text-xl font-serif text-forest-deep mb-6">Registered Acreage Growth</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-forest)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-forest)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-subtle)" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--color-text-muted)'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--color-text-muted)'}} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="area" stroke="var(--color-forest)" strokeWidth={3} fillOpacity={1} fill="url(#colorArea)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sidebar panels */}
        <div className="space-y-8">
          <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6">
            <h3 className="text-xl font-serif text-forest-deep mb-4">Readiness Action Items</h3>
            <div className="space-y-4">
              {data.farms.filter(f => (f.readinessScore || 0) < 50).map(farm => (
                <div key={farm.id} className="flex p-4 border border-red-100 bg-red-50/50 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">{farm.name}</p>
                    <p className="text-xs text-red-700 mt-1">Missing required land title evidence and boundary verification.</p>
                    <Link href={`/farm/${farm.id}`} className="text-xs font-medium text-red-600 hover:text-red-800 mt-2 inline-block underline">
                      Review Record
                    </Link>
                  </div>
                </div>
              ))}
              {data.farms.filter(f => (f.readinessScore || 0) < 50).length === 0 && (
                <div className="p-4 border border-border-subtle rounded-xl text-center text-text-muted">
                  <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-sage" />
                  <p className="text-sm">All active farms meet minimum preliminary readiness thresholds.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6">
            <h3 className="text-xl font-serif text-forest-deep mb-4">Recent Activity</h3>
            <div className="space-y-6">
              {data.activities.length > 0 ? data.activities.map(act => (
                <div key={act.id} className="flex relative">
                  <div className="w-8 shrink-0 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-surface-muted border border-border-subtle flex items-center justify-center z-10">
                      {act.type === 'evidence' ? <FileText className="w-4 h-4 text-forest" /> : <Clock className="w-4 h-4 text-forest" />}
                    </div>
                    <div className="w-px h-full bg-border-subtle absolute top-8 left-1/2 -translate-x-1/2 -z-0"></div>
                  </div>
                  <div className="ml-4 pb-2">
                    <p className="text-sm text-text-main font-medium">{act.action}</p>
                    <p className="text-xs text-text-muted mt-1">{act.timestamp.split('T')[0]}</p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-text-muted italic text-center py-4">No recent activity.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

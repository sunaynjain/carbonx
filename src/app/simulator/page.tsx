'use client';
import React, { useState } from 'react';
import { Calculator, BarChart3, SlidersHorizontal, Settings2, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SimulatorPage() {
  const [farms, setFarms] = useState(100);
  const [avgAcres, setAvgAcres] = useState(5);
  const [participation, setParticipation] = useState(80);
  const [seqRate, setSeqRate] = useState(3.5);

  const totalAcres = farms * avgAcres;
  const participatingAcres = totalAcres * (participation / 100);
  const annualSeq = participatingAcres * seqRate;

  const chartData = [
    { year: 'Year 1', tCO2e: Math.round(annualSeq * 1) },
    { year: 'Year 2', tCO2e: Math.round(annualSeq * 2) },
    { year: 'Year 3', tCO2e: Math.round(annualSeq * 3) },
    { year: 'Year 4', tCO2e: Math.round(annualSeq * 4) },
    { year: 'Year 5', tCO2e: Math.round(annualSeq * 5) },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif text-forest-deep mb-1">What-If Scenario Simulator</h2>
          <p className="text-text-muted">Explore how assumptions influence potential project outcomes over time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-8">
          <div className="flex items-center mb-6">
            <Settings2 className="w-6 h-6 mr-3 text-forest" />
            <h3 className="text-xl font-serif text-forest-deep">Assumptions</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-text-main">Number of Candidate Farms</label>
                <span className="text-sm font-bold text-forest-deep">{farms}</span>
              </div>
              <input type="range" min="10" max="1000" value={farms} onChange={(e) => setFarms(Number(e.target.value))} className="w-full accent-forest" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-text-main">Average Acreage per Farm</label>
                <span className="text-sm font-bold text-forest-deep">{avgAcres} ac</span>
              </div>
              <input type="range" min="1" max="50" step="0.5" value={avgAcres} onChange={(e) => setAvgAcres(Number(e.target.value))} className="w-full accent-forest" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-text-main">Assumed Participation Rate</label>
                <span className="text-sm font-bold text-forest-deep">{participation}%</span>
              </div>
              <input type="range" min="10" max="100" step="5" value={participation} onChange={(e) => setParticipation(Number(e.target.value))} className="w-full accent-forest" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-text-main">Illustrative Sequestration Rate</label>
                <span className="text-sm font-bold text-forest-deep">{seqRate} tCO2e/ac/yr</span>
              </div>
              <input type="range" min="0.5" max="10" step="0.1" value={seqRate} onChange={(e) => setSeqRate(Number(e.target.value))} className="w-full accent-forest" />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6 flex items-center">
              <div className="bg-sage/20 p-4 rounded-xl text-forest mr-6">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-muted mb-1">Participating Acreage</p>
                <p className="text-3xl font-serif text-forest-deep">{Math.round(participatingAcres).toLocaleString()}</p>
                <p className="text-xs text-text-muted mt-1">out of {Math.round(totalAcres).toLocaleString()} candidate acres</p>
              </div>
            </div>
            
            <div className="bg-forest text-ivory rounded-2xl shadow-sm border border-border-subtle p-6 flex items-center">
              <div className="bg-ivory/10 p-4 rounded-xl text-gold mr-6">
                <Calculator className="w-8 h-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-ivory/70 mb-1">Annual Potential (Demo)</p>
                <p className="text-3xl font-serif text-ivory">{Math.round(annualSeq).toLocaleString()} <span className="text-lg font-sans font-normal opacity-80">tCO2e</span></p>
              </div>
            </div>
          </div>

          <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-8">
            <div className="flex items-center mb-8">
              <BarChart3 className="w-6 h-6 mr-3 text-forest" />
              <h3 className="text-xl font-serif text-forest-deep">5-Year Cumulative Projection</h3>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorSeq" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-forest)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--color-forest)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-subtle)" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: 'var(--color-text-muted)'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--color-text-muted)'}} tickFormatter={(value) => value.toLocaleString()} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    formatter={(value: any) => [value.toLocaleString(), 'Cumulative tCO2e']}
                  />
                  <Area type="monotone" dataKey="tCO2e" stroke="var(--color-forest)" strokeWidth={3} fillOpacity={1} fill="url(#colorSeq)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="p-4 bg-surface-muted border border-border-subtle rounded-xl text-sm flex items-start text-text-muted">
            <Info className="w-5 h-5 text-forest mr-3 shrink-0 mt-0.5" />
            <p><strong>Illustrative Tool:</strong> Results are based on provided assumptions for demonstration only. This tool does not forecast guaranteed carbon credit issuance or farmer income.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

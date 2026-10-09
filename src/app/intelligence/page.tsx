'use client';
import React, { useState } from 'react';
import { Globe, Leaf, Calculator, History, AlertCircle, Info, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';
import LeafletMap from '@/components/ui/Map';

export default function CarbonIntelligencePage() {
  const [calcAcres, setCalcAcres] = useState('10');
  const [calcFactor, setCalcFactor] = useState('3.5');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif text-forest-deep mb-1">Carbon Intelligence</h2>
          <p className="text-text-muted">Explore geospatial observations and illustrative carbon scenarios.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Satellite Explorer / Change Detection */}
        <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle overflow-hidden flex flex-col">
          <div className="p-5 border-b border-border-subtle flex justify-between items-center bg-surface-muted/30">
            <h3 className="font-serif text-forest-deep flex items-center">
              <Globe className="w-5 h-5 mr-2 text-forest" />
              Satellite Explorer (Demo)
            </h3>
            <span className="px-2 py-1 bg-forest/10 text-forest text-xs font-medium rounded">NDVI Index</span>
          </div>
          <div className="h-[400px] relative z-0">
            <LeafletMap />
          </div>
          <div className="p-4 border-t border-border-subtle bg-surface">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-text-muted" />
                <span className="text-text-muted">Observation Date: <span className="font-medium text-text-main">Oct 12, 2025</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">Low Veg</span>
                <div className="w-24 h-2 bg-gradient-to-r from-yellow-300 via-green-500 to-green-900 rounded-full"></div>
                <span className="text-xs text-text-muted">High Veg</span>
              </div>
            </div>
            <p className="text-xs text-text-muted mt-3 italic">
              * Note: The map displays a demonstrative coordinate location. Live satellite layers and change-detection sliders are disabled in this prototype.
            </p>
          </div>
        </div>

        {/* Calculator */}
        <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6 flex flex-col">
          <div className="flex items-center mb-6">
            <Calculator className="w-6 h-6 mr-3 text-forest" />
            <div>
              <h3 className="text-xl font-serif text-forest-deep">Transparent Calculator</h3>
              <p className="text-sm text-text-muted">Illustrative scenario simulator</p>
            </div>
          </div>

          <div className="bg-surface-muted/50 p-6 rounded-xl border border-border-subtle mb-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Total Area (Acres)</label>
                <input 
                  type="number" 
                  className="w-full px-3 py-2 bg-surface border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-forest"
                  value={calcAcres}
                  onChange={(e) => setCalcAcres(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-main mb-2">Seq. Factor (tCO2e/ac/yr)</label>
                <input 
                  type="number" 
                  step="0.1"
                  className="w-full px-3 py-2 bg-surface border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-forest"
                  value={calcFactor}
                  onChange={(e) => setCalcFactor(e.target.value)}
                />
              </div>
            </div>
            
            <div className="bg-surface border border-border-subtle rounded-lg p-4">
              <p className="text-sm text-text-muted mb-1">Estimated Annual Sequestration</p>
              <p className="text-4xl font-serif text-forest-deep">
                {Math.round(Number(calcAcres || 0) * Number(calcFactor || 0)).toLocaleString()} <span className="text-lg font-sans text-text-muted font-normal">tCO2e / year</span>
              </p>
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <div className="p-4 bg-gold/10 border border-gold/20 rounded-xl text-sm flex items-start text-forest-deep">
              <Info className="w-5 h-5 text-gold mr-3 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Methodology Disclaimer</p>
                <p className="text-text-muted">This calculator uses a simplified deterministic multiplier for illustration. It does not represent a verified VM0042 methodology or guarantee credit issuance.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Readiness Engine */}
        <div className="lg:col-span-2 bg-forest-deep text-ivory rounded-2xl shadow-lg p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-forest rounded-full filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-6">
              <SlidersHorizontal className="w-6 h-6 mr-3 text-sage" />
              <div>
                <h3 className="text-2xl font-serif">AI Readiness Engine</h3>
                <p className="text-ivory/70 text-sm">Rule-based preliminary project screening</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-forest p-6 rounded-xl border border-ivory/10">
                <h4 className="font-bold text-gold mb-2 flex items-center"><AlertCircle className="w-4 h-4 mr-2" /> Missing Baselines</h4>
                <p className="text-sm text-ivory/70">52% of registered farms lack historical crop data required to establish additionality.</p>
                <button className="mt-4 text-xs font-medium text-ivory hover:text-gold transition-colors">View affected farms &rarr;</button>
              </div>
              <div className="bg-forest p-6 rounded-xl border border-ivory/10">
                <h4 className="font-bold text-sage mb-2 flex items-center"><History className="w-4 h-4 mr-2" /> Permanence Risk</h4>
                <p className="text-sm text-ivory/70">Drought-prone regions detected in Maharashtra cluster. Risk buffer adjustment recommended.</p>
                <button className="mt-4 text-xs font-medium text-ivory hover:text-gold transition-colors">Analyze risk factors &rarr;</button>
              </div>
              <div className="bg-forest p-6 rounded-xl border border-ivory/10">
                <h4 className="font-bold text-gold mb-2 flex items-center"><Leaf className="w-4 h-4 mr-2" /> Boundary Overlap</h4>
                <p className="text-sm text-ivory/70">Potential cadastral boundary conflict detected in 3 recently submitted geometries.</p>
                <button className="mt-4 text-xs font-medium text-ivory hover:text-gold transition-colors">Resolve conflicts &rarr;</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

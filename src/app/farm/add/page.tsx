'use client';
import React, { useState } from 'react';
import { Save, ArrowLeft, Loader2, MapPin, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import LeafletMap from '@/components/ui/Map';
import { useRouter } from 'next/navigation';

export default function AddFarmPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    area: '',
    cropType: '',
    location: { lat: 20.5937, lng: 78.9629 },
    geometry: null as unknown
  });

  const handlePolygonDrawn = (geoJSON: unknown, areaSqm: number) => {
    const areaAcres = (areaSqm / 4046.86).toFixed(2);
    setFormData(prev => ({
      ...prev,
      geometry: geoJSON,
      area: areaAcres
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('/api/farms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        alert('Farm registered successfully');
        router.push('/farm');
      } else {
        alert('Failed to register farm');
      }
    } catch {
      alert('Error registering farm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center">
        <Link href="/farm" className="mr-4 text-text-muted hover:text-forest transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h2 className="text-3xl font-serif text-forest-deep mb-1">Register New Farm</h2>
          <p className="text-text-muted">Follow the steps to add a farm to the MRV platform.</p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6 flex justify-between relative">
        <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-border-subtle -z-10 -translate-y-1/2"></div>
        {[
          { num: 1, label: 'Details', icon: FileText },
          { num: 2, label: 'Location', icon: MapPin },
          { num: 3, label: 'Review', icon: CheckCircle2 }
        ].map((s) => (
          <div key={s.num} className="flex flex-col items-center bg-surface px-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors
              ${step === s.num ? 'border-forest bg-forest text-ivory' : 
                step > s.num ? 'border-sage bg-sage text-forest-deep' : 
                'border-border-subtle bg-surface-muted text-text-muted'}`}
            >
              <s.icon className="w-5 h-5" />
            </div>
            <span className={`text-xs font-medium mt-2 ${step >= s.num ? 'text-forest-deep' : 'text-text-muted'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-serif text-forest-deep border-b border-border-subtle pb-2">Farmer & Farm Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Farm Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 bg-surface-muted border border-border-subtle rounded-lg focus:ring-2 focus:ring-forest focus:outline-none transition-shadow"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Green Acres"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Owner Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 bg-surface-muted border border-border-subtle rounded-lg focus:ring-2 focus:ring-forest focus:outline-none transition-shadow"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Total Area (Acres)</label>
                  <input 
                    type="number" 
                    required
                    min="0.1"
                    step="0.1"
                    className="w-full px-4 py-3 bg-surface-muted border border-border-subtle rounded-lg focus:ring-2 focus:ring-forest focus:outline-none transition-shadow"
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                    placeholder="0.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-2">Primary Crop</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 bg-surface-muted border border-border-subtle rounded-lg focus:ring-2 focus:ring-forest focus:outline-none transition-shadow"
                    value={formData.cropType}
                    onChange={(e) => setFormData({...formData, cropType: e.target.value})}
                    placeholder="e.g. Wheat, Rice"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex justify-between items-end border-b border-border-subtle pb-2">
                <h3 className="text-xl font-serif text-forest-deep">Location & Boundary</h3>
                {formData.geometry && (
                  <span className="text-sm bg-forest/10 text-forest px-3 py-1 rounded-full font-medium">
                    Auto-calculated Area: {formData.area} Acres
                  </span>
                )}
              </div>
              <p className="text-sm text-text-muted">Use the polygon tool on the map to draw the farm boundary. The area will be automatically calculated.</p>
              <div className="h-[400px] bg-surface-muted rounded-xl border border-border-subtle relative z-0 overflow-hidden shadow-inner">
                <LeafletMap 
                  drawingEnabled={true} 
                  onPolygonDrawn={handlePolygonDrawn} 
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-xl font-serif text-forest-deep border-b border-border-subtle pb-2">Review Information</h3>
              <div className="bg-surface-muted p-6 rounded-xl border border-border-subtle grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-sm text-text-muted">Farm Name</p>
                  <p className="font-medium text-forest-deep">{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Owner</p>
                  <p className="font-medium text-forest-deep">{formData.ownerName}</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Area</p>
                  <p className="font-medium text-forest-deep">{formData.area} Acres</p>
                </div>
                <div>
                  <p className="text-sm text-text-muted">Crop</p>
                  <p className="font-medium text-forest-deep">{formData.cropType}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-text-muted">Boundary Mapped</p>
                  <p className="font-medium text-forest-deep">{formData.geometry ? 'Yes (GeoJSON attached)' : 'No (Manual Entry)'}</p>
                </div>
              </div>
              <div className="p-4 bg-gold/10 border border-gold/20 rounded-xl text-sm flex items-start text-forest-deep">
                <AlertCircle className="w-5 h-5 text-gold mr-3 shrink-0 mt-0.5" />
                <p>By submitting this farm, you confirm that you have the right to register this land for carbon monitoring. This will generate a preliminary readiness assessment.</p>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6 border-t border-border-subtle">
            <button 
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={step === 1 || loading}
              className="px-6 py-2.5 rounded-lg font-medium text-text-main hover:bg-surface-muted transition-colors disabled:opacity-30 border border-border-subtle"
            >
              Back
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="bg-forest hover:bg-forest-deep text-ivory px-8 py-2.5 rounded-lg font-medium flex items-center transition-all shadow-sm hover:shadow-md disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : step === 3 ? (
                <Save className="w-5 h-5 mr-2" />
              ) : null}
              {step === 3 ? 'Confirm & Register' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

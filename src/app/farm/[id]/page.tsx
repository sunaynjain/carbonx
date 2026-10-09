'use client';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Leaf, CheckCircle2, Loader2, AlertCircle, Users, Activity, FileCheck, Info, Clock } from 'lucide-react';
import Link from 'next/link';
import LeafletMap from '@/components/ui/Map';

export default function FarmDetail({ params }: { params: Promise<{ id: string }> }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [farm, setFarm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    params.then(({ id }) => {
      fetch(`/api/farms/${id}`)
        .then(res => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then(data => {
          setFarm(data.farm);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    });
  }, [params]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-forest" />
      </div>
    );
  }

  if (error || !farm) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] text-text-muted">
        <AlertCircle className="w-12 h-12 mb-4 text-red-400" />
        <h2 className="text-2xl font-serif text-forest-deep mb-2">Farm Not Found</h2>
        <Link href="/farm" className="text-forest hover:underline">Return to Registry</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link href="/farm" className="inline-flex items-center text-sm font-medium text-text-muted hover:text-forest mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Registry
          </Link>
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-serif text-forest-deep">{farm.name}</h2>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
              farm.status === 'Verified' ? 'bg-forest/10 text-forest' :
              farm.status === 'Mapped' ? 'bg-sage/20 text-forest-deep' :
              'bg-gold/10 text-gold'
            }`}>
              {farm.status}
            </span>
          </div>
          <p className="text-text-muted flex items-center mt-2">
            <MapPin className="w-4 h-4 mr-1" /> Demo Coordinates &bull; Registered {farm.createdAt.split('T')[0]}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface text-forest border border-border-subtle px-4 py-2 rounded-lg text-sm font-medium hover:border-sage transition-colors shadow-sm">
            Edit Details
          </button>
          <button className="bg-forest text-ivory px-4 py-2 rounded-lg text-sm font-medium hover:bg-forest-deep transition-colors shadow-sm">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Map and Info */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle overflow-hidden">
            <div className="h-[350px] relative z-0">
              <LeafletMap />
            </div>
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 bg-surface-muted/30">
              <div>
                <span className="flex items-center text-sm text-text-muted mb-1"><Users className="w-4 h-4 mr-1" /> Farmer</span>
                <span className="font-semibold text-forest-deep">{farm.ownerName}</span>
              </div>
              <div>
                <span className="flex items-center text-sm text-text-muted mb-1"><MapPin className="w-4 h-4 mr-1" /> Area</span>
                <span className="font-semibold text-forest-deep">{farm.area} Acres</span>
              </div>
              <div>
                <span className="flex items-center text-sm text-text-muted mb-1"><Leaf className="w-4 h-4 mr-1" /> Crop</span>
                <span className="font-semibold text-forest-deep">{farm.cropType}</span>
              </div>
              <div>
                <span className="flex items-center text-sm text-text-muted mb-1"><Activity className="w-4 h-4 mr-1" /> Readiness</span>
                <span className="font-semibold text-forest-deep">{farm.readinessScore}%</span>
              </div>
            </div>
          </div>

          {/* Evidence Management */}
          <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-serif text-forest-deep">Evidence Inventory</h3>
              <button className="text-sm text-forest font-medium hover:underline">Upload Document</button>
            </div>
            <div className="space-y-3">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {farm.documents.map((doc: any) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border border-border-subtle rounded-xl hover:bg-surface-muted/30 transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-sage/20 rounded-lg flex items-center justify-center mr-4">
                      <FileCheck className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <p className="font-medium text-forest-deep">{doc.file_name}</p>
                      <p className="text-xs text-text-muted mt-0.5">Uploaded {doc.uploaded_at.split('T')[0]} &bull; {doc.type.toUpperCase()}</p>
                    </div>
                  </div>
                  {doc.status === 'verified' ? (
                    <span className="flex items-center text-xs font-medium text-forest bg-forest/10 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center text-xs font-medium text-gold bg-gold/10 px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4 mr-1" /> Pending
                    </span>
                  )}
                </div>
              ))}
              {farm.documents.length === 0 && (
                <p className="text-sm text-text-muted text-center py-4">No evidence uploaded yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Intelligence & Assessment */}
        <div className="space-y-8">
          
          {/* Carbon Intelligence */}
          <div className="bg-forest-deep text-ivory rounded-2xl shadow-lg p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-forest rounded-full filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <Leaf className="w-6 h-6 mr-2 text-sage" />
                <h3 className="text-xl font-serif">Carbon Potential</h3>
              </div>
              <div className="mb-6">
                <p className="text-ivory/70 text-sm mb-1">Estimated Sequestration (Demo)</p>
                <div className="flex items-baseline">
                  <p className="text-4xl font-serif text-gold">{farm.carbonPotential.estimated_tco2e_per_year}</p>
                  <p className="ml-2 text-ivory/70 font-medium">tCO2e/yr</p>
                </div>
              </div>
              
              <div className="space-y-4 border-t border-forest pt-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-ivory/70 flex items-center"><Info className="w-4 h-4 mr-1.5 opacity-50"/> Additionality</span>
                  <span className="font-medium bg-forest px-2 py-0.5 rounded">{farm.carbonPotential.additionality_score}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-ivory/70 flex items-center"><Info className="w-4 h-4 mr-1.5 opacity-50"/> Permanence Risk</span>
                  <span className="font-medium bg-forest px-2 py-0.5 rounded">{farm.carbonPotential.permanence_risk}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-ivory/70 flex items-center"><Info className="w-4 h-4 mr-1.5 opacity-50"/> Readiness</span>
                  <span className="font-medium bg-forest px-2 py-0.5 rounded">{farm.carbonPotential.project_readiness}</span>
                </div>
              </div>
              <p className="text-[10px] mt-6 text-ivory/40 leading-tight">
                * Note: These values are illustrative demo estimates using a generic area-based multiplier. They do not represent certified credits.
              </p>
            </div>
          </div>

          {/* AI Readiness Engine */}
          <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6">
            <h3 className="text-xl font-serif text-forest-deep mb-4">Readiness Assessment</h3>
            <div className="space-y-4">
              <div className="p-4 border border-border-subtle rounded-xl bg-surface-muted/30">
                <div className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-forest mr-3 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-text-main">Farmer Identity Verified</p>
                    <p className="text-xs text-text-muted mt-1">Basic KYC information is complete.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-red-100 rounded-xl bg-red-50/50">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Missing Land Title</p>
                    <p className="text-xs text-red-700 mt-1">A valid land ownership or lease agreement is required for carbon rights.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-gold/30 rounded-xl bg-gold/5">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-gold mr-3 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gold-900 line-clamp-1 text-yellow-800">Geometry Unverified</p>
                    <p className="text-xs text-yellow-700 mt-1">Farm boundary has been sketched but not verified against cadastral records.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

'use client';
import React, { useState, useMemo } from 'react';
import { Handshake, Target, AlertCircle, CheckCircle2, ChevronRight, Globe, Leaf, Maximize, Briefcase, Zap } from 'lucide-react';

// Mock FPO Cohorts (Outputs from the Aggregation Engine)
const COHORTS = [
  { 
    id: 'c-101', 
    name: 'Punjab Wheat - Soil Carbon Cohort', 
    farms: 12, 
    area: 68.5, 
    intervention: 'Soil Carbon', 
    region: 'Punjab',
    status: 'Ready'
  },
  { 
    id: 'c-102', 
    name: 'Gujarat Cotton - Agroforestry', 
    farms: 5, 
    area: 26.2, 
    intervention: 'Agroforestry', 
    region: 'Gujarat',
    status: 'Action Required (Missing Docs)'
  },
  { 
    id: 'c-103', 
    name: 'Haryana Rice - Methane Pilot', 
    farms: 3, 
    area: 12.4, 
    intervention: 'Methane Reduction', 
    region: 'Haryana',
    status: 'Ready'
  }
];

// Mock External Developer Marketplace Opportunities
const OPPORTUNITIES = [
  {
    id: 'opp-1',
    developer: 'TerraCarbon Partners',
    title: 'North India Soil Carbon Initiative',
    intervention: 'Soil Carbon',
    targetRegion: 'Punjab, Haryana',
    minArea: 50,
    pricePerTon: '$22.50',
    description: 'Looking for contiguous or aggregated wheat farms to implement deep soil carbon sequestration practices.'
  },
  {
    id: 'opp-2',
    developer: 'Green Canopy Capital',
    title: 'Western India Agroforestry Network',
    intervention: 'Agroforestry',
    targetRegion: 'Gujarat, Maharashtra',
    minArea: 20,
    pricePerTon: '$18.00',
    description: 'Supporting smallholder farmers in transitioning to agroforestry models with fruit-bearing tree integration.'
  },
  {
    id: 'opp-3',
    developer: 'EcoMethane Solutions',
    title: 'National Rice Methane Reduction',
    intervention: 'Methane Reduction',
    targetRegion: 'Pan-India',
    minArea: 100,
    pricePerTon: '$25.00',
    description: 'Large-scale methane reduction project for rice paddies utilizing AWD (Alternate Wetting and Drying).'
  }
];

export default function MatchingWorkspace() {
  const [selectedCohortId, setSelectedCohortId] = useState<string>(COHORTS[0].id);
  const [matchStatuses, setMatchStatuses] = useState<Record<string, string>>({});

  const selectedCohort = COHORTS.find(c => c.id === selectedCohortId) || COHORTS[0];

  // Configurable Rules Engine (Mock)
  const calculateMatch = (cohort: typeof COHORTS[0], opp: typeof OPPORTUNITIES[0]) => {
    let score = 0;
    const explanations: { text: string; positive: boolean }[] = [];
    const missing: string[] = [];

    // Intervention Match (Weight: 50%)
    if (cohort.intervention === opp.intervention) {
      score += 50;
      explanations.push({ text: `Intervention matches (${opp.intervention})`, positive: true });
    } else {
      explanations.push({ text: `Intervention mismatch (${cohort.intervention} vs ${opp.intervention})`, positive: false });
    }

    // Geography Match (Weight: 30%)
    if (opp.targetRegion.includes(cohort.region) || opp.targetRegion === 'Pan-India') {
      score += 30;
      explanations.push({ text: `Region qualifies (${cohort.region} is in ${opp.targetRegion})`, positive: true });
    } else {
      explanations.push({ text: `Region mismatch (${cohort.region} not in ${opp.targetRegion})`, positive: false });
    }

    // Area Match (Weight: 20%)
    if (cohort.area >= opp.minArea) {
      score += 20;
      explanations.push({ text: `Meets minimum area (${cohort.area}ha >= ${opp.minArea}ha)`, positive: true });
    } else {
      const deficit = (opp.minArea - cohort.area).toFixed(1);
      score += (cohort.area / opp.minArea) * 20; // Partial score
      explanations.push({ text: `Area below requirement (Short by ${deficit}ha)`, positive: false });
      missing.push(`Need ${deficit} more hectares to meet minimum of ${opp.minArea}ha.`);
    }

    if (cohort.status !== 'Ready') {
      missing.push('Cohort has missing documentation (Action Required before submission).');
    }

    return { score: Math.round(score), explanations, missing };
  };

  const handleInitiateMatch = (oppId: string) => {
    setMatchStatuses(prev => ({ ...prev, [oppId]: 'Requested' }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-serif text-[#153D2E] tracking-tight">Project Matching</h1>
            <span className="px-3 py-1 bg-[#F2F5F0] border border-[#A8B99A] text-[#153D2E] text-xs font-semibold rounded-full flex items-center">
              <Zap className="w-3 h-3 mr-1 text-gold" />
              Demo Marketplace
            </span>
          </div>
          <p className="text-gray-600 mt-2">Connect your aggregated farm cohorts with carbon-developer opportunities.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Column - Cohort Selection */}
        <div className="xl:col-span-1 space-y-4">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Select Your Cohort</h2>
          {COHORTS.map(cohort => (
            <div 
              key={cohort.id}
              onClick={() => setSelectedCohortId(cohort.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedCohortId === cohort.id 
                  ? 'border-[#153D2E] bg-[#F2F5F0] shadow-sm' 
                  : 'border-gray-200 bg-white hover:border-[#A8B99A]/50'
              }`}
            >
              <h3 className="font-medium text-[#153D2E] leading-tight">{cohort.name}</h3>
              <div className="mt-3 space-y-1.5 text-xs text-gray-600">
                <p className="flex items-center"><Leaf className="w-3.5 h-3.5 mr-1.5 opacity-70" /> {cohort.intervention}</p>
                <p className="flex items-center"><Globe className="w-3.5 h-3.5 mr-1.5 opacity-70" /> {cohort.region}</p>
                <p className="flex items-center"><Maximize className="w-3.5 h-3.5 mr-1.5 opacity-70" /> {cohort.area} ha ({cohort.farms} farms)</p>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200/60">
                {cohort.status === 'Ready' ? (
                  <span className="text-green-700 text-xs font-medium flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Ready for matching
                  </span>
                ) : (
                  <span className="text-amber-700 text-xs font-medium flex items-center">
                    <AlertCircle className="w-3.5 h-3.5 mr-1" /> Action Required
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Opportunities & Scores */}
        <div className="xl:col-span-3 space-y-4">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Marketplace Opportunities</h2>
          
          <div className="grid grid-cols-1 gap-5">
            {OPPORTUNITIES.map(opp => {
              const { score, explanations, missing } = calculateMatch(selectedCohort, opp);
              const matchStatus = matchStatuses[opp.id];
              
              let scoreColor = 'text-green-600';
              if (score < 50) scoreColor = 'text-red-500';
              else if (score < 80) scoreColor = 'text-amber-500';

              return (
                <div key={opp.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
                  {/* Opp Details */}
                  <div className="p-6 flex-1 border-b md:border-b-0 md:border-r border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xs font-medium text-[#A8B99A] uppercase tracking-wider mb-1 flex items-center">
                        <Briefcase className="w-3.5 h-3.5 mr-1" /> {opp.developer}
                      </div>
                      <span className="bg-[#153D2E] text-white text-xs font-medium px-2 py-1 rounded">
                        {opp.pricePerTon} / tCO₂e
                      </span>
                    </div>
                    <h3 className="text-xl font-serif text-[#153D2E] mb-3">{opp.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{opp.description}</p>
                    
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded flex items-center">
                        <Leaf className="w-3.5 h-3.5 mr-1" /> {opp.intervention}
                      </span>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded flex items-center">
                        <Globe className="w-3.5 h-3.5 mr-1" /> {opp.targetRegion}
                      </span>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded flex items-center">
                        <Maximize className="w-3.5 h-3.5 mr-1" /> Min {opp.minArea} ha
                      </span>
                    </div>
                  </div>

                  {/* Match Analysis */}
                  <div className="p-6 md:w-80 bg-gray-50 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-end mb-4">
                        <h4 className="text-sm font-medium text-gray-900">Match Analysis</h4>
                        <div className={`text-2xl font-bold ${scoreColor}`}>
                          {score}%
                        </div>
                      </div>
                      
                      <ul className="space-y-2 mb-4">
                        {explanations.map((exp, idx) => (
                          <li key={idx} className="flex items-start text-xs">
                            {exp.positive ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                            )}
                            <span className={exp.positive ? 'text-gray-700' : 'text-gray-900'}>{exp.text}</span>
                          </li>
                        ))}
                      </ul>

                      {missing.length > 0 && (
                        <div className="mb-4 bg-red-50 border border-red-100 rounded p-3">
                          <h5 className="text-xs font-semibold text-red-800 mb-1">Missing Requirements:</h5>
                          <ul className="list-disc pl-4 text-xs text-red-700 space-y-1">
                            {missing.map((m, idx) => <li key={idx}>{m}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>

                    <button
                      disabled={score < 80 || matchStatus === 'Requested' || missing.length > 0}
                      onClick={() => handleInitiateMatch(opp.id)}
                      className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium flex justify-center items-center transition-colors
                        ${matchStatus === 'Requested' 
                          ? 'bg-[#E3E8DF] text-[#153D2E] cursor-default'
                          : score >= 80 && missing.length === 0
                            ? 'bg-[#153D2E] text-white hover:bg-[#0E291F] shadow-sm' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                      {matchStatus === 'Requested' ? (
                        <>Connection Requested <CheckCircle2 className="w-4 h-4 ml-1.5" /></>
                      ) : (
                        'Request Connection'
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

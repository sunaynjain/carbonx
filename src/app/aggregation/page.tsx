'use client';
import React, { useState, useMemo } from 'react';
import { Network, Filter, Search, Plus, Save, FileWarning, CheckCircle2, ChevronRight, Users } from 'lucide-react';

// Mock data structures representing the database / aggregated data
const MOCK_FARMS = [
  { id: 'f-001', name: 'Green Valley', ownerName: 'Ravi Kumar', area: 15.5, cropType: 'Wheat', state: 'Punjab', intervention: 'Soil Carbon', missingDocs: ['Soil Baseline Report'] },
  { id: 'f-002', name: 'Sunrise Farm', ownerName: 'Sunita Devi', area: 8.2, cropType: 'Cotton', state: 'Gujarat', intervention: 'Agroforestry', missingDocs: [] },
  { id: 'f-003', name: 'River Bend', ownerName: 'Amit Patel', area: 22.0, cropType: 'Wheat', state: 'Punjab', intervention: 'Soil Carbon', missingDocs: ['Land Title'] },
  { id: 'f-004', name: 'Golden Fields', ownerName: 'Suresh Singh', area: 12.4, cropType: 'Rice', state: 'Haryana', intervention: 'Methane Reduction', missingDocs: [] },
  { id: 'f-005', name: 'Hilltop Estate', ownerName: 'Meera Reddy', area: 45.0, cropType: 'Coffee', state: 'Karnataka', intervention: 'Agroforestry', missingDocs: ['NOC from Panchayat'] },
  { id: 'f-006', name: 'Dryland Oasis', ownerName: 'Vikram Joshi', area: 5.5, cropType: 'Millet', state: 'Rajasthan', intervention: 'Soil Carbon', missingDocs: [] },
  { id: 'f-007', name: 'Lush Acres', ownerName: 'Anita Sharma', area: 18.0, cropType: 'Cotton', state: 'Gujarat', intervention: 'Agroforestry', missingDocs: ['Soil Baseline Report', 'Land Title'] },
  { id: 'f-008', name: 'Northern Plains', ownerName: 'Gurpreet Singh', area: 30.5, cropType: 'Wheat', state: 'Punjab', intervention: 'Soil Carbon', missingDocs: [] },
];

export default function AggregationEngine() {
  const [geographyFilter, setGeographyFilter] = useState('All');
  const [cropFilter, setCropFilter] = useState('All');
  const [interventionFilter, setInterventionFilter] = useState('All');
  const [selectedFarmIds, setSelectedFarmIds] = useState<Set<string>>(new Set());
  const [isSaved, setIsSaved] = useState(false);

  const filteredFarms = useMemo(() => {
    return MOCK_FARMS.filter(farm => {
      const matchGeo = geographyFilter === 'All' || farm.state === geographyFilter;
      const matchCrop = cropFilter === 'All' || farm.cropType === cropFilter;
      const matchIntervention = interventionFilter === 'All' || farm.intervention === interventionFilter;
      return matchGeo && matchCrop && matchIntervention;
    });
  }, [geographyFilter, cropFilter, interventionFilter]);

  const selectedFarms = MOCK_FARMS.filter(f => selectedFarmIds.has(f.id));
  const totalArea = selectedFarms.reduce((sum, f) => sum + f.area, 0);
  const carbonPotential = totalArea * 3.5; // Dummy multiplier
  const farmsWithMissingDocs = selectedFarms.filter(f => f.missingDocs.length > 0);

  const handleSelect = (id: string) => {
    const next = new Set(selectedFarmIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedFarmIds(next);
    setIsSaved(false);
  };

  const handleSelectAll = () => {
    if (selectedFarmIds.size === filteredFarms.length && filteredFarms.length > 0) {
      setSelectedFarmIds(new Set());
    } else {
      const next = new Set(selectedFarmIds);
      filteredFarms.forEach(f => next.add(f.id));
      setSelectedFarmIds(next);
    }
  };

  const states = ['All', ...Array.from(new Set(MOCK_FARMS.map(f => f.state)))];
  const crops = ['All', ...Array.from(new Set(MOCK_FARMS.map(f => f.cropType)))];
  const interventions = ['All', ...Array.from(new Set(MOCK_FARMS.map(f => f.intervention)))];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif text-[#153D2E] tracking-tight">Aggregation Engine</h1>
          <p className="text-gray-600 mt-2">Group compatible smallholder farms into project cohorts based on shared characteristics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Filters and List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center space-x-2 mb-4 text-[#153D2E] font-medium">
              <Filter className="w-5 h-5" />
              <h2>Cohort Criteria</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Geography</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-3 py-2 text-sm focus:ring-[#A8B99A] focus:border-[#A8B99A]"
                  value={geographyFilter} onChange={e => setGeographyFilter(e.target.value)}
                >
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Crop Type</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-3 py-2 text-sm focus:ring-[#A8B99A] focus:border-[#A8B99A]"
                  value={cropFilter} onChange={e => setCropFilter(e.target.value)}
                >
                  {crops.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Intervention</label>
                <select 
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-lg px-3 py-2 text-sm focus:ring-[#A8B99A] focus:border-[#A8B99A]"
                  value={interventionFilter} onChange={e => setInterventionFilter(e.target.value)}
                >
                  {interventions.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Farm List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
              <h2 className="font-medium text-[#153D2E] flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Compatible Farms ({filteredFarms.length})
              </h2>
              <button 
                onClick={handleSelectAll}
                className="text-sm text-[#153D2E] font-medium hover:text-[#A8B99A] transition-colors"
              >
                {selectedFarmIds.size === filteredFarms.length && filteredFarms.length > 0 ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            
            <div className="max-h-[500px] overflow-y-auto">
              {filteredFarms.length === 0 ? (
                <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                  <Search className="w-10 h-10 text-gray-300 mb-3" />
                  <p>No farms match the current criteria.</p>
                </div>
              ) : (
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0 z-10">
                    <tr>
                      <th className="px-5 py-3 w-12"></th>
                      <th className="px-5 py-3">Farm Details</th>
                      <th className="px-5 py-3">Location & Crop</th>
                      <th className="px-5 py-3 text-right">Area (ha)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredFarms.map(farm => (
                      <tr 
                        key={farm.id} 
                        className={`hover:bg-gray-50 transition-colors cursor-pointer ${selectedFarmIds.has(farm.id) ? 'bg-[#F2F5F0]' : ''}`}
                        onClick={() => handleSelect(farm.id)}
                      >
                        <td className="px-5 py-4">
                          <input 
                            type="checkbox" 
                            checked={selectedFarmIds.has(farm.id)}
                            onChange={() => {}} // Handled by tr onClick
                            className="w-4 h-4 text-[#153D2E] rounded border-gray-300 focus:ring-[#A8B99A]"
                          />
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-medium text-gray-900">{farm.name}</div>
                          <div className="text-gray-500 text-xs">{farm.ownerName} • {farm.id}</div>
                          {farm.missingDocs.length > 0 && (
                            <div className="flex items-center text-amber-600 text-xs mt-1">
                              <FileWarning className="w-3 h-3 mr-1" />
                              Missing {farm.missingDocs.length} doc{farm.missingDocs.length > 1 ? 's' : ''}
                            </div>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-gray-900">{farm.state}</div>
                          <div className="text-gray-500 text-xs">{farm.cropType} • {farm.intervention}</div>
                        </td>
                        <td className="px-5 py-4 text-right font-medium text-gray-900">
                          {farm.area.toFixed(1)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Cohort Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-[#A8B99A]/40 overflow-hidden sticky top-6">
            <div className="bg-[#153D2E] px-5 py-4 text-white">
              <h2 className="font-serif text-lg flex items-center">
                <Network className="w-5 h-5 mr-2 text-[#A8B99A]" />
                Proposed Cohort
              </h2>
            </div>
            
            <div className="p-5 space-y-6">
              {selectedFarms.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Network className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p className="text-sm">Select farms to build a project cohort</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Farms</p>
                      <p className="text-2xl font-semibold text-[#153D2E]">{selectedFarms.length}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Aggregated Area</p>
                      <p className="text-2xl font-semibold text-[#153D2E]">{totalArea.toFixed(1)} <span className="text-sm font-normal text-gray-500">ha</span></p>
                    </div>
                  </div>

                  <div className="bg-[#F2F5F0] p-4 rounded-lg border border-[#A8B99A]/30">
                    <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">Preliminary Potential</p>
                    <p className="text-3xl font-serif text-[#153D2E] mb-1">
                      {carbonPotential.toFixed(0)} <span className="text-lg font-sans text-gray-600">tCO₂e / yr</span>
                    </p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1 text-[#A8B99A]" /> Based on selected interventions
                    </p>
                  </div>

                  {/* Readiness & Missing Docs */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex justify-between items-center">
                      Cohort Readiness
                      <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">
                        {farmsWithMissingDocs.length > 0 ? 'Action Required' : 'Ready'}
                      </span>
                    </h3>
                    
                    {farmsWithMissingDocs.length > 0 ? (
                      <div className="space-y-3">
                        <p className="text-xs text-gray-600">
                          {farmsWithMissingDocs.length} farm(s) have incomplete documentation.
                        </p>
                        <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
                          {farmsWithMissingDocs.map(farm => (
                            <div key={farm.id} className="bg-white border border-gray-200 rounded p-2 text-xs">
                              <span className="font-medium text-gray-800">{farm.name}</span>
                              <ul className="list-disc pl-4 mt-1 text-amber-700">
                                {farm.missingDocs.map((doc, idx) => (
                                  <li key={idx}>{doc}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-green-50 text-green-800 text-xs p-3 rounded border border-green-100 flex items-start">
                        <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                        <p>All farms in this cohort have complete documentation and are ready for matching.</p>
                      </div>
                    )}
                  </div>

                  <button 
                    className={`w-full py-3 px-4 rounded-lg font-medium flex justify-center items-center transition-all shadow-sm
                      ${isSaved 
                        ? 'bg-[#F2F5F0] text-[#153D2E] border border-[#A8B99A]' 
                        : 'bg-[#153D2E] hover:bg-[#0E291F] text-white'}`}
                    onClick={() => setIsSaved(true)}
                  >
                    {isSaved ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" /> Cohort Saved
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" /> Save Proposed Cohort
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import React, { useState } from 'react';
import { FileBarChart, Download, Search, Filter, CheckCircle2, Clock, FileText } from 'lucide-react';

export default function MRVPage() {
  const [activeTab, setActiveTab] = useState<'reports' | 'evidence' | 'readiness'>('reports');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif text-forest-deep mb-1">MRV & Reporting</h2>
          <p className="text-text-muted">Prepare structured reports and manage evidence for independent review.</p>
        </div>
        <button className="bg-forest text-ivory px-5 py-2.5 rounded-lg font-medium hover:bg-forest-deep transition-colors flex items-center shadow-sm">
          <FileBarChart className="w-5 h-5 mr-2" />
          Generate New Report
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-border-subtle overflow-x-auto">
        <button 
          onClick={() => setActiveTab('reports')}
          className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'reports' ? 'border-forest text-forest' : 'border-transparent text-text-muted hover:text-text-main'
          }`}
        >
          Report Builder
        </button>
        <button 
          onClick={() => setActiveTab('evidence')}
          className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'evidence' ? 'border-forest text-forest' : 'border-transparent text-text-muted hover:text-text-main'
          }`}
        >
          Evidence Vault
        </button>
        <button 
          onClick={() => setActiveTab('readiness')}
          className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'readiness' ? 'border-forest text-forest' : 'border-transparent text-text-muted hover:text-text-main'
          }`}
        >
          Verification Room
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle p-6 lg:p-8">
        
        {activeTab === 'reports' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-serif text-forest-deep mb-1">Recent Reports</h3>
                <p className="text-sm text-text-muted">Structured outputs for 3rd-party auditors.</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Project Baseline Survey', date: 'Oct 12, 2025', status: 'Ready for Review', cluster: 'Vidhya FPO' },
                { title: 'Annual Monitoring Report 2024', date: 'Jan 15, 2025', status: 'Verified', cluster: 'Green Earth Collectives' }
              ].map((report, idx) => (
                <div key={idx} className="border border-border-subtle rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-forest/10 p-3 rounded-xl text-forest">
                      <FileBarChart className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      report.status === 'Verified' ? 'bg-sage/20 text-forest' : 'bg-gold/10 text-gold'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-forest-deep mb-1">{report.title}</h4>
                  <p className="text-sm text-text-muted mb-6">Cluster: {report.cluster} &bull; Generated {report.date}</p>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 bg-surface-muted text-text-main border border-border-subtle px-4 py-2 rounded-lg text-sm font-medium hover:bg-surface transition-colors">
                      View Online
                    </button>
                    <button className="flex-1 bg-forest text-ivory px-4 py-2 rounded-lg text-sm font-medium hover:bg-forest-deep transition-colors flex items-center justify-center">
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search evidence by farm or ID..." 
                  className="w-full pl-10 pr-4 py-2 bg-surface-muted border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-forest text-sm"
                />
              </div>
              <button className="bg-surface-muted text-text-main border border-border-subtle px-4 py-2 rounded-lg text-sm font-medium hover:bg-surface transition-colors flex items-center w-full sm:w-auto">
                <Filter className="w-4 h-4 mr-2" /> Filter
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-surface-muted/50 border-y border-border-subtle text-text-muted">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Document</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Farm/Cluster</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Upload Date</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {[
                    { name: 'Land_Title_124.pdf', farm: 'Green Acres', cat: 'Ownership', date: 'Oct 09, 2026', status: 'Verified' },
                    { name: 'Baseline_Survey.xlsx', farm: 'Vidhya FPO (Cluster)', cat: 'Survey', date: 'Oct 08, 2026', status: 'Pending Review' },
                    { name: 'Photo_Evidence_3.jpg', farm: 'QA Farm', cat: 'Field Observation', date: 'Oct 08, 2026', status: 'Pending Review' },
                  ].map((doc, i) => (
                    <tr key={i} className="hover:bg-surface-muted/30 transition-colors">
                      <td className="px-4 py-4 font-medium text-forest-deep flex items-center">
                        <FileText className="w-4 h-4 text-forest mr-2" /> {doc.name}
                      </td>
                      <td className="px-4 py-4 text-text-muted">{doc.farm}</td>
                      <td className="px-4 py-4 text-text-muted">{doc.cat}</td>
                      <td className="px-4 py-4 text-text-muted">{doc.date}</td>
                      <td className="px-4 py-4">
                        <span className={`flex items-center text-xs font-medium w-fit px-2.5 py-1 rounded-full ${
                          doc.status === 'Verified' ? 'bg-forest/10 text-forest' : 'bg-gold/10 text-gold'
                        }`}>
                          {doc.status === 'Verified' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                          {doc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'readiness' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="bg-forest-deep text-ivory rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-serif mb-2">Vidhya FPO Cluster</h3>
                <p className="text-ivory/70 text-sm max-w-lg mb-6">This checklist organizes project requirements for future external reviewers. Completing it does not constitute official verification.</p>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <div className="bg-forest px-3 py-1.5 rounded-lg flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-sage mr-2" /> 12 Complete
                  </div>
                  <div className="bg-gold/20 px-3 py-1.5 rounded-lg flex items-center text-gold">
                    <Clock className="w-4 h-4 mr-2" /> 4 Pending
                  </div>
                </div>
              </div>
              <div className="w-48 h-48 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-forest" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.75)} className="text-sage transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-serif text-sage">75%</span>
                  <span className="text-xs text-ivory/70">Ready</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-serif text-forest-deep text-xl border-b border-border-subtle pb-2">Verification Checklist</h4>
              <div className="space-y-3">
                {[
                  { text: 'Farm boundaries delineated and verified', status: 'complete' },
                  { text: 'Historical crop baselines established', status: 'complete' },
                  { text: 'Land ownership evidence uploaded for all participants', status: 'pending' },
                  { text: 'Additionality demonstration documented', status: 'pending' },
                  { text: 'Project methodology (Demo VM0042) requirements met', status: 'pending' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start p-4 border border-border-subtle rounded-xl bg-surface-muted/30">
                    {item.status === 'complete' ? (
                      <CheckCircle2 className="w-5 h-5 text-forest mr-3 shrink-0 mt-0.5" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-text-muted mr-3 shrink-0 mt-0.5"></div>
                    )}
                    <span className={item.status === 'complete' ? 'text-text-main line-through opacity-70' : 'text-text-main font-medium'}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

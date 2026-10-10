'use client';

import React, { useRef, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, FileText, Map as MapIcon, Users, Sprout, CheckCircle, Clock } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const mockProjectDetails = {
  id: 'prj-101',
  name: 'Maha Agro-Forestry Initiative',
  type: 'Agroforestry',
  description: 'A comprehensive agroforestry project aiming to sequester carbon through widespread tree planting alongside traditional crops in Maharashtra.',
  landArea: 1540,
  farmsCount: 120,
  fpos: ['FPO-001 (Kisan Union)', 'FPO-004 (Green Horizon)'],
  timeline: 'Q1 2024 - Q4 2029',
  estCredits: 45000,
  monitoringObservations: [
    { date: '2026-09-15', note: 'Satellite imagery shows 85% sapling survival rate across 30 sampled farms.', status: 'Positive' },
    { date: '2026-08-22', note: 'Soil organic carbon baselines established for cluster A.', status: 'Completed' }
  ],
  evidenceIndex: [
    { name: 'Baseline Survey Report', type: 'PDF', status: 'Verified' },
    { name: 'Sapling Purchase Receipts', type: 'Image/ZIP', status: 'Pending Review' },
    { name: 'Polygon GeoJSON Data', type: 'JSON', status: 'Verified' }
  ]
};

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const dossierRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    if (!dossierRef.current) return;
    
    try {
      setIsGenerating(true);
      const canvas = await html2canvas(dossierRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${mockProjectDetails.name.replace(/\s+/g, '_')}_Dossier.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-text-muted mb-4 hover:text-forest transition-colors w-fit">
        <ArrowLeft className="w-4 h-4 mr-1" />
        <Link href="/projects">Back to Projects</Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-serif text-forest-deep mb-2">{mockProjectDetails.name}</h1>
          <p className="text-text-muted inline-flex items-center">
            <span className="bg-forest/10 text-forest px-2.5 py-0.5 rounded-full text-xs font-medium mr-3">
              {mockProjectDetails.type}
            </span>
            Project ID: {unwrappedParams.id}
          </p>
        </div>
        <button 
          onClick={handleGeneratePDF}
          disabled={isGenerating}
          className="px-5 py-2.5 bg-forest hover:bg-forest-deep text-ivory rounded-lg transition-colors shadow-sm font-medium flex items-center disabled:opacity-70"
        >
          {isGenerating ? (
            <span className="flex items-center">
              <Clock className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </span>
          ) : (
            <span className="flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Generate PDF Dossier
            </span>
          )}
        </button>
      </div>

      {/* This div is the container that will be captured for the PDF */}
      <div 
        ref={dossierRef} 
        className="bg-white rounded-xl border border-border-subtle shadow-sm p-8 max-w-4xl"
      >
        <div className="border-b border-border-subtle pb-6 mb-6">
          <h2 className="text-2xl font-serif text-forest-deep mb-3">Project Dossier</h2>
          <p className="text-text-main leading-relaxed">{mockProjectDetails.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-text-main flex items-center mb-4">
              <MapIcon className="w-5 h-5 mr-2 text-earth" />
              Scale & Scope
            </h3>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-surface-muted pb-2">
                <span className="text-text-muted">Total Land Area</span>
                <span className="font-medium">{mockProjectDetails.landArea} ha</span>
              </li>
              <li className="flex justify-between border-b border-surface-muted pb-2">
                <span className="text-text-muted">Participating Farms</span>
                <span className="font-medium">{mockProjectDetails.farmsCount}</span>
              </li>
              <li className="flex justify-between border-b border-surface-muted pb-2">
                <span className="text-text-muted">Est. Carbon Credits</span>
                <span className="font-medium">{mockProjectDetails.estCredits.toLocaleString()} tCO2e</span>
              </li>
              <li className="flex justify-between border-b border-surface-muted pb-2">
                <span className="text-text-muted">Timeline</span>
                <span className="font-medium">{mockProjectDetails.timeline}</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-main flex items-center mb-4">
              <Users className="w-5 h-5 mr-2 text-gold-deep" />
              Associated Partners
            </h3>
            <div className="bg-surface-muted rounded-lg p-4">
              <ul className="space-y-2">
                {mockProjectDetails.fpos.map((fpo, idx) => (
                  <li key={idx} className="flex items-center text-sm font-medium">
                    <CheckCircle className="w-4 h-4 mr-2 text-forest" />
                    {fpo}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-text-main flex items-center mb-4">
            <Sprout className="w-5 h-5 mr-2 text-forest" />
            Monitoring Observations
          </h3>
          <div className="space-y-3">
            {mockProjectDetails.monitoringObservations.map((obs, idx) => (
              <div key={idx} className="bg-surface-muted/50 p-4 rounded-lg border border-border-subtle flex gap-4">
                <div className="text-sm font-medium text-text-muted min-w-[90px]">{obs.date}</div>
                <div>
                  <p className="text-sm text-text-main">{obs.note}</p>
                  <span className="inline-block mt-1 text-xs font-medium text-forest bg-forest/10 px-2 py-0.5 rounded">
                    {obs.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-text-main flex items-center mb-4">
            <FileText className="w-5 h-5 mr-2 text-text-muted" />
            Evidence Index
          </h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-muted text-xs uppercase text-text-muted">
                <th className="px-4 py-2 rounded-tl-lg">Document Name</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2 rounded-tr-lg">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {mockProjectDetails.evidenceIndex.map((ev, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3 text-sm font-medium">{ev.name}</td>
                  <td className="px-4 py-3 text-sm text-text-muted">{ev.type}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                      ${ev.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {ev.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

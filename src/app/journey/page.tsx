'use client';
import React, { useState } from 'react';
import { Map, Camera, ClipboardCheck, ArrowRight, ShieldCheck, Award, FileText } from 'lucide-react';

export default function JourneyPage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. Registration",
      icon: FileText,
      desc: "Farmers and FPOs enter baseline agricultural information and join the platform.",
      reqs: ["Farmer KYC", "FPO Agreement", "Crop History"]
    },
    {
      title: "2. Boundary Collection",
      icon: Map,
      desc: "Farm boundaries are drawn and verified against cadastral records.",
      reqs: ["GeoJSON Boundary", "Land Ownership Proof"]
    },
    {
      title: "3. Evidence Gathering",
      icon: Camera,
      desc: "Photographic and documentary evidence of farming practices are collected.",
      reqs: ["Practice Photos", "Input Receipts"]
    },
    {
      title: "4. Preliminary Assessment",
      icon: ClipboardCheck,
      desc: "CARBONX evaluates the collected data for project eligibility.",
      reqs: ["Readiness Score > 75%", "No Boundary Overlap"]
    },
    {
      title: "5. Monitoring & Reporting",
      icon: ArrowRight,
      desc: "Ongoing geospatial monitoring tracks vegetation changes.",
      reqs: ["Satellite Observation", "Periodic Field Surveys"]
    },
    {
      title: "6. Independent Validation",
      icon: ShieldCheck,
      desc: "Accredited 3rd-party auditors review the generated MRV reports.",
      reqs: ["Auditor Verification Statement"]
    },
    {
      title: "7. Credit Issuance",
      icon: Award,
      desc: "Verified outcomes may lead to credit issuance by a recognized standard.",
      reqs: ["Registry Approval"]
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center py-10">
        <h2 className="text-4xl font-serif text-forest-deep mb-4">Farm-to-Carbon Journey</h2>
        <p className="text-text-muted max-w-2xl mx-auto text-lg">
          Explore the rigorous process from initial farm registration to potential carbon credit verification.
        </p>
      </div>

      <div className="bg-surface rounded-2xl shadow-xl border border-border-subtle p-8 lg:p-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Progress Path */}
          <div className="w-full md:w-1/2 relative">
            <div className="absolute left-8 top-8 bottom-8 w-1 bg-surface-muted border-l-2 border-dashed border-border-subtle z-0"></div>
            
            <div className="space-y-8 relative z-10">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  className={`flex items-center cursor-pointer group transition-all duration-300 ${activeStep === idx ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-100'}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 border-4 shadow-sm transition-colors
                    ${activeStep === idx ? 'bg-forest border-forest text-ivory' : 'bg-surface border-border-subtle text-text-muted group-hover:border-forest group-hover:text-forest'}`}
                  >
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div className="ml-6">
                    <h3 className={`font-serif text-xl ${activeStep === idx ? 'text-forest-deep' : 'text-text-main'}`}>
                      {step.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step Detail Panel */}
          <div className="w-full md:w-1/2">
            <div className="sticky top-10 bg-surface-muted/50 rounded-2xl p-8 border border-border-subtle h-full min-h-[400px] flex flex-col justify-center animate-in fade-in zoom-in-95 duration-300" key={activeStep}>
              <div className="w-16 h-16 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-6">
                {React.createElement(steps[activeStep].icon, { className: "w-8 h-8" })}
              </div>
              <h3 className="text-3xl font-serif text-forest-deep mb-4">{steps[activeStep].title}</h3>
              <p className="text-text-muted text-lg leading-relaxed mb-8">
                {steps[activeStep].desc}
              </p>
              
              <div className="bg-surface rounded-xl p-5 border border-border-subtle">
                <h4 className="font-semibold text-text-main mb-3 text-sm uppercase tracking-wider">Required Information</h4>
                <ul className="space-y-2">
                  {steps[activeStep].reqs.map((req, i) => (
                    <li key={i} className="flex items-center text-sm text-text-muted">
                      <div className="w-1.5 h-1.5 rounded-full bg-sage mr-2 shrink-0"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-center text-text-muted italic max-w-3xl mx-auto opacity-70">
        * Disclaimer: Progression through the CARBONX interface demonstrates technical readiness and data organization. It does not guarantee progression through an official carbon standard, validation, or registry credit issuance.
      </p>
    </div>
  );
}

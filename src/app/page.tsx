import React from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf, ShieldCheck, Map, BarChart4, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="bg-ivory min-h-screen text-text-main font-sans selection:bg-sage selection:text-forest-deep">
      {/* Navigation */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-ivory/90 backdrop-blur-md border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-forest" />
            <span className="font-serif text-2xl font-bold tracking-wide text-forest-deep">CARBONX</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-text-muted">
            <a href="#how-it-works" className="hover:text-forest transition-colors">How it works</a>
            <a href="#features" className="hover:text-forest transition-colors">Features</a>
            <a href="#impact" className="hover:text-forest transition-colors">Impact & Trust</a>
          </div>
          <div>
            <Link 
              href="/dashboard" 
              className="bg-forest text-ivory px-6 py-2.5 rounded-full text-sm font-medium hover:bg-forest-deep transition-all shadow-md hover:shadow-lg flex items-center"
            >
              Open Platform
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center space-x-2 bg-sage/20 text-forest px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-forest animate-pulse"></span>
            <span>MRV Intelligence for India</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-serif text-forest-deep leading-[1.1] tracking-tight">
            Turn farm intelligence into climate opportunity.
          </h1>
          <p className="text-lg lg:text-xl text-text-muted max-w-2xl leading-relaxed">
            CARBONX helps organize farm information, monitor environmental observations, and prepare agricultural projects for credible carbon-market participation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="/dashboard" 
              className="bg-forest text-ivory px-8 py-4 rounded-full font-medium hover:bg-forest-deep transition-all shadow-lg hover:shadow-xl text-center flex items-center justify-center"
            >
              Explore the platform
            </Link>
            <a 
              href="#how-it-works" 
              className="bg-surface text-forest border border-border-subtle px-8 py-4 rounded-full font-medium hover:border-sage transition-all text-center flex items-center justify-center"
            >
              See how it works
            </a>
          </div>
        </div>
        <div className="flex-1 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-forest/20 to-sage/20 rounded-3xl transform rotate-3 scale-105"></div>
          <div className="relative bg-surface rounded-3xl p-2 shadow-2xl border border-border-subtle overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=1200" 
              alt="Lush agricultural landscape in India" 
              width={1200}
              height={500}
              className="rounded-2xl w-full h-[500px] object-cover object-center"
              unoptimized
            />
            <div className="absolute bottom-6 left-6 right-6 bg-surface/95 backdrop-blur shadow-lg rounded-xl p-6 flex items-center justify-between border border-border-subtle">
              <div>
                <p className="text-sm font-medium text-text-muted">Total Monitored Area</p>
                <p className="text-2xl font-serif text-forest-deep mt-1">4,250 Acres</p>
              </div>
              <div className="h-12 w-px bg-border-subtle"></div>
              <div>
                <p className="text-sm font-medium text-text-muted">Readiness Status</p>
                <p className="text-2xl font-serif text-forest-deep mt-1 flex items-center">
                  <ShieldCheck className="w-5 h-5 text-gold mr-2" />
                  Eligible
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-forest-deep text-ivory relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-forest rounded-full filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-serif mb-6">The Journey to Verification</h2>
            <p className="text-ivory/70 max-w-2xl mx-auto text-lg">A structured, data-driven approach to carbon project development, ensuring integrity from soil to credit.</p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { title: "Register", desc: "Organize farms, FPOs, and participants." },
              { title: "Collect", desc: "Map boundaries and gather evidence." },
              { title: "Assess", desc: "Evaluate readiness and identify gaps." },
              { title: "Monitor", desc: "Track environmental observations." },
              { title: "Report", desc: "Prepare structured MRV reports." }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-gold font-serif text-5xl mb-4 opacity-50">0{idx + 1}</div>
                <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                <p className="text-ivory/60 text-sm leading-relaxed">{step.desc}</p>
                {idx < 4 && <ChevronRight className="hidden lg:block absolute top-1/2 -right-6 text-forest w-8 h-8 transform -translate-y-1/2" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section id="features" className="py-32 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-serif text-forest-deep mb-6">Built for Climate Rigor</h2>
          <p className="text-text-muted max-w-2xl mx-auto text-lg">Comprehensive tools for the entire carbon project lifecycle.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-surface p-10 rounded-3xl shadow-sm border border-border-subtle hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-sage/20 rounded-2xl flex items-center justify-center mb-6 text-forest">
              <Map className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif text-forest-deep mb-4">Geospatial Monitoring</h3>
            <p className="text-text-muted leading-relaxed">
              Integrate precise farm boundaries with satellite intelligence. Visualize vegetation changes and monitor environmental observations over time.
            </p>
          </div>
          
          <div className="bg-surface p-10 rounded-3xl shadow-sm border border-border-subtle hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-sage/20 rounded-2xl flex items-center justify-center mb-6 text-forest">
              <BarChart4 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif text-forest-deep mb-4">Preliminary Carbon Estimation</h3>
            <p className="text-text-muted leading-relaxed">
              Use illustrative scenario tools to explore potential project outcomes based on specific agricultural parameters and transparent calculation methods.
            </p>
          </div>
          
          <div className="bg-surface p-10 rounded-3xl shadow-sm border border-border-subtle hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-sage/20 rounded-2xl flex items-center justify-center mb-6 text-forest">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif text-forest-deep mb-4">Readiness Assessment</h3>
            <p className="text-text-muted leading-relaxed">
              Identify missing information, evidence gaps, and methodology requirements early with rule-based screening before external validation.
            </p>
          </div>
          
          <div className="bg-surface p-10 rounded-3xl shadow-sm border border-border-subtle hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-sage/20 rounded-2xl flex items-center justify-center mb-6 text-forest">
              <Leaf className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-serif text-forest-deep mb-4">Evidence Management</h3>
            <p className="text-text-muted leading-relaxed">
              Organize land titles, farmer agreements, and field photographs systematically to prepare for structured MRV reporting and independent review.
            </p>
          </div>
        </div>
      </section>

      {/* Impact & Trust */}
      <section id="impact" className="py-24 bg-surface-muted border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif text-forest-deep mb-10">Committed to Scientific Transparency</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-forest mb-2">Data Quality</h4>
              <p className="text-sm text-text-muted">Rigorous separation of collected evidence and estimated projections.</p>
            </div>
            <div>
              <h4 className="font-bold text-forest mb-2">Independent Verification</h4>
              <p className="text-sm text-text-muted">Built to generate structured outputs for accredited 3rd-party auditors.</p>
            </div>
            <div>
              <h4 className="font-bold text-forest mb-2">Responsible Development</h4>
              <p className="text-sm text-text-muted">Focused on genuine agricultural practicality and farmer equity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA & Footer */}
      <footer className="bg-forest-deep text-ivory pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6 text-center mb-24">
          <h2 className="text-4xl lg:text-6xl font-serif mb-8">Ready to organize your project?</h2>
          <Link 
            href="/dashboard" 
            className="inline-flex items-center justify-center bg-gold text-forest-deep px-10 py-5 rounded-full font-bold hover:bg-white transition-all shadow-xl text-lg"
          >
            Enter Carbon Command Center
            <ArrowRight className="w-6 h-6 ml-3" />
          </Link>
          <p className="mt-8 text-ivory/50 text-sm max-w-lg mx-auto italic">
            * Note: This platform operates using demonstration logic and sample data. Calculations are illustrative estimates and do not represent verified carbon credits or certified methodologies.
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 border-t border-forest pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-ivory/50">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Leaf className="w-5 h-5" />
            <span className="font-serif text-lg font-bold">CARBONX</span>
          </div>
          <div>
            &copy; 2026 CARBONX MRV Platform. Demonstration Prototype.
          </div>
        </div>
      </footer>
    </div>
  );
}

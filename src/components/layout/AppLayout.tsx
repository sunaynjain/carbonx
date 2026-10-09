'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Map, Users, Globe, FileBarChart, Settings, Menu, X } from 'lucide-react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // If on landing page, don't show the dashboard shell
  if (pathname === '/') {
    return <>{children}</>;
  }

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Farms', href: '/farm', icon: Map },
    { name: 'FPOs', href: '/fpo', icon: Users },
    { name: 'Carbon Intelligence', href: '/intelligence', icon: Globe },
    { name: 'MRV & Reports', href: '/mrv', icon: FileBarChart },
    { name: 'Journey', href: '/journey', icon: Map }, // Reusing Map icon or could import another
    { name: 'Simulator', href: '/simulator', icon: Settings },
    { name: 'Regional Map', href: '/region', icon: Map },
  ];

  return (
    <div className="flex h-screen bg-surface-muted">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-forest-deep text-ivory hidden md:flex flex-col shadow-xl z-10">
        <div className="h-20 flex items-center px-6 border-b border-forest/50">
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-serif tracking-wide text-ivory">CARBONX</h1>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors font-medium text-sm
                      ${isActive ? 'bg-forest text-gold shadow-sm' : 'text-ivory/70 hover:bg-forest hover:text-ivory'}`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-gold' : 'text-ivory/50'}`} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-forest/50">
          <div className="flex items-center px-4 py-2 text-sm text-ivory/70">
            <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center mr-3 text-gold font-bold">
              OP
            </div>
            Operator
          </div>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-forest-deep bg-opacity-75 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <aside className="relative flex-1 flex flex-col max-w-xs w-full bg-forest-deep text-ivory shadow-xl">
            <div className="absolute top-0 right-0 -mr-12 pt-4">
              <button onClick={() => setMobileMenuOpen(false)} className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none">
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="h-20 flex items-center px-6 border-b border-forest/50">
              <h1 className="text-2xl font-serif tracking-wide text-ivory">CARBONX</h1>
            </div>
            <nav className="flex-1 overflow-y-auto py-6">
              <ul className="space-y-2 px-4">
                {navItems.map((item) => {
                  const isActive = pathname.startsWith(item.href);
                  return (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center px-4 py-3 rounded-lg transition-colors font-medium text-sm
                          ${isActive ? 'bg-forest text-gold shadow-sm' : 'text-ivory/70 hover:bg-forest hover:text-ivory'}`}
                      >
                        <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-gold' : 'text-ivory/50'}`} />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-surface border-b border-border-subtle flex items-center justify-between px-6 lg:px-10 z-0">
          <div className="flex items-center">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden mr-4 text-text-muted hover:text-forest">
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-semibold text-text-main hidden sm:block">
              {navItems.find(i => pathname.startsWith(i.href))?.name || 'Workspace'}
            </h2>
          </div>
          <div className="flex items-center space-x-4 ml-auto">
            <button className="text-sm font-medium text-forest hover:text-forest-deep px-4 py-2 border border-border-subtle rounded-lg bg-surface">
              Demo Data Active
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-surface-muted p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

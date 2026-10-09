'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Map, Search, Plus, Loader2 } from 'lucide-react';
import { Farm } from '@/lib/db';

export default function FarmPage() {
  const router = useRouter();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/farms')
      .then(res => res.json())
      .then(data => {
        setFarms(data.farms);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredFarms = farms.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-serif text-forest-deep mb-1">Farm Registry</h2>
          <p className="text-text-muted">Manage participating farms and view their assessment status.</p>
        </div>
        <Link 
          href="/farm/add" 
          className="bg-forest hover:bg-forest-deep text-ivory px-5 py-2.5 rounded-lg font-medium flex items-center transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Farm
        </Link>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-border-subtle overflow-hidden">
        <div className="p-5 border-b border-border-subtle flex items-center bg-surface-muted/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by farm name or owner..." 
              className="w-full pl-10 pr-4 py-2 bg-surface border border-border-subtle rounded-lg focus:outline-none focus:ring-2 focus:ring-forest text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="p-16 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-forest" />
          </div>
        ) : filteredFarms.length === 0 ? (
          <div className="p-16 text-center text-text-muted flex flex-col items-center">
            <div className="w-16 h-16 bg-surface-muted rounded-full flex items-center justify-center mb-4 border border-border-subtle">
              <Map className="w-8 h-8 text-sage" />
            </div>
            <p className="font-medium text-text-main mb-1">No farms found</p>
            <p className="text-sm">Click &quot;Add Farm&quot; to register a new one or adjust your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-surface-muted/50 border-b border-border-subtle text-text-muted">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Farm Name</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Area (Acres)</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Crop</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredFarms.map(farm => (
                  <tr 
                    key={farm.id} 
                    className="border-b border-border-subtle hover:bg-surface-muted/50 transition-colors cursor-pointer" 
                    onClick={() => router.push(`/farm/${farm.id}`)}
                  >
                    <td className="px-6 py-4 font-medium text-forest-deep">{farm.name}</td>
                    <td className="px-6 py-4 text-text-muted">{farm.ownerName}</td>
                    <td className="px-6 py-4 text-text-muted">{farm.area}</td>
                    <td className="px-6 py-4 text-text-muted">{farm.cropType}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        farm.status === 'Verified' ? 'bg-forest/10 text-forest' :
                        farm.status === 'Mapped' ? 'bg-sage/20 text-forest-deep' :
                        'bg-gold/10 text-gold'
                      }`}>
                        {farm.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

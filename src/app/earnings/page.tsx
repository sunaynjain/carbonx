import React from 'react';
import { DollarSign, Download, ArrowUpRight, Clock, CheckCircle, FileText, AlertCircle } from 'lucide-react';

const mockFinancials = {
  totalEstimated: 1250000,
  totalConfirmed: 450000,
  pendingPayouts: 120000,
  currency: 'USD'
};

const mockTransactions = [
  {
    id: 'TRX-9821',
    project: 'Maha Agro-Forestry Initiative',
    date: '2026-09-28',
    amount: 120000,
    type: 'Advance Payment',
    status: 'Confirmed',
    recipient: 'Kisan Union FPO'
  },
  {
    id: 'TRX-9820',
    project: 'Coastal Mangrove Restoration',
    date: '2026-09-15',
    amount: 330000,
    type: 'Milestone 1 (Planting)',
    status: 'Confirmed',
    recipient: 'Coastal Agro FPO'
  },
  {
    id: 'TRX-9822',
    project: 'Punjab Soil Carbon Transition',
    date: '2026-10-05',
    amount: 85000,
    type: 'Baseline Verification',
    status: 'Pending',
    recipient: 'Punjab Farmers Co'
  }
];

const mockProjectEarnings = [
  {
    name: 'Maha Agro-Forestry Initiative',
    estimated: 850000,
    confirmed: 120000,
    progress: 14
  },
  {
    name: 'Coastal Mangrove Restoration',
    estimated: 330000,
    confirmed: 330000,
    progress: 100
  },
  {
    name: 'Punjab Soil Carbon Transition',
    estimated: 70000,
    confirmed: 0,
    progress: 0
  }
];

export default function EarningsDashboard() {
  return (
    <div className="space-y-6 relative">
      {/* Demo Data Banner */}
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg flex items-start sm:items-center">
        <AlertCircle className="w-5 h-5 mr-3 mt-0.5 sm:mt-0 flex-shrink-0" />
        <p className="text-sm font-medium">
          DEMO DATA ACTIVE: The financial records, transactions, and sales amounts displayed below are for demonstration purposes only and do not reflect real government or corporate sales.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif text-forest-deep mb-2">Earnings & Payouts</h1>
          <p className="text-text-muted">Track project-level financials, disbursements to FPOs, and view estimated vs confirmed revenues.</p>
        </div>
        <button className="px-5 py-2.5 bg-surface border border-border-subtle hover:bg-surface-muted text-text-main rounded-lg transition-colors shadow-sm font-medium flex items-center">
          <Download className="w-5 h-5 mr-2" />
          Export Statement
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-xl border border-border-subtle shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center text-forest">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-text-muted bg-surface-muted px-2 py-1 rounded">Estimated</span>
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium mb-1">Total Estimated Pipeline</p>
            <p className="text-3xl font-bold text-forest-deep">
              ${mockFinancials.totalEstimated.toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="bg-surface p-6 rounded-xl border border-border-subtle shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-text-muted bg-surface-muted px-2 py-1 rounded">Secured</span>
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium mb-1">Total Confirmed Revenue</p>
            <p className="text-3xl font-bold text-forest-deep">
              ${mockFinancials.totalConfirmed.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-xl border border-border-subtle shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-earth/10 flex items-center justify-center text-earth">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium text-text-muted bg-surface-muted px-2 py-1 rounded">Processing</span>
          </div>
          <div>
            <p className="text-sm text-text-muted font-medium mb-1">Pending Payouts</p>
            <p className="text-3xl font-bold text-forest-deep">
              ${mockFinancials.pendingPayouts.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Breakdown */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-surface border border-border-subtle rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-main mb-6">Project Breakdown</h2>
            <div className="space-y-6">
              {mockProjectEarnings.map((proj, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-end mb-2">
                    <div className="max-w-[70%]">
                      <p className="text-sm font-medium text-text-main truncate" title={proj.name}>{proj.name}</p>
                      <p className="text-xs text-text-muted mt-0.5">Est: ${proj.estimated.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-forest">${proj.confirmed.toLocaleString()}</p>
                      <p className="text-xs text-text-muted mt-0.5">Confirmed</p>
                    </div>
                  </div>
                  <div className="w-full bg-border-subtle rounded-full h-2">
                    <div className="bg-forest h-2 rounded-full transition-all" style={{ width: `${proj.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-2">
          <div className="bg-surface border border-border-subtle rounded-xl shadow-sm overflow-hidden h-full">
            <div className="p-5 border-b border-border-subtle bg-surface-muted/50 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-text-main">Transaction History</h2>
              <button className="text-sm font-medium text-forest hover:text-forest-deep flex items-center">
                View All <ArrowUpRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface border-b border-border-subtle text-xs uppercase text-text-muted">
                    <th className="px-6 py-4 font-semibold">Transaction ID & Date</th>
                    <th className="px-6 py-4 font-semibold">Project & Recipient</th>
                    <th className="px-6 py-4 font-semibold">Amount</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {mockTransactions.map((trx) => (
                    <tr key={trx.id} className="hover:bg-surface-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-text-main text-sm">{trx.id}</div>
                        <div className="text-xs text-text-muted mt-1">{trx.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-text-main font-medium truncate max-w-[200px]" title={trx.project}>{trx.project}</div>
                        <div className="text-xs text-text-muted mt-1">{trx.recipient}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-forest-deep">
                          ${trx.amount.toLocaleString()}
                        </div>
                        <div className="text-xs text-text-muted mt-1">{trx.type}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                          ${trx.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {trx.status === 'Confirmed' ? <CheckCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                          {trx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 text-text-muted hover:text-forest hover:bg-forest/10 rounded transition-colors" title="Download Receipt">
                          <FileText className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

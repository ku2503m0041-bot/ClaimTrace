import React, { useState, useMemo } from 'react';
import { Search, RotateCcw, Filter, FileText, ChevronRight, CheckCircle2, Clock, DollarSign } from 'lucide-react';
import { claimRecords, formatINR, formatINRCompact } from '../data/claimData';
import { ClaimRecord } from '../types';
import { ModalData } from './CaseModal';

interface SectionClaimExplorerProps {
  onOpenModal: (data: ModalData) => void;
}

export const SectionClaimExplorer: React.FC<SectionClaimExplorerProps> = ({ onOpenModal }) => {
  const [searchId, setSearchId] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [minBill, setMinBill] = useState<number>(0);
  const [maxBill, setMaxBill] = useState<number>(1000000);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 12;

  const statuses = ['All', ...Array.from(new Set(claimRecords.map((c) => c.claim_status)))];

  const filteredClaims = useMemo(() => {
    return claimRecords.filter((c) => {
      const matchesSearch = c.claim_id.toLowerCase().includes(searchId.toLowerCase());
      const matchesStatus = statusFilter === 'All' || c.claim_status === statusFilter;
      const matchesAmount = c.bill_amount_inr >= minBill && c.bill_amount_inr <= maxBill;
      return matchesSearch && matchesStatus && matchesAmount;
    });
  }, [searchId, statusFilter, minBill, maxBill]);

  const totalPages = Math.ceil(filteredClaims.length / pageSize) || 1;
  const paginatedClaims = filteredClaims.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const resetFilters = () => {
    setSearchId('');
    setStatusFilter('All');
    setMinBill(0);
    setMaxBill(1000000);
    setCurrentPage(1);
  };

  const handleClaimModal = (claim: ClaimRecord) => {
    const payoutPct = ((claim.insurer_paid_inr / (claim.bill_amount_inr || 1)) * 100).toFixed(1);
    const oopPct = ((claim.policyholder_oop_inr / (claim.bill_amount_inr || 1)) * 100).toFixed(1);

    onOpenModal({
      title: `Claim Case: ${claim.claim_id}`,
      subtitle: `Status: ${claim.claim_status} • Turnaround: ${claim.processing_days} Days`,
      category: 'Detailed Case Audit',
      keyMetric: {
        label: 'Gross Billed Invoice',
        value: formatINR(claim.bill_amount_inr),
      },
      body: `Claim ${claim.claim_id} had a gross hospital invoice of ${formatINR(claim.bill_amount_inr)}. Following assessment, the insurer approved ${formatINR(claim.insurer_paid_inr)} (${payoutPct}%), while ${formatINR(claim.policyholder_oop_inr)} (${oopPct}%) was borne out-of-pocket by the policyholder. Non-covered items accounted for ${formatINR(claim.noncovered_inr)}, room adjustments were ${formatINR(claim.room_limit_adjustment_inr)}, and co-pay totaled ${formatINR(claim.copay_inr)}.`,
      dataPoints: [
        { label: 'Hospital Bill', value: formatINR(claim.bill_amount_inr) },
        { label: 'Insurer Settlement', value: formatINR(claim.insurer_paid_inr) },
        { label: 'Policyholder Out-of-Pocket', value: formatINR(claim.policyholder_oop_inr) },
        { label: 'Non-Covered Consumables', value: formatINR(claim.noncovered_inr) },
        { label: 'Room Limit Adjustment', value: formatINR(claim.room_limit_adjustment_inr) },
        { label: 'Processing Duration', value: `${claim.processing_days} Days` },
      ],
      sourceNote: 'claim_records_synthetic.json',
      dataStatus: claim.data_status,
    });
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
            <Filter className="w-4 h-4 text-amber-700" />
            <span>Chapter 10 • Empirical Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Claim Sandbox Explorer
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Filter, search, and audit individual claims across amount brackets, adjudication statuses, and turnaround durations.
          </p>
        </div>

        <button
          onClick={resetFilters}
          className="self-start md:self-auto px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-mono rounded-lg flex items-center gap-2 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>

      {/* Reactive Filter Strip */}
      <div className="p-5 bg-white border border-stone-200 rounded-xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Search ID */}
          <div className="relative">
            <span className="text-[11px] font-mono text-stone-400 uppercase block mb-1">
              Search by Claim ID
            </span>
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. CLM10001..."
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <span className="text-[11px] font-mono text-stone-400 uppercase block mb-1">
              Claim Settlement Status
            </span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Amount Ceiling Slider */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 uppercase mb-1">
              <span>Max Bill Ceiling</span>
              <span className="text-stone-800 font-bold">{formatINRCompact(maxBill)}</span>
            </div>
            <input
              type="range"
              min={100000}
              max={1000000}
              step={50000}
              value={maxBill}
              onChange={(e) => {
                setMaxBill(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full accent-amber-700 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
          <span>
            Displaying <strong className="text-stone-900 font-mono">{filteredClaims.length}</strong> matching cases
          </span>
          <span className="text-stone-400 font-mono text-[11px]">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>

      {/* Claims Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedClaims.map((c) => {
          const payoutPct = ((c.insurer_paid_inr / (c.bill_amount_inr || 1)) * 100).toFixed(0);
          return (
            <div
              key={c.claim_id}
              onClick={() => handleClaimModal(c)}
              className="paper-card p-5 rounded-xl hover:border-stone-400 cursor-pointer transition-all hover:translate-y-[-2px] flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-stone-900 group-hover:text-amber-900">
                    {c.claim_id}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      c.claim_status === 'Paid'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {c.claim_status}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">Gross Bill</span>
                  <div className="text-lg font-mono font-bold text-stone-900">
                    {formatINR(c.bill_amount_inr)}
                  </div>
                </div>

                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-700">Insurer:</span>
                    <span className="font-mono font-semibold text-emerald-800">
                      {formatINRCompact(c.insurer_paid_inr)} ({payoutPct}%)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-rose-700">Out-of-Pocket:</span>
                    <span className="font-mono font-semibold text-rose-800">
                      {formatINRCompact(c.policyholder_oop_inr)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                <span>{c.processing_days} Days Turnaround</span>
                <span className="text-amber-800 group-hover:underline">Audit →</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs disabled:opacity-40 hover:bg-stone-50"
          >
            Previous
          </button>
          <span className="text-xs font-mono text-stone-600 px-3">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs disabled:opacity-40 hover:bg-stone-50"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

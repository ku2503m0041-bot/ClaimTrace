import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, TrendingDown, Clock, Layers, AlertCircle, FileText } from 'lucide-react';
import { formatINR, formatINRCompact } from '../data/claimData';
import { ModalData } from './CaseModal';

interface SectionSynthesisProps {
  onNavigate: (tab: string) => void;
  onOpenModal: (data: ModalData) => void;
}

export const SectionSynthesis: React.FC<SectionSynthesisProps> = ({ onNavigate, onOpenModal }) => {
  const findings = [
    {
      id: 'F01',
      title: 'The Sum Insured Expectation Gap',
      statement: 'Sum insured represents a policy liability ceiling, not an unconditional entitlement to cash reimbursement.',
      exactNumber: '₹2,43,441',
      numberLabel: 'Patient Out-of-Pocket in ₹6.3L Bill Case',
      dataset: 'claim_records_synthetic.json',
      dataStatus: 'synthetic_for_visualization',
      evidence: 'Even with high coverage, room rent limits (-₹7,500), non-payable items (-₹6,842), and co-payment clauses (-₹1,69,100) substantially shift final billing liabilities to the patient.',
      limitation: 'Reflects retail indemnity policies with active cost-sharing endorsements; zero-deductible policies without room sub-limits experience different payout ratios.',
    },
    {
      id: 'F02',
      title: 'National Out-of-Pocket Reliance',
      statement: 'Out-of-pocket expenditure (OOPE) accounts for the largest single share of health financing in India.',
      exactNumber: '45.11%',
      numberLabel: 'Share of Current Health Expenditure (CHE)',
      dataset: 'National Health Accounts (NHA) 2021-22',
      dataStatus: 'real_public',
      evidence: 'While private health insurance finances 8.48% and government schemes finance 5.87%, families continue to directly fund nearly half of all medical transactions out of private household savings.',
      limitation: 'NHA report aggregates national macroeconomic accounts; state-level variations range widely across public health infrastructures.',
    },
    {
      id: 'F03',
      title: 'The Universality of Consumable Deductions',
      statement: 'Medical consumables and administrative fees represent the most consistent line-item deduction across hospitalized claims.',
      exactNumber: '92%',
      numberLabel: 'Of Cases Incurring Consumable Adjustments',
      dataset: 'claim_deductions_synthetic.json',
      dataStatus: 'synthetic_for_visualization',
      evidence: 'Standard non-payable schedules exclude surgical gloves, sanitizers, gowns, syringes, and patient registration stationery from base insurance tariffs.',
      limitation: 'Modern "consumable rider" add-ons available from certain insurers partially mitigate this deduction when explicitly purchased.',
    },
    {
      id: 'F04',
      title: 'Query Re-submission Friction',
      statement: 'The back-and-forth query phase constitutes the primary operational bottleneck in claim adjudication.',
      exactNumber: '7.4 Days',
      numberLabel: 'Average Observed Query Resolution Duration',
      dataset: 'claim_journey_synthetic.json',
      dataStatus: 'synthetic_for_visualization',
      evidence: 'Medical necessity clarifications and indoor case paper verification create processing tails, with outlier cases extending beyond 15 business days.',
      limitation: 'Turnaround duration varies significantly between fully digitized network hospitals and non-network reimbursement channels.',
    },
    {
      id: 'F05',
      title: 'Unprecedented Operational Scale',
      statement: 'The Indian health insurance adjudication machinery processes tens of millions of citizen settlements annually.',
      exactNumber: '3.26 Crore',
      numberLabel: 'Health Insurance Claims Settled (2024-25)',
      dataset: 'IRDAI Annual Report 2024-25',
      dataStatus: 'real_public',
      evidence: 'Statutory regulatory filings reveal over 32.6 million settled claims, demonstrating why standardization, digital pre-auths, and transparent deduction communication are vital.',
      limitation: 'Combines commercial standalone health insurers, general public-sector underwriters, and specialized government-sponsored portfolios.',
    },
  ];

  const handleModalOpen = (f: typeof findings[0]) => {
    onOpenModal({
      title: `Finding ${f.id}: ${f.title}`,
      subtitle: `${f.numberLabel}: ${f.exactNumber}`,
      category: 'Evidence-Based Synthesis',
      keyMetric: {
        label: f.numberLabel,
        value: f.exactNumber,
      },
      body: `${f.statement} Evidence: ${f.evidence} Methodological Limitation: ${f.limitation}`,
      dataPoints: [
        { label: 'Primary Finding ID', value: f.id },
        { label: 'Key Metric', value: f.exactNumber },
        { label: 'Source Dataset', value: f.dataset },
        { label: 'Analytical Nature', value: f.dataStatus },
      ],
      sourceNote: f.dataset,
      dataStatus: f.dataStatus,
    });
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>Chapter 10 • Evidence-Based Synthesis</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          What the Data Tells Us
        </h2>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Synthesizing our empirical investigation into five evidence-backed findings. Every conclusion is bound directly to statutory public benchmarks or structured telemetry.
        </p>
      </div>

      {/* 5 Evidence Cards Grid */}
      <div className="space-y-6">
        {findings.map((f) => (
          <div
            key={f.id}
            onClick={() => handleModalOpen(f)}
            className="paper-card p-6 sm:p-8 rounded-2xl hover:border-stone-400 cursor-pointer interactive-lift group flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            {/* Left Narrative */}
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  {f.id}
                </span>
                <span className="font-serif font-bold text-xl text-stone-900 group-hover:text-amber-900 transition-colors">
                  {f.title}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                    f.dataStatus === 'real_public'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-stone-100 text-stone-600 border border-stone-200'
                  }`}
                >
                  {f.dataStatus.replace(/_/g, ' ')}
                </span>
              </div>

              <p className="text-sm sm:text-base font-medium text-stone-800 leading-snug">
                {f.statement}
              </p>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {f.evidence}
              </p>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs text-stone-500 font-mono">
                <strong className="text-stone-700">Context & Limitation: </strong>
                {f.limitation}
              </div>
            </div>

            {/* Right Metric Box */}
            <div className="lg:w-64 flex-shrink-0 flex flex-col justify-between items-start lg:items-end border-t lg:border-t-0 pt-4 lg:pt-0 border-stone-100 space-y-2">
              <span className="text-[11px] font-mono uppercase text-stone-400 lg:text-right">
                {f.numberLabel}
              </span>
              <div className="text-3xl sm:text-4xl font-stat font-extrabold text-stone-900 tracking-tight lg:text-right text-amber-950 group-hover:text-amber-800 transition-colors">
                {f.exactNumber}
              </div>
              <div className="text-[11px] font-mono text-stone-400 lg:text-right truncate max-w-full">
                {f.dataset}
              </div>
              <div className="pt-2 text-xs font-semibold text-amber-800 group-hover:underline flex items-center gap-1">
                <span>View Full Evidence</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chapter Continuity to Sources & Methodology */}
      <div className="p-8 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-mono uppercase text-amber-400">Next Step in the Investigation</span>
          <h4 className="text-2xl font-serif font-bold">Trace the Data Governance</h4>
          <p className="text-xs sm:text-sm text-stone-400 max-w-lg">
            Review primary regulatory citations, the data dictionary, and research boundaries in our methodology chapter.
          </p>
        </div>
        <button
          onClick={() => onNavigate('sources')}
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold rounded-lg text-sm flex items-center gap-2 transition-all flex-shrink-0"
        >
          <span>Explore Sources & Methodology</span>
          <ArrowRight className="w-4 h-4 text-stone-950" />
        </button>
      </div>
    </section>
  );
};

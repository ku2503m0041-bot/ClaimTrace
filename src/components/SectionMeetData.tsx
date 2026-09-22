import React from 'react';
import { Database, FileCheck, Layers, AlertTriangle, ArrowRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { claimRecords, claimDeductions, claimJourneys, billComponents, anomalyPatterns, indiaIndicators, policyGlossary, dataSummary } from '../data/claimData';
import { ModalData } from './CaseModal';

interface SectionMeetDataProps {
  onNavigate: (tab: string) => void;
  onOpenModal: (data: ModalData) => void;
}

export const SectionMeetData: React.FC<SectionMeetDataProps> = ({ onNavigate, onOpenModal }) => {
  const datasetInventory = [
    {
      name: 'Claim Records & Financials',
      records: claimRecords.length,
      nature: 'Synthetic Interactive Data',
      badge: 'synthetic_for_visualization',
      description: 'Granular claim files containing bill amount, deductibles, co-pay rate, room rent adjustments, non-covered items, insurer payouts, and processing days.',
      fields: 'claim_id, bill_amount_inr, deductible_inr, copay_rate, room_limit_adjustment_inr, noncovered_inr, insurer_paid_inr, policyholder_oop_inr',
    },
    {
      name: 'Hospital Bill Breakdown',
      records: billComponents.length,
      nature: 'Synthetic Interactive Data',
      badge: 'synthetic_for_visualization',
      description: 'Itemized hospital bills classified across 8 categories: Room, Doctor/Surgeon, Medicines, Diagnostics, Procedure, Nursing, Consumables, and Others.',
      fields: 'claim_id, bill_component, amount_inr, data_status',
    },
    {
      name: 'Claim Deductions Ledger',
      records: claimDeductions.length,
      nature: 'Synthetic Interactive Data',
      badge: 'synthetic_for_visualization',
      description: 'Specific deduction line-items identifying where policy clauses reduced the admissible invoice before settlement.',
      fields: 'claim_id, deduction_type, amount_inr, data_status',
    },
    {
      name: 'Claim Journey & Workflow',
      records: claimJourneys.length,
      nature: 'Synthetic Interactive Data',
      badge: 'synthetic_for_visualization',
      description: 'Chronological milestone tracking: Admission, Pre-authorisation, Document Submission, Assessment, Query Resolution, and Final Authorization.',
      fields: 'claim_id, stage_order, stage, stage_duration_days',
    },
    {
      name: 'Systemic Anomaly Patterns',
      records: anomalyPatterns.length,
      nature: 'Synthetic Interactive Rules',
      badge: 'synthetic_example',
      description: 'Five identifiable workflow and billing pattern indicators: repeated queries, billing spikes, duration bottlenecks, and partial payout cohorts.',
      fields: 'pattern_id, pattern, signal, interpretation',
    },
    {
      name: 'National Health Indicators',
      records: indiaIndicators.length,
      nature: 'Real Public Data (Official)',
      badge: 'real_public',
      description: 'Official benchmarks from the Ministry of Health & Family Welfare (National Health Accounts 2021-22) and the IRDAI Annual Report 2024-25.',
      fields: 'geography, period, indicator, value, unit, source_note, source_organization',
    },
    {
      name: 'Policy Glossary & Terminology',
      records: policyGlossary.length,
      nature: 'Real Regulatory Concepts',
      badge: 'real_concept',
      description: 'Standard insurance contractual definitions established under IRDAI Health Insurance Regulations and master circulars.',
      fields: 'term, plain_language_definition, category, unit',
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
          <Database className="w-4 h-4 text-amber-700" />
          <span>Chapter 02 • Data Transparency & Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Meet the Data
        </h2>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          ClaimTrace operates on a hybrid architecture of verified public regulatory data from IRDAI & NHA alongside a rich synthetic claim dataset generated specifically for interactive storytelling and educational visualization.
        </p>
      </div>

      {/* Aggregate Counts Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm interactive-lift">
          <span className="text-xs font-mono text-stone-400 uppercase">Interactive Claims</span>
          <div className="text-3xl sm:text-4xl font-stat font-extrabold text-stone-900 mt-1">
            {claimRecords.length}
          </div>
          <span className="text-[11px] text-amber-700 font-mono">Detailed Case Files</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm interactive-lift">
          <span className="text-xs font-mono text-stone-400 uppercase">Bill Line Items</span>
          <div className="text-3xl sm:text-4xl font-stat font-extrabold text-stone-900 mt-1">
            {billComponents.length}
          </div>
          <span className="text-[11px] text-stone-500 font-mono">Component Records</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm interactive-lift">
          <span className="text-xs font-mono text-stone-400 uppercase">Deduction Events</span>
          <div className="text-3xl sm:text-4xl font-stat font-extrabold text-stone-900 mt-1">
            {claimDeductions.length}
          </div>
          <span className="text-[11px] text-stone-500 font-mono">Adjustment Records</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm interactive-lift">
          <span className="text-xs font-mono text-stone-400 uppercase">Journey Milestones</span>
          <div className="text-3xl sm:text-4xl font-stat font-extrabold text-stone-900 mt-1">
            {claimJourneys.length}
          </div>
          <span className="text-[11px] text-emerald-700 font-mono">Lifecycle Steps</span>
        </div>
      </div>

      {/* Ethical Data Boundary Callout */}
      <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-stone-800 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-lg">
          <AlertTriangle className="w-5 h-5 text-amber-700" />
          <span>ClaimTrace Ethical Data Policy</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-stone-700">
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Zero Fabricated People or Hospitals:</strong> All claim case studies are strictly synthetic, designed to illustrate real contractual math without exposing private patient health records.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Unambiguous Provenance:</strong> Every statistic is tagged as either <em>real_public</em> (IRDAI/NHA) or <em>synthetic_for_visualization</em> with full citations.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Neutral Interpretations:</strong> Deductions are presented as contractual mechanisms defined in policies rather than editorial accusations of bad faith.
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Datasets Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-serif font-bold text-stone-900">
          Dataset Lineage & Schema Register
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {datasetInventory.map((item, idx) => (
            <div
              key={idx}
              className="paper-card p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-900 text-base">{item.name}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                      item.badge === 'real_public' || item.badge === 'real_concept'
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                        : 'border-amber-300 bg-amber-50 text-amber-800'
                    }`}
                  >
                    {item.nature}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>
                <div className="text-[11px] font-mono text-stone-400">
                  <span className="text-stone-500">Fields:</span> {item.fields}
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-stone-100 flex-shrink-0">
                <span className="text-xs text-stone-400 font-mono uppercase">Record Count</span>
                <span className="text-xl font-mono font-bold text-stone-900">{item.records}</span>
                <button
                  onClick={() =>
                    onOpenModal({
                      title: item.name,
                      category: item.nature,
                      subtitle: `Schema & Record Structure (${item.records} entries)`,
                      body: `${item.description} In accordance with our data governance rules, all schema fields are maintained with strict types and verified relationships.`,
                      dataPoints: [
                        { label: 'Total Records', value: item.records },
                        { label: 'Data Classification', value: item.nature },
                        { label: 'Primary Key / ID', value: 'claim_id' },
                      ],
                      sourceNote: 'ClaimTrace Local Manifest & Data Dictionary',
                      dataStatus: item.badge,
                    })
                  }
                  className="mt-2 text-xs text-amber-800 hover:text-amber-950 font-medium underline"
                >
                  View Schema Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Chapter CTA */}
      <div className="p-8 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-mono uppercase text-amber-400">Ready to investigate?</span>
          <h4 className="text-2xl font-serif font-bold">Follow Every Rupee</h4>
          <p className="text-xs sm:text-sm text-stone-400 max-w-lg">
            Track how a hospital invoice transitions into deductions and final insurance settlement.
          </p>
        </div>
        <button
          onClick={() => onNavigate('follow-money')}
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold rounded-lg text-sm flex items-center gap-2 transition-all flex-shrink-0"
        >
          <span>See How A Claim Moves</span>
          <ArrowRight className="w-4 h-4 text-stone-950" />
        </button>
      </div>
    </section>
  );
};

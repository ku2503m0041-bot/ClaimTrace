import React from 'react';
import { BookOpen, ExternalLink, ShieldCheck, FileCheck, Layers, AlertTriangle, Code2 } from 'lucide-react';
import { sourcesRegister } from '../data/claimData';
import { ModalData } from './CaseModal';

interface SectionSourcesMethodologyProps {
  onOpenModal: (data: ModalData) => void;
}

export const SectionSourcesMethodology: React.FC<SectionSourcesMethodologyProps> = ({ onOpenModal }) => {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
          <BookOpen className="w-4 h-4 text-amber-700" />
          <span>Chapter 11 • Provenance & Governance</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Sources & Methodology
        </h2>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Complete methodological disclosure distinguishing empirical regulatory publications, research frameworks, and synthetic educational models.
        </p>
      </div>

      {/* Tripartite Epistemological Framework */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="paper-card p-6 rounded-2xl border-emerald-200 bg-emerald-50/30 space-y-3">
          <span className="paper-stamp text-emerald-800 border-emerald-300 bg-emerald-50 text-[10px]">
            LAYER 01 • EMPIRICAL DATA
          </span>
          <h3 className="text-lg font-serif font-bold text-stone-900">
            Real Public Benchmark Data
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Sourced strictly from official gazettes and statutory annual reports published by the Insurance Regulatory and Development Authority of India (IRDAI) and the National Health Accounts (Ministry of Health & Family Welfare). Never altered or estimated.
          </p>
        </div>

        <div className="paper-card p-6 rounded-2xl border-amber-200 bg-amber-50/30 space-y-3">
          <span className="paper-stamp text-amber-800 border-amber-300 bg-amber-50 text-[10px]">
            LAYER 02 • RESEARCH CONSTRUCTS
          </span>
          <h3 className="text-lg font-serif font-bold text-stone-900">
            Qualitative Coding & Analysis
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Thematic coding frameworks mapping institutional friction points between hospitals, TPAs, underwriters, and policyholders. Identifies expectation gaps between legalistic policy clauses and consumer assumptions.
          </p>
        </div>

        <div className="paper-card p-6 rounded-2xl border-stone-300 bg-stone-50/50 space-y-3">
          <span className="paper-stamp text-stone-700 border-stone-300 bg-stone-100 text-[10px]">
            LAYER 03 • SYNTHETIC MODELS
          </span>
          <h3 className="text-lg font-serif font-bold text-stone-900">
            Interactive Telemetry & Cases
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Constructed with rigorous mathematical fidelity to demonstrate proportionate deductions, non-covered consumables, and turnaround distributions without exposing private patient health records.
          </p>
        </div>
      </div>

      {/* Official Sources Register Table */}
      <div className="paper-card rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-stone-900">
              Official Primary Sources Register
            </h3>
            <p className="text-xs text-stone-500">
              Statutory documents and regulatory circulars referenced in ClaimTrace
            </p>
          </div>
          <span className="text-xs font-mono text-stone-400">
            {sourcesRegister.length} Registered Primary References
          </span>
        </div>

        <div className="divide-y divide-stone-200">
          {sourcesRegister.map((s) => (
            <div key={s.source_id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {s.source_id}
                  </span>
                  <span className="font-semibold text-stone-900 text-sm sm:text-base">
                    {s.title}
                  </span>
                </div>
                <p className="text-xs text-stone-500">
                  <strong className="text-stone-700">Application: </strong> {s.use} • {s.notes}
                </p>
              </div>

              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-stone-600 hover:text-stone-900 underline flex-shrink-0"
              >
                <span>Institutional Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Limitations & Technical Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="paper-card p-6 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>Research Limitations</span>
          </div>
          <ul className="text-xs text-stone-600 space-y-2 list-disc pl-4 leading-relaxed">
            <li>
              Hospital tariffs vary considerably across cities, hospital tier accreditation (NABH vs non-NABH), and clinical specialties.
            </li>
            <li>
              Synthetic case studies reflect standard retail indemnity policies and do not encompass specialized critical illness lump-sum benefit products.
            </li>
            <li>
              Turnaround times reflect multi-step hospital-to-TPA workflow coordination and are influenced by weekend submission intervals.
            </li>
          </ul>
        </div>

        <div className="paper-card p-6 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Code2 className="w-4 h-4 text-stone-700" />
            <span>System Architecture</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Built using React, Vite, Tailwind CSS, Lucide icons, and Web Audio synthesis. Configured for fast container cold-starts, zero external trackers, and strict adherence to responsive mobile and keyboard accessibility standards.
          </p>
          <div className="pt-2 text-[11px] font-mono text-stone-400">
            ClaimTrace • Health Insurance Intelligence and Transparency Project
          </div>
        </div>
      </div>
    </section>
  );
};

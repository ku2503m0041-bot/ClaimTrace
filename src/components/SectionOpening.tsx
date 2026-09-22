import React from 'react';
import { ArrowRight, FileSearch, TrendingDown, Clock, HelpCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { formatINR, dataSummary } from '../data/claimData';
import { ModalData } from './CaseModal';

interface SectionOpeningProps {
  onNavigate: (tab: string) => void;
  onOpenModal: (data: ModalData) => void;
}

export const SectionOpening: React.FC<SectionOpeningProps> = ({ onNavigate, onOpenModal }) => {
  const handleOpenIntroModal = () => {
    onOpenModal({
      title: 'The Out-of-Pocket Reality in Health Insurance',
      subtitle: 'Why a ₹5,00,000 policy does not guarantee a ₹5,00,000 payout',
      category: 'Investigation Insight',
      keyMetric: {
        label: 'National Out-of-Pocket Share',
        value: '45.11%',
      },
      body: 'According to the official National Health Accounts (NHA 2021-22), 45.11% of current health expenditure in India is still borne directly out-of-pocket by patients and their families. Even among policyholders with private or group coverage, claims are frequently reduced by policy sub-limits, non-payable consumable lists, room-rent caps, and co-payment clauses. ClaimTrace breaks down this architecture step by step.',
      dataPoints: [
        { label: 'Out-of-Pocket Share (NHA 2021-22)', value: '45.11%' },
        { label: 'Private Insurance Share (NHA)', value: '8.48%' },
        { label: 'Claims Settled (IRDAI 2024-25)', value: '3.26 Crore' },
        { label: 'Avg Synthetic Processing Time', value: `${dataSummary.avgProcessingDays} Days` },
      ],
      sourceNote: 'Ministry of Health & Family Welfare (NHA 2021-22) & IRDAI Annual Report 2024-25',
      dataStatus: 'real_public',
    });
  };

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header Banner */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-300/80 text-stone-700 text-xs font-mono uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
          <span>Case File: Investigative Data Story</span>
          <span className="text-stone-400">|</span>
          <span>IRDAI & NHA Grounded</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold text-stone-900 tracking-tight leading-[1.08]">
          A hospital bill is only the{' '}
          <span className="italic font-normal underline decoration-amber-400 decoration-wavy decoration-2">
            beginning
          </span>{' '}
          of the story.
        </h1>

        <p className="text-lg sm:text-xl text-stone-600 font-normal leading-relaxed max-w-2xl mx-auto">
          Every year in India, over <strong className="font-semibold text-stone-900">3.26 crore claims</strong> move through hospitals, Third Party Administrators (TPAs), and insurers. 
          Follow the journey of a single claim to decode what gets paid, what gets deducted, and where the rupees actually go.
        </p>

        {/* Action button row */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            id="btn-start-follow-money"
            onClick={() => onNavigate('follow-money')}
            className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-medium text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-stone-900/10 transition-all hover:translate-y-[-1px]"
          >
            <span>Follow Every Rupee</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>

          <button
            id="btn-inspect-data-method"
            onClick={handleOpenIntroModal}
            className="px-5 py-3.5 bg-white border border-stone-300 hover:border-stone-400 text-stone-700 rounded-lg font-medium text-sm sm:text-base flex items-center gap-2 transition-all hover:bg-stone-50"
          >
            <FileSearch className="w-4 h-4 text-stone-500" />
            <span>Examine Investigation Takeaways</span>
          </button>
        </div>
      </div>

      {/* Featured ₹5,00,000 Investigation Dossier Card */}
      <div className="mt-16 sm:mt-24 max-w-5xl mx-auto">
        <div className="paper-card rounded-2xl p-6 sm:p-10 relative overflow-hidden border-stone-300">
          {/* Top Document Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-dashed border-stone-200 gap-4">
            <div>
              <div className="paper-stamp text-stone-700 border-stone-400 bg-stone-50 text-[11px] mb-2">
                EXHIBIT A • DECONSTRUCTED CLAIM
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                The ₹5,00,000 Policyholder Paradox
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Sum Insured: ₹5,00,000 • Total Hospital Invoice: ₹5,00,000 • Why is payout rarely 100%?
              </p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-mono text-stone-400 uppercase block">Settlement Outcome</span>
              <span className="text-2xl sm:text-3xl font-stat font-extrabold text-emerald-700">₹3,87,026</span>
              <span className="text-xs font-mono text-stone-500 block">Insurer Paid (Admissible)</span>
            </div>
          </div>

          {/* Visual Step Breakdown */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 interactive-lift">
              <span className="text-xs font-mono text-stone-400">01. INVOICE RAISED</span>
              <div className="text-xl font-stat font-bold text-stone-900 mt-1">₹5,00,000</div>
              <p className="text-xs text-stone-600 mt-2">
                Includes room charges, surgeon honorarium, medicines, procedures, and disposable consumables.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 interactive-lift">
              <span className="text-xs font-mono text-amber-700">02. POLICY DEDUCTIONS</span>
              <div className="text-xl font-stat font-bold text-amber-800 mt-1">-₹1,12,974</div>
              <p className="text-xs text-stone-600 mt-2">
                Non-covered consumables (-₹32,941), room-rent proportionate reduction (-₹7,500), and policyholder co-pay.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 interactive-lift">
              <span className="text-xs font-mono text-emerald-700">03. INSURER SETTLEMENT</span>
              <div className="text-xl font-stat font-bold text-emerald-800 mt-1">₹3,87,026</div>
              <p className="text-xs text-stone-600 mt-2">
                Directly remitted to hospital via cashless authorization or reimbursed after document audit.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 interactive-lift">
              <span className="text-xs font-mono text-rose-700">04. OUT-OF-POCKET (OOP)</span>
              <div className="text-xl font-stat font-bold text-rose-800 mt-1">₹1,12,974</div>
              <p className="text-xs text-stone-600 mt-2">
                Paid directly by patient at hospital discharge counter despite holding valid policy coverage.
              </p>
            </div>
          </div>

          {/* Quick takeaway note */}
          <div className="mt-8 p-4 rounded-xl bg-stone-100/70 border border-stone-200 text-xs sm:text-sm text-stone-700 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold text-stone-900">Why does this gap exist?</strong>
              <span className="ml-1">
                Policyholders often believe &apos;Sum Insured&apos; equals an automatic guarantee of full bill reimbursement. 
                In reality, claim settlement is governed by contract clauses such as room-rent proportionate deductions, 
                non-covered expense lists (gloves, PPE, admin fees), and co-payment percentages.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Pillars of Grounded Data */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div
          onClick={() => onNavigate('macro')}
          className="p-6 rounded-xl paper-card hover:border-stone-400 cursor-pointer interactive-lift group"
        >
          <div className="flex items-center justify-between text-xs font-mono text-stone-400">
            <span>REAL PUBLIC DATA</span>
            <span className="text-amber-700 font-semibold group-hover:underline">Explore Macro →</span>
          </div>
          <div className="text-3xl font-stat font-extrabold text-stone-900 mt-3">45.11%</div>
          <h3 className="font-semibold text-stone-800 mt-1 text-base">Out-of-Pocket Health Spending</h3>
          <p className="text-xs text-stone-500 mt-2 leading-relaxed">
            National Health Accounts 2021-22 confirms nearly half of India&apos;s medical expenditure is financed out-of-pocket, 
            underscoring the critical role of insurance transparency.
          </p>
        </div>

        <div
          onClick={() => onNavigate('journey')}
          className="p-6 rounded-xl paper-card hover:border-stone-400 cursor-pointer interactive-lift group"
        >
          <div className="flex items-center justify-between text-xs font-mono text-stone-400">
            <span>CLAIM LIFECYCLE</span>
            <span className="text-amber-700 font-semibold group-hover:underline">View Timeline →</span>
          </div>
          <div className="text-3xl font-stat font-extrabold text-stone-900 mt-3">{dataSummary.avgProcessingDays} Days</div>
          <h3 className="font-semibold text-stone-800 mt-1 text-base">Average Processing Tail</h3>
          <p className="text-xs text-stone-500 mt-2 leading-relaxed">
            From admission and initial pre-auth through query resubmission and final audit, 
            see where delays and document bottlenecks emerge in the pipeline.
          </p>
        </div>

        <div
          onClick={() => onNavigate('deductions')}
          className="p-6 rounded-xl paper-card hover:border-stone-400 cursor-pointer interactive-lift group"
        >
          <div className="flex items-center justify-between text-xs font-mono text-stone-400">
            <span>DEDUCTION EXPLORER</span>
            <span className="text-amber-700 font-semibold group-hover:underline">Inspect Items →</span>
          </div>
          <div className="text-3xl font-stat font-extrabold text-stone-900 mt-3">5 Major Categories</div>
          <h3 className="font-semibold text-stone-800 mt-1 text-base">Anatomy of Reductions</h3>
          <p className="text-xs text-stone-500 mt-2 leading-relaxed">
            Deductibles, co-pays, room limit caps, non-covered consumables, and policy limits analyzed with plain-language contractual explanations.
          </p>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Layers, HelpCircle, Shield, TrendingDown, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { deductionChartData, formatINR, formatINRCompact } from '../data/claimData';
import { ModalData } from './CaseModal';

interface SectionDeductionsProps {
  onOpenModal: (data: ModalData) => void;
}

const deductionExplanations: Record<string, { definition: string; policyRule: string; neutralNote: string }> = {
  'Deductible': {
    definition: 'A pre-specified monetary threshold that the insured must bear out-of-pocket before insurance coverage activates.',
    policyRule: 'Commonly selected by policyholders to lower annual premium rates or embedded in aggregate corporate group plans.',
    neutralNote: 'The dataset shows this fixed amount deducted at the threshold of the claim.',
  },
  'Co-pay': {
    definition: 'A contractual cost-sharing agreement where the policyholder pays a pre-determined percentage of the admissible claim.',
    policyRule: 'Frequently standard in senior citizen policies (e.g. 10% to 30%) or for treatment at non-network facilities.',
    neutralNote: 'Calculated as a fixed ratio of admissible expenses as stipulated by the policy schedule.',
  },
  'Room/rent limit': {
    definition: 'Policy limit specifying the maximum eligible room category (e.g., 1% of sum insured per day or single standard private room).',
    policyRule: 'When a patient chooses a deluxe room exceeding this limit, proportionate deductions apply across surgeon, nursing, and anesthesia charges.',
    neutralNote: 'The dataset shows adjustments reflecting room tariff sub-limits and associated proportionate rate scaling.',
  },
  'Non-covered expense': {
    definition: 'Supplies, consumables, and admin services deemed non-payable under standard insurance regulatory schedules.',
    policyRule: 'Items include surgical gloves, gowns, thermometers, sanitizers, admission kit fees, and medical record processing charges.',
    neutralNote: 'Appears in the records as line-items excluded from hospital invoice reimbursement.',
  },
  'Policy limit': {
    definition: 'Disease-specific or procedure-specific sub-limits defined within the insurance policy.',
    policyRule: 'Typical sub-limits apply to cataract surgeries (e.g., ₹25,000 to ₹50,000 per eye), joint replacements, or robotic surgical packages.',
    neutralNote: 'The dataset shows bills curtailed to pre-agreed procedure caps.',
  },
};

export const SectionDeductions: React.FC<SectionDeductionsProps> = ({ onOpenModal }) => {
  const [selectedType, setSelectedType] = useState<string>(deductionChartData[0]?.type || 'Non-covered expense');

  const totalDeductionsAmount = deductionChartData.reduce((acc, d) => acc + d.amount, 0);

  const selectedData = deductionChartData.find((d) => d.type === selectedType) || deductionChartData[0];
  const explanation = deductionExplanations[selectedData.type] || {
    definition: 'Contractual adjustment applied during claim adjudication.',
    policyRule: 'Policy term governing eligible settlement.',
    neutralNote: 'Appears in dataset records.',
  };

  const handleModal = (type: string) => {
    const item = deductionChartData.find((d) => d.type === type) || selectedData;
    const exp = deductionExplanations[type] || explanation;
    const share = ((item.amount / (totalDeductionsAmount || 1)) * 100).toFixed(1);

    onOpenModal({
      title: `${type} Analysis`,
      subtitle: `Deduction Classification • Total Observed: ${formatINR(item.amount)}`,
      category: 'Deduction Architecture',
      keyMetric: {
        label: 'Cumulative Observed Deductions',
        value: formatINR(item.amount),
      },
      body: `${exp.definition} Regulatory Context: ${exp.policyRule} Neutral Observation: ${exp.neutralNote}`,
      dataPoints: [
        { label: 'Category', value: type },
        { label: 'Total Recorded Volume', value: formatINR(item.amount) },
        { label: 'Incident Count', value: `${item.count} claims` },
        { label: 'Average Per Incident', value: formatINR(item.avgAmount) },
        { label: 'Share of All Deductions', value: `${share}%` },
      ],
      sourceNote: 'claim_deductions_synthetic.json',
      dataStatus: 'synthetic_for_visualization',
    });
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
          <Layers className="w-4 h-4 text-amber-700" />
          <span>Chapter 05 • Deduction Anatomy</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          What Gets Deducted?
        </h2>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          When an admissible claim is settled, deductions typically trace back to specific contract covenants. Explore each deduction category as observed in the records.
        </p>
      </div>

      {/* Aggregate Deduction Distribution Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {deductionChartData.map((item) => {
          const isSelected = item.type === selectedType;
          const share = ((item.amount / (totalDeductionsAmount || 1)) * 100).toFixed(1);
          return (
            <button
              key={item.type}
              onClick={() => setSelectedType(item.type)}
              className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between h-40 ${
                isSelected
                  ? 'bg-stone-900 text-white border-stone-900 shadow-md ring-2 ring-amber-400/50'
                  : 'bg-white hover:bg-stone-50 text-stone-900 border-stone-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono ${isSelected ? 'text-amber-300' : 'text-stone-400'}`}>
                    {share}% Share
                  </span>
                  <span className="text-[10px] font-mono opacity-60">
                    {item.count} items
                  </span>
                </div>
                <h4 className="font-semibold text-sm mt-2 leading-snug">
                  {item.type}
                </h4>
              </div>

              <div>
                <div className={`text-base font-mono font-bold ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                  {formatINRCompact(item.amount)}
                </div>
                <span className={`text-[10px] ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                  Avg: {formatINR(item.avgAmount)}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Category Deep Investigation Panel */}
      <div className="paper-card rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-4 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="paper-stamp text-amber-800 border-amber-300 bg-amber-50 text-[10px]">
                CATEGORY ISOLATED
              </span>
              <span className="text-xs font-mono text-stone-400">
                {selectedData.count} Recorded Incidents
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
              {selectedData.type}
            </h3>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] font-mono text-stone-400 uppercase block">Total Deducted</span>
              <span className="text-2xl font-mono font-bold text-amber-900">
                {formatINR(selectedData.amount)}
              </span>
            </div>
            <button
              onClick={() => handleModal(selectedData.type)}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium transition-colors"
            >
              Open Deduction Modal
            </button>
          </div>
        </div>

        {/* 3 Pillars of the deduction */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <span className="text-xs font-mono uppercase font-bold text-stone-500 block">
              Contractual Definition
            </span>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {explanation.definition}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <span className="text-xs font-mono uppercase font-bold text-amber-800 block">
              Policy Rule / Trigger
            </span>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {explanation.policyRule}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <span className="text-xs font-mono uppercase font-bold text-stone-500 block">
              Dataset Observation
            </span>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {explanation.neutralNote} Average impact per observed case: <strong className="font-mono">{formatINR(selectedData.avgAmount)}</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

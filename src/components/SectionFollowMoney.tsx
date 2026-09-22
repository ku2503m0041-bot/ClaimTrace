import React, { useState } from 'react';
import { DollarSign, ArrowDown, ChevronRight, PieChart as PieIcon, ShieldCheck, AlertCircle, HelpCircle } from 'lucide-react';
import { claimRecords, billComponents, claimDeductions, formatINR, formatINRCompact } from '../data/claimData';
import { ModalData } from './CaseModal';

interface SectionFollowMoneyProps {
  onOpenModal: (data: ModalData) => void;
}

export const SectionFollowMoney: React.FC<SectionFollowMoneyProps> = ({ onOpenModal }) => {
  // Select active claim for detailed case study (default to CLM10002 or CLM10001)
  const [selectedClaimId, setSelectedClaimId] = useState<string>('CLM10002');

  const currentClaim = claimRecords.find((c) => c.claim_id === selectedClaimId) || claimRecords[0];

  // Get matching bill components for this claim
  const currentBillComponents = billComponents.filter((b) => b.claim_id === currentClaim.claim_id);
  // Get matching deductions for this claim
  const currentDeductions = claimDeductions.filter((d) => d.claim_id === currentClaim.claim_id);

  const totalBill = currentClaim.bill_amount_inr;
  const insurerPaid = currentClaim.insurer_paid_inr;
  const policyholderOop = currentClaim.policyholder_oop_inr;
  const totalDeductions = currentClaim.deductible_inr + 
                          currentClaim.copay_inr + 
                          currentClaim.room_limit_adjustment_inr + 
                          currentClaim.noncovered_inr + 
                          currentClaim.policy_limit_adjustment_inr;

  const handleComponentClick = (compName: string, amount: number) => {
    const pct = ((amount / (totalBill || 1)) * 100).toFixed(1);
    onOpenModal({
      title: `${compName} Expense`,
      subtitle: `Billed Line-Item in Claim ${currentClaim.claim_id}`,
      category: 'Hospital Bill Breakdown',
      keyMetric: {
        label: 'Component Total',
        value: formatINR(amount),
      },
      body: `This expense represents ${pct}% of the total hospital bill (${formatINR(totalBill)}). In health insurance assessment, certain components like surgical fees or medicines may be subject to standard rates or policy sub-limits, whereas consumables and admin charges are frequently categorized as non-payable items.`,
      dataPoints: [
        { label: 'Amount', value: formatINR(amount) },
        { label: 'Share of Total Bill', value: `${pct}%` },
        { label: 'Claim ID', value: currentClaim.claim_id },
        { label: 'Data Source', value: 'hospital_bill_components_synthetic.json' },
      ],
      sourceNote: 'Synthetic interactive dataset for educational demonstration',
      dataStatus: 'synthetic_for_visualization',
    });
  };

  const handleDeductionClick = (deductionType: string, amount: number) => {
    onOpenModal({
      title: `${deductionType} Adjustment`,
      subtitle: `Deduction applied to Claim ${currentClaim.claim_id}`,
      category: 'Policy Adjustment',
      keyMetric: {
        label: 'Deducted from Claim',
        value: formatINR(amount),
      },
      body: `A deduction of ${formatINR(amount)} was calculated under the ${deductionType} clause. When a policy contains cost-sharing terms (e.g. deductibles, co-pays) or room rent restrictions, the insurer recalculates the admissible bill and reduces their settlement payout accordingly.`,
      dataPoints: [
        { label: 'Deduction Type', value: deductionType },
        { label: 'Deduction Amount', value: formatINR(amount) },
        { label: 'Settlement Impact', value: 'Shifted to Policyholder OOP' },
      ],
      sourceNote: 'claim_deductions_synthetic.json',
      dataStatus: 'synthetic_for_visualization',
    });
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
            <DollarSign className="w-4 h-4 text-amber-700" />
            <span>Chapter 03 • Financial Flow & Waterfall</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Follow Every Rupee
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Watch how a hospital bill transforms through the evaluation funnel. See every single deduction and where the remaining money settles.
          </p>
        </div>

        {/* Claim Selector Dropdown / Chips */}
        <div className="p-3 bg-white border border-stone-200 rounded-xl shadow-sm flex items-center gap-3">
          <span className="text-xs font-mono text-stone-400 uppercase">Select Case Study:</span>
          <div className="flex flex-wrap gap-1.5">
            {claimRecords.slice(0, 5).map((c) => (
              <button
                key={c.claim_id}
                onClick={() => setSelectedClaimId(c.claim_id)}
                className={`px-3 py-1 rounded text-xs font-mono font-medium transition-all ${
                  selectedClaimId === c.claim_id
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {c.claim_id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Case Overview Metrics Bar */}
      <div className="paper-card rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-stone-200 shadow-sm">
        <div className="space-y-1">
          <span className="text-xs font-mono text-stone-400 uppercase">Gross Hospital Bill</span>
          <div className="text-3xl sm:text-4xl font-stat font-extrabold text-stone-900 tracking-tight">
            {formatINR(totalBill)}
          </div>
          <p className="text-xs text-stone-500">Total invoice raised by provider at discharge</p>
        </div>

        <div className="sm:pl-6 space-y-1 pt-4 sm:pt-0">
          <span className="text-xs font-mono text-emerald-700 uppercase">Insurer Settlement</span>
          <div className="text-3xl sm:text-4xl font-stat font-extrabold text-emerald-700 tracking-tight">
            {formatINR(insurerPaid)}
          </div>
          <p className="text-xs text-stone-500">
            Admissible portion approved for payment ({((insurerPaid / (totalBill || 1)) * 100).toFixed(1)}%)
          </p>
        </div>

        <div className="sm:pl-6 space-y-1 pt-4 sm:pt-0">
          <span className="text-xs font-mono text-rose-700 uppercase">Policyholder Out-of-Pocket</span>
          <div className="text-3xl sm:text-4xl font-stat font-extrabold text-rose-700 tracking-tight">
            {formatINR(policyholderOop)}
          </div>
          <p className="text-xs text-stone-500">
            Directly paid by patient at discharge ({((policyholderOop / (totalBill || 1)) * 100).toFixed(1)}%)
          </p>
        </div>
      </div>

      {/* Interactive Financial Waterfall Flow */}
      <div className="paper-card rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-4 gap-2">
          <div>
            <h3 className="text-xl font-serif font-bold text-stone-900">
              The Settlement Waterfall (Case {currentClaim.claim_id})
            </h3>
            <p className="text-xs text-stone-500">
              Click on any step or deduction block to inspect the contractual logic.
            </p>
          </div>
          <span className="paper-stamp text-stone-700 border-stone-300 text-[10px]">
            SYNTHETIC CASE EVIDENCE
          </span>
        </div>

        {/* Step-by-Step Waterfall Sequence */}
        <div className="space-y-4">
          {/* Level 1: Starting Bill */}
          <div
            onClick={() => handleComponentClick('Total Hospital Bill', totalBill)}
            className="p-4 rounded-xl bg-stone-100 hover:bg-stone-200/80 border border-stone-300 cursor-pointer transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-stone-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                1
              </span>
              <div>
                <span className="font-semibold text-stone-900 text-sm sm:text-base">Hospital Bill Raised</span>
                <p className="text-xs text-stone-500">Initial gross invoice before policy assessment</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-lg text-stone-900">{formatINR(totalBill)}</span>
              <span className="text-[11px] text-stone-400 block">100% of claim</span>
            </div>
          </div>

          {/* Level 2: Deductions Waterfall */}
          <div className="pl-6 sm:pl-10 space-y-2 border-l-2 border-dashed border-stone-300">
            <div className="text-xs font-mono uppercase text-amber-800 tracking-wider font-semibold py-1">
              Applied Contract Deductions (Total: {formatINR(totalDeductions)})
            </div>

            {currentClaim.deductible_inr > 0 && (
              <div
                onClick={() => handleDeductionClick('Deductible', currentClaim.deductible_inr)}
                className="p-3.5 rounded-lg bg-amber-50 hover:bg-amber-100/80 border border-amber-200 cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <span className="font-medium text-amber-950 text-sm">Policy Deductible</span>
                  <p className="text-xs text-amber-700">Initial threshold threshold borne by policyholder</p>
                </div>
                <div className="text-right font-mono font-bold text-amber-900">
                  -{formatINR(currentClaim.deductible_inr)}
                </div>
              </div>
            )}

            {currentClaim.room_limit_adjustment_inr > 0 && (
              <div
                onClick={() => handleDeductionClick('Room-Rent Limit Adjustment', currentClaim.room_limit_adjustment_inr)}
                className="p-3.5 rounded-lg bg-amber-50 hover:bg-amber-100/80 border border-amber-200 cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <span className="font-medium text-amber-950 text-sm">Room Rent Cap Adjustment</span>
                  <p className="text-xs text-amber-700">Proportionate penalty for exceeding standard room category</p>
                </div>
                <div className="text-right font-mono font-bold text-amber-900">
                  -{formatINR(currentClaim.room_limit_adjustment_inr)}
                </div>
              </div>
            )}

            {currentClaim.noncovered_inr > 0 && (
              <div
                onClick={() => handleDeductionClick('Non-covered Expenses', currentClaim.noncovered_inr)}
                className="p-3.5 rounded-lg bg-amber-50 hover:bg-amber-100/80 border border-amber-200 cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <span className="font-medium text-amber-950 text-sm">Non-Covered Consumables & Admin Fees</span>
                  <p className="text-xs text-amber-700">Gloves, sanitizers, surgical gowns, administrative documentation</p>
                </div>
                <div className="text-right font-mono font-bold text-amber-900">
                  -{formatINR(currentClaim.noncovered_inr)}
                </div>
              </div>
            )}

            {currentClaim.copay_inr > 0 && (
              <div
                onClick={() => handleDeductionClick('Co-Payment', currentClaim.copay_inr)}
                className="p-3.5 rounded-lg bg-amber-50 hover:bg-amber-100/80 border border-amber-200 cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <span className="font-medium text-amber-950 text-sm">
                    Policyholder Co-Pay ({(currentClaim.copay_rate * 100).toFixed(0)}%)
                  </span>
                  <p className="text-xs text-amber-700">Agreed contract percentage paid by insured</p>
                </div>
                <div className="text-right font-mono font-bold text-amber-900">
                  -{formatINR(currentClaim.copay_inr)}
                </div>
              </div>
            )}

            {currentClaim.policy_limit_adjustment_inr > 0 && (
              <div
                onClick={() => handleDeductionClick('Policy Sub-Limit Adjustment', currentClaim.policy_limit_adjustment_inr)}
                className="p-3.5 rounded-lg bg-amber-50 hover:bg-amber-100/80 border border-amber-200 cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <span className="font-medium text-amber-950 text-sm">Treatment Sub-Limit Ceiling</span>
                  <p className="text-xs text-amber-700">Cap on specific procedure or tariff ceiling</p>
                </div>
                <div className="text-right font-mono font-bold text-amber-900">
                  -{formatINR(currentClaim.policy_limit_adjustment_inr)}
                </div>
              </div>
            )}
          </div>

          {/* Level 3: Dual Final Settlement Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div
              onClick={() => handleComponentClick('Insurer Settlement Payout', insurerPaid)}
              className="p-5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border-2 border-emerald-300 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-emerald-800 uppercase font-bold tracking-wider">
                  Insurer Paid
                </span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                  {((insurerPaid / (totalBill || 1)) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="text-2xl font-mono font-bold text-emerald-900 mt-2">
                {formatINR(insurerPaid)}
              </div>
              <p className="text-xs text-emerald-700 mt-1">
                Settled via Cashless authorization or direct policyholder bank transfer.
              </p>
            </div>

            <div
              onClick={() => handleComponentClick('Policyholder Out-of-Pocket', policyholderOop)}
              className="p-5 rounded-xl bg-rose-50 hover:bg-rose-100/80 border-2 border-rose-300 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-rose-800 uppercase font-bold tracking-wider">
                  Policyholder Out-of-Pocket
                </span>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-rose-200 text-rose-900">
                  {((policyholderOop / (totalBill || 1)) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="text-2xl font-mono font-bold text-rose-900 mt-2">
                {formatINR(policyholderOop)}
              </div>
              <p className="text-xs text-rose-700 mt-1">
                Paid out of patient savings / family support to settle hospital invoice.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Bill Component Deconstruction */}
      {currentBillComponents.length > 0 && (
        <div className="paper-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h3 className="text-xl font-serif font-bold text-stone-900">
                Hospital Bill Itemization ({currentClaim.claim_id})
              </h3>
              <p className="text-xs text-stone-500">
                Each expense line item in the hospital billing invoice
              </p>
            </div>
            <span className="text-xs font-mono text-stone-400">
              {currentBillComponents.length} Billed Items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {currentBillComponents.map((item, idx) => {
              const pct = ((item.amount_inr / (totalBill || 1)) * 100).toFixed(1);
              return (
                <div
                  key={idx}
                  onClick={() => handleComponentClick(item.bill_component, item.amount_inr)}
                  className="p-4 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                    <span>{item.bill_component}</span>
                    <span className="text-stone-400">{pct}%</span>
                  </div>
                  <div className="text-lg font-mono font-bold text-stone-900 mt-1 group-hover:text-amber-800">
                    {formatINR(item.amount_inr)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

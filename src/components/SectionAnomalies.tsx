import React from 'react';
import { AlertCircle, Eye, ShieldAlert, ArrowRight, Activity, HelpCircle } from 'lucide-react';
import { anomalyPatterns, claimRecords, formatINR } from '../data/claimData';
import { ModalData } from './CaseModal';

interface SectionAnomaliesProps {
  onOpenModal: (data: ModalData) => void;
}

export const SectionAnomalies: React.FC<SectionAnomaliesProps> = ({ onOpenModal }) => {
  // Let's compute actual cohort examples from claimRecords:
  // For AN004 (Long tail): claims with processing_days > 40 days
  const longTailClaims = claimRecords.filter((c) => c.processing_days >= 40);
  // For AN003 (Cost outliers): claims with bill > 5,00,000
  const highBillClaims = claimRecords.filter((c) => c.bill_amount_inr >= 500000);

  const handleAnomalyModal = (anom: (typeof anomalyPatterns)[0]) => {
    onOpenModal({
      title: `${anom.pattern_id}: ${anom.pattern}`,
      subtitle: `Systemic Signal Pattern • ${anom.data_status}`,
      category: 'Data Anomaly Detection',
      keyMetric: {
        label: 'Observed Signal',
        value: anom.signal.split(' ').slice(0, 4).join(' ') + '...',
      },
      body: `Signal: "${anom.signal}". Interpretation: ${anom.interpretation}. In insurance data governance, an anomaly does not automatically imply wrongdoing; rather, it highlights workflow friction, pricing divergence between network hospitals, or administrative bottlenecks requiring operational review.`,
      dataPoints: [
        { label: 'Pattern ID', value: anom.pattern_id },
        { label: 'Signal Definition', value: anom.signal },
        { label: 'Analytical Readout', value: anom.interpretation },
        { label: 'Classification', value: 'Systemic Operational Anomaly' },
      ],
      sourceNote: 'anomaly_patterns_synthetic.json',
      dataStatus: 'synthetic_example',
    });
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
          <ShieldAlert className="w-4 h-4 text-amber-700" />
          <span>Chapter 08 • Outlier Analysis</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          When the Data Looks Unusual
        </h2>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          In large claim repositories, statistical deviations highlight process bottlenecks, pricing variances, and communication breakdowns. Here is how anomalies are distinguished from standard variance.
        </p>
      </div>

      {/* Warning Notice on Ethical Data Interpretation */}
      <div className="p-4 rounded-xl bg-stone-100 border border-stone-300/80 text-xs sm:text-sm text-stone-700 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-stone-900 font-semibold">Analytical Integrity Principle: </strong>
          <span>
            A data anomaly is a statistical signal for audit, not proof of fraud or wrongdoing. 
            ClaimTrace categorizes variances neutrally to identify operational friction and consumer pain points.
          </span>
        </div>
      </div>

      {/* 5 Anomaly Pattern Dossiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {anomalyPatterns.map((item) => (
          <div
            key={item.pattern_id}
            onClick={() => handleAnomalyModal(item)}
            className="paper-card p-6 rounded-2xl hover:border-stone-400 cursor-pointer transition-all hover:translate-y-[-2px] flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {item.pattern_id}
                </span>
                <span className="text-[10px] font-mono uppercase text-stone-400">
                  {item.data_status}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                  {item.pattern}
                </h3>
              </div>

              {/* Signal Block */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">
                  Observed Data Signal
                </span>
                <p className="text-xs text-stone-700 leading-relaxed font-medium">
                  {item.signal}
                </p>
              </div>

              {/* Interpretation Block */}
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 space-y-1">
                <span className="text-[10px] font-mono uppercase text-amber-800 font-bold block">
                  Dataset Interpretation
                </span>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {item.interpretation}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <span>Audit Methodology</span>
              <span className="text-amber-800 font-medium group-hover:underline">Deconstruct Signal →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Concrete Telemetry Case Examples */}
      <div className="paper-card rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-stone-900">
              Empirical Tail Demonstrations
            </h3>
            <p className="text-xs text-stone-500">
              Examining specific synthetic cases manifesting long processing tails or billing variances
            </p>
          </div>
          <span className="text-xs font-mono text-stone-400">
            {longTailClaims.length} Long-Tail Cases Observed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <span className="text-xs font-mono font-bold text-stone-800">
              Processing Duration Outlier (AN004)
            </span>
            <p className="text-xs text-stone-600">
              While the median processing duration is ~34 days, cases such as <strong className="font-mono">CLM10004</strong> required <strong className="font-mono text-amber-800">44 days</strong> due to repeated document resubmission and multiple query stages.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <span className="text-xs font-mono font-bold text-stone-800">
              Provider Cost Dispersion (AN003)
            </span>
            <p className="text-xs text-stone-600">
              Invoices above ₹6,00,000 like <strong className="font-mono">CLM10002</strong> (₹6,30,467) exhibited substantial room rent adjustments (-₹7,500) alongside heavy co-pay deductions (-₹1,69,100), producing an out-of-pocket sum of ₹2,43,441.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

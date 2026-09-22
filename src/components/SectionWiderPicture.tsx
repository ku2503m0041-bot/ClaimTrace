import React from 'react';
import { Globe, Building2, ShieldCheck, HeartHandshake, TrendingUp, Info } from 'lucide-react';
import { indiaIndicators, governmentSchemes, formatINRCompact } from '../data/claimData';
import { ModalData } from './CaseModal';

interface SectionWiderPictureProps {
  onOpenModal: (data: ModalData) => void;
}

export const SectionWiderPicture: React.FC<SectionWiderPictureProps> = ({ onOpenModal }) => {
  const handleIndicatorModal = (ind: (typeof indiaIndicators)[0]) => {
    onOpenModal({
      title: ind.indicator,
      subtitle: `National Healthcare Financing Indicator (${ind.period})`,
      category: 'Macro Landscape',
      keyMetric: {
        label: 'Official Metric Value',
        value: ind.unit === 'percent' ? `${ind.value}%` : `${Number(ind.value).toLocaleString('en-IN')} ${ind.unit}`,
      },
      body: `Published by ${ind.source_organization} in ${ind.source_note}. This metric illustrates the macro financing architecture across India. In high out-of-pocket environments, medical emergencies present major balance sheet risks to middle- and lower-income families, highlighting why claim transparency, pre-authorization efficiency, and network hospital cashless facilities are central regulatory priorities.`,
      dataPoints: [
        { label: 'Geography', value: ind.geography },
        { label: 'Time Period', value: ind.period },
        { label: 'Metric Value', value: `${ind.value} ${ind.unit}` },
        { label: 'Source Citation', value: ind.source_note },
      ],
      sourceNote: `${ind.source_organization} • ${ind.source_note}`,
      dataStatus: 'real_public',
    });
  };

  const handleSchemeModal = (sch: (typeof governmentSchemes)[0]) => {
    onOpenModal({
      title: sch.scheme,
      subtitle: sch.type,
      category: 'Public Health Protection',
      keyMetric: {
        label: 'Annual Cover Cap',
        value: sch.coverage,
      },
      body: `${sch.scheme} delivers ${sch.delivery}. ${sch.note}. Administered by the ${sch.source}, it constitutes one of the largest public health assurance frameworks globally, operating alongside private commercial coverage.`,
      dataPoints: [
        { label: 'Scheme Type', value: sch.type },
        { label: 'Coverage Ceiling', value: sch.coverage },
        { label: 'Service Delivery', value: sch.delivery },
        { label: 'Administering Authority', value: sch.source },
      ],
      sourceNote: `${sch.source} Official Documentation`,
      dataStatus: 'real_public',
    });
  };

  // Financing breakdown items for visualization
  const expenditureFinancing = [
    { label: 'Out-of-Pocket Expenditure (OOPE)', pct: 45.11, color: 'bg-rose-500', text: 'text-rose-700', bg: 'bg-rose-50' },
    { label: 'Union Government Health Budget', pct: 16.69, color: 'bg-blue-500', text: 'text-blue-700', bg: 'bg-blue-50' },
    { label: 'State Government Health Budget', pct: 15.95, color: 'bg-indigo-500', text: 'text-indigo-700', bg: 'bg-indigo-50' },
    { label: 'Private Health Insurance', pct: 8.48, color: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50' },
    { label: 'Government Health Insurance Schemes', pct: 5.87, color: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50' },
    { label: 'Other Financing / Donors', pct: 7.90, color: 'bg-stone-400', text: 'text-stone-700', bg: 'bg-stone-50' },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
          <Globe className="w-4 h-4 text-amber-700" />
          <span>Chapter 09 • Macro Indian Landscape</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          The Wider Picture
        </h2>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Zoom out from an individual hospital invoice to examine the national healthcare financing architecture and public health protection schemes.
        </p>
      </div>

      {/* National Health Accounts (NHA 2021-22) Breakdown */}
      <div className="paper-card rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-4 gap-2">
          <div>
            <span className="paper-stamp text-stone-700 border-stone-300 text-[10px]">
              REAL PUBLIC BENCHMARK • NHA 2021-22
            </span>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
              Who Pays for Healthcare in India?
            </h3>
            <p className="text-xs text-stone-500">
              Current Health Expenditure (CHE) source breakdown from the Ministry of Health & Family Welfare
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-stone-400 uppercase block">Total Settled Claims</span>
            <span className="text-xl font-mono font-bold text-stone-900">3.26 Crore</span>
            <span className="text-[10px] text-stone-400 font-mono block">IRDAI 2024-25</span>
          </div>
        </div>

        {/* Stacked Proportional Distribution Bar */}
        <div className="space-y-2">
          <div className="h-6 w-full rounded-lg flex overflow-hidden shadow-inner border border-stone-200">
            {expenditureFinancing.map((item, idx) => (
              <div
                key={idx}
                className={`${item.color} h-full transition-all hover:opacity-90 relative group`}
                style={{ width: `${item.pct}%` }}
                title={`${item.label}: ${item.pct}%`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs pt-2">
            {expenditureFinancing.map((item, idx) => (
              <div key={idx} className={`p-2.5 rounded-lg border border-stone-200/80 ${item.bg}`}>
                <div className="font-mono font-bold text-stone-900 text-sm">{item.pct}%</div>
                <div className="text-[11px] text-stone-600 mt-0.5 leading-snug line-clamp-2">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official Indicators Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-serif font-bold text-stone-900">
          Official Industry & Economic Indicators
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {indiaIndicators.map((ind, idx) => (
            <div
              key={idx}
              onClick={() => handleIndicatorModal(ind)}
              className="paper-card p-5 rounded-xl hover:border-stone-400 cursor-pointer transition-all hover:translate-y-[-2px] flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                    {ind.period}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-800 uppercase font-semibold">
                    {ind.data_status.replace('_', ' ')}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-stone-800 group-hover:text-amber-900">
                  {ind.indicator}
                </h4>
                <div className="text-2xl font-serif font-bold text-stone-900">
                  {ind.unit === 'percent'
                    ? `${ind.value}%`
                    : Number(ind.value) > 1000000
                    ? `${(Number(ind.value) / 10000000).toFixed(2)} Cr`
                    : ind.value}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                <span className="truncate max-w-[180px]">{ind.source_organization}</span>
                <span className="text-amber-800 font-medium group-hover:underline">Why this matters →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Public Health Protection Schemes Dossier */}
      <div className="space-y-4">
        <h3 className="text-xl font-serif font-bold text-stone-900">
          Government Health Assurance Frameworks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {governmentSchemes.map((sch, idx) => (
            <div
              key={idx}
              onClick={() => handleSchemeModal(sch)}
              className="paper-card p-6 rounded-2xl hover:border-stone-400 cursor-pointer transition-all hover:translate-y-[-2px] space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="paper-stamp text-emerald-800 border-emerald-300 bg-emerald-50 text-[10px]">
                  NATIONAL HEALTH SCHEME
                </span>
                <span className="text-xs font-mono text-stone-400">{sch.source}</span>
              </div>

              <div>
                <h4 className="text-xl font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                  {sch.scheme}
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">{sch.type}</p>
              </div>

              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] font-mono uppercase text-stone-400 font-bold block">
                  Coverage Threshold
                </span>
                <span className="text-lg font-mono font-bold text-emerald-800">
                  {sch.coverage}
                </span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {sch.delivery}. {sch.note}.
              </p>

              <div className="pt-2 text-right">
                <span className="text-xs text-amber-800 font-medium group-hover:underline">
                  Inspect Regulatory Parameters →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

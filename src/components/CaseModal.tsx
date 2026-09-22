import React from 'react';
import { X, Info, ShieldCheck, AlertCircle, FileText } from 'lucide-react';

export interface ModalData {
  title: string;
  subtitle?: string;
  category?: string;
  keyMetric?: {
    label: string;
    value: string;
  };
  body: string;
  dataPoints?: { label: string; value: string | number }[];
  sourceNote?: string;
  dataStatus?: string;
}

interface CaseModalProps {
  data: ModalData | null;
  onClose: () => void;
}

export const CaseModal: React.FC<CaseModalProps> = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div
      id="case-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        id="case-modal-container"
        className="relative w-full max-w-lg bg-[#fefdfb] border border-stone-200 rounded-xl shadow-2xl p-6 sm:p-8 overflow-hidden text-stone-900 transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top header bar */}
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {data.category && (
                <span className="text-xs font-mono tracking-wider uppercase text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                  {data.category}
                </span>
              )}
              {data.dataStatus && (
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                  data.dataStatus.includes('synthetic')
                    ? 'border-amber-300 text-amber-700 bg-amber-50'
                    : 'border-emerald-300 text-emerald-700 bg-emerald-50'
                }`}>
                  {data.dataStatus.replace(/_/g, ' ')}
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              {data.title}
            </h3>
            {data.subtitle && (
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">{data.subtitle}</p>
            )}
          </div>
          <button
            id="btn-close-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlighted Metric Card */}
        {data.keyMetric && (
          <div className="mt-4 p-4 rounded-lg bg-stone-50 border border-stone-200/80 flex items-baseline justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
              {data.keyMetric.label}
            </span>
            <span className="text-2xl font-bold font-mono text-stone-900">
              {data.keyMetric.value}
            </span>
          </div>
        )}

        {/* Narrative / Plain Language Content */}
        <div className="mt-5 space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
          <p>{data.body}</p>
        </div>

        {/* Data points breakdown table */}
        {data.dataPoints && data.dataPoints.length > 0 && (
          <div className="mt-5 pt-4 border-t border-stone-200">
            <h4 className="text-xs font-mono uppercase text-stone-400 tracking-wider mb-2">
              Verified Data Attributes
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {data.dataPoints.map((dp, idx) => (
                <div key={idx} className="p-2 bg-stone-100/60 rounded border border-stone-200/60">
                  <div className="text-stone-500">{dp.label}</div>
                  <div className="font-mono font-semibold text-stone-800 mt-0.5">{dp.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer source note */}
        <div className="mt-6 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-stone-400" />
            <span>{data.sourceNote || 'Verified against ClaimTrace dataset'}</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-stone-900 text-white rounded text-xs hover:bg-stone-800 transition-colors"
          >
            Close Insight
          </button>
        </div>
      </div>
    </div>
  );
};

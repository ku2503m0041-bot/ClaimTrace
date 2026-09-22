import React, { useState } from 'react';
import { UserCheck, MessageSquare, AlertCircle, HelpCircle, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { painPoints, policyholderQuestions } from '../data/claimData';
import { ModalData } from './CaseModal';

interface SectionPeopleProps {
  onOpenModal: (data: ModalData) => void;
  onNavigate: (tab: string) => void;
}

export const SectionPeople: React.FC<SectionPeopleProps> = ({ onOpenModal, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'painPoints' | 'questions'>('painPoints');

  const handlePainPointModal = (p: (typeof painPoints)[0]) => {
    onOpenModal({
      title: `Case File ${p.id}: ${p.pain_point}`,
      subtitle: `Qualitative Friction Analysis • Theme: ${p.theme}`,
      category: 'Policyholder Experience',
      keyMetric: {
        label: 'Research Priority',
        value: p.priority,
      },
      body: `Field research identified this friction point: "${p.pain_point}". When policyholders face complex institutional workflows involving hospitals, TPAs, and underwriters, friction emerges primarily from opacity in terminology and lack of live status milestones. Recommended architectural solution: ${p.design_response}.`,
      dataPoints: [
        { label: 'Issue Code', value: p.id },
        { label: 'Core Theme', value: p.theme },
        { label: 'System Priority', value: p.priority },
        { label: 'Design Response', value: p.design_response },
      ],
      sourceNote: 'claim_pain_points.json & qualitative research framework',
      dataStatus: 'real_public',
    });
  };

  const handleQuestionModal = (q: (typeof policyholderQuestions)[0]) => {
    onOpenModal({
      title: `Inquiry ${q.id}: "${q.question}"`,
      subtitle: `Core Consumer Question • Audience: ${q.audience}`,
      category: 'Policyholder Inquiries',
      keyMetric: {
        label: 'Thematic Category',
        value: q.theme,
      },
      body: `This frequently asked question reflects a major expectation gap in health insurance. Policyholders asking "${q.question}" typically require immediate plain-language translation of contractual clauses into mathematical realities. Opportunity: ${q.design_opportunity}.`,
      dataPoints: [
        { label: 'Inquiry ID', value: q.id },
        { label: 'Audience', value: q.audience },
        { label: 'Topic Theme', value: q.theme },
        { label: 'Design Opportunity', value: q.design_opportunity },
      ],
      sourceNote: 'policyholder_questions.json',
      dataStatus: 'real_public',
    });
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
          <UserCheck className="w-4 h-4 text-amber-700" />
          <span>Chapter 07 • Qualitative Case Files</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          The People Behind the Claim
        </h2>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Behind every line-item and deduction is a patient or family navigating a stressful medical event. Explore real policyholder inquiries, friction themes, and systemic expectation gaps.
        </p>
      </div>

      {/* Switcher tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('painPoints')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'painPoints'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          Institutional Pain Points ({painPoints.length})
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'questions'
              ? 'bg-stone-900 text-white shadow-sm'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          Common Policyholder Questions ({policyholderQuestions.length})
        </button>
      </div>

      {/* Content View */}
      {activeTab === 'painPoints' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((item) => (
            <div
              key={item.id}
              onClick={() => handlePainPointModal(item)}
              className="paper-card p-6 rounded-2xl hover:border-stone-400 cursor-pointer transition-all hover:translate-y-[-2px] flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-stone-400">
                    CASE FILE {item.id}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                      item.priority === 'High'
                        ? 'bg-rose-50 text-rose-800 border border-rose-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {item.priority} Priority
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                  &ldquo;{item.pain_point}&rdquo;
                </h3>

                <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600">
                  <strong className="text-stone-800 font-semibold block mb-1">
                    Design Response:
                  </strong>
                  {item.design_response}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                <span>Theme: {item.theme}</span>
                <span className="text-amber-800 font-medium group-hover:underline">Inspect Evidence →</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policyholderQuestions.map((q) => (
            <div
              key={q.id}
              onClick={() => handleQuestionModal(q)}
              className="paper-card p-6 rounded-2xl hover:border-stone-400 cursor-pointer transition-all hover:translate-y-[-2px] flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    INQUIRY {q.id} • {q.theme}
                  </span>
                  <span className="text-xs font-mono text-stone-400">{q.audience}</span>
                </div>

                <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                  &ldquo;{q.question}&rdquo;
                </h3>

                <p className="text-xs sm:text-sm text-stone-600">
                  <strong className="text-stone-800">Addressing this gap: </strong>
                  {q.design_opportunity}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                <span>Consumer Research Register</span>
                <span className="text-amber-800 font-medium group-hover:underline">View Plain Explanation →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

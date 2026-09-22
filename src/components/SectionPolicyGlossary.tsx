import React, { useState } from 'react';
import { BookOpen, Search, ShieldCheck, Tag, Info, Filter } from 'lucide-react';
import { policyGlossary } from '../data/claimData';
import { ModalData } from './CaseModal';

interface SectionPolicyGlossaryProps {
  onOpenModal: (data: ModalData) => void;
}

export const SectionPolicyGlossary: React.FC<SectionPolicyGlossaryProps> = ({ onOpenModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(policyGlossary.map((g) => g.category)))];

  const filteredGlossary = policyGlossary.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.plain_language_definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTermModal = (term: (typeof policyGlossary)[0]) => {
    onOpenModal({
      title: term.term,
      subtitle: `Regulatory Insurance Terminology (${term.category})`,
      category: 'Policy Decoding',
      keyMetric: {
        label: 'Metric / Unit',
        value: term.unit || 'Standard Clause',
      },
      body: `${term.plain_language_definition}. This term is governed by IRDAI Master Circulars and consumer health regulations. Understanding this clause before hospitalization helps prevent unexpected deduction surprises upon discharge.`,
      dataPoints: [
        { label: 'Classification', value: term.category },
        { label: 'Standard Unit', value: term.unit },
        { label: 'Regulatory Status', value: 'IRDAI Standard Definition' },
      ],
      sourceNote: 'IRDAI Health Department Guidelines & Master Circular on Health Insurance Business',
      dataStatus: 'real_concept',
    });
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
          <BookOpen className="w-4 h-4 text-amber-700" />
          <span>Chapter 06 • Regulatory Dictionary</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          Decode Your Policy
        </h2>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Insurance contracts often use legalistic phrasing. Here is every standard term translated into plain language as defined under IRDAI guidelines.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white border border-stone-200 rounded-xl shadow-sm">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="input-glossary-search"
            type="text"
            placeholder="Search terms (e.g. Co-pay, Room-rent, Waiting period)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          <Filter className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors font-medium ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGlossary.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleTermModal(item)}
            className="paper-card p-5 rounded-xl hover:border-stone-400 cursor-pointer transition-all hover:translate-y-[-2px] flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider uppercase text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <span className="text-xs font-mono text-stone-400">{item.unit}</span>
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                {item.term}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {item.plain_language_definition}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <span>IRDAI Regulatory Concept</span>
              <span className="text-amber-800 font-medium group-hover:underline">Read Modal →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

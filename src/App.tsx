import React, { useState } from 'react';
import { Navbar, navItems } from './components/Navbar';
import { CaseModal, ModalData } from './components/CaseModal';
import { SectionOpening } from './components/SectionOpening';
import { SectionMeetData } from './components/SectionMeetData';
import { SectionFollowMoney } from './components/SectionFollowMoney';
import { SectionJourney } from './components/SectionJourney';
import { SectionDeductions } from './components/SectionDeductions';
import { SectionPolicyGlossary } from './components/SectionPolicyGlossary';
import { SectionPeople } from './components/SectionPeople';
import { SectionAnomalies } from './components/SectionAnomalies';
import { SectionWiderPicture } from './components/SectionWiderPicture';
import { SectionSynthesis } from './components/SectionSynthesis';
import { SectionClaimExplorer } from './components/SectionClaimExplorer';
import { SectionSourcesMethodology } from './components/SectionSourcesMethodology';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('opening');
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const currentIndex = navItems.findIndex((item) => item.id === activeTab);
  const prevChapter = currentIndex > 0 ? navItems[currentIndex - 1] : null;
  const nextChapter = currentIndex < navItems.length - 1 ? navItems[currentIndex + 1] : null;

  const navigateTo = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f5] text-stone-900 selection:bg-amber-200">
      {/* Editorial Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={navigateTo} />

      {/* Main Narrative Canvas */}
      <main className="flex-1">
        {activeTab === 'opening' && (
          <SectionOpening onNavigate={navigateTo} onOpenModal={setModalData} />
        )}
        {activeTab === 'meet-data' && (
          <SectionMeetData onNavigate={navigateTo} onOpenModal={setModalData} />
        )}
        {activeTab === 'follow-money' && (
          <SectionFollowMoney onOpenModal={setModalData} />
        )}
        {activeTab === 'journey' && (
          <SectionJourney onOpenModal={setModalData} />
        )}
        {activeTab === 'deductions' && (
          <SectionDeductions onOpenModal={setModalData} />
        )}
        {activeTab === 'glossary' && (
          <SectionPolicyGlossary onOpenModal={setModalData} />
        )}
        {activeTab === 'people' && (
          <SectionPeople onOpenModal={setModalData} onNavigate={navigateTo} />
        )}
        {activeTab === 'anomalies' && (
          <SectionAnomalies onOpenModal={setModalData} />
        )}
        {activeTab === 'macro' && (
          <SectionWiderPicture onOpenModal={setModalData} />
        )}
        {activeTab === 'synthesis' && (
          <SectionSynthesis onNavigate={navigateTo} onOpenModal={setModalData} />
        )}
        {activeTab === 'explorer' && (
          <SectionClaimExplorer onOpenModal={setModalData} />
        )}
        {activeTab === 'sources' && (
          <SectionSourcesMethodology onOpenModal={setModalData} />
        )}
      </main>

      {/* Chapter Continuity Bottom Bar */}
      <div className="border-t border-stone-200 bg-white/70 backdrop-blur-sm py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            {prevChapter ? (
              <button
                id="btn-prev-chapter"
                onClick={() => navigateTo(prevChapter.id)}
                className="inline-flex items-center gap-2 text-xs font-mono text-stone-600 hover:text-stone-900 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous: 0{currentIndex}. {prevChapter.short}</span>
              </button>
            ) : (
              <span className="text-xs font-mono text-stone-400">ClaimTrace Story Investigation</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-stone-400">
            <span>Chapter</span>
            <span className="font-bold text-stone-900">0{currentIndex + 1}</span>
            <span>of</span>
            <span>0{navItems.length}</span>
          </div>

          <div>
            {nextChapter ? (
              <button
                id="btn-next-chapter"
                onClick={() => navigateTo(nextChapter.id)}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-900 hover:text-amber-950 transition-colors"
              >
                <span>Next: 0{currentIndex + 2}. {nextChapter.short}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => navigateTo('opening')}
                className="inline-flex items-center gap-2 text-xs font-mono text-amber-900 hover:text-amber-950 transition-colors"
              >
                <span>Return to Beginning</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-[#f4f3ed] py-10 px-4 sm:px-6 lg:px-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-serif font-bold text-sm text-stone-900">
              ClaimTrace • Interactive Health Insurance Data Storytelling
            </div>
            <p className="text-[11px] text-stone-500 max-w-md">
              A transparent investigative platform grounded in IRDAI statutory statistics and National Health Accounts data.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <button
              onClick={() => navigateTo('sources')}
              className="hover:text-stone-900 underline"
            >
              Methodology & Ethics
            </button>
            <span>•</span>
            <button
              onClick={() => navigateTo('glossary')}
              className="hover:text-stone-900 underline"
            >
              IRDAI Policy Terms
            </button>
            <span>•</span>
            <button
              onClick={() => navigateTo('explorer')}
              className="hover:text-stone-900 underline"
            >
              Synthetic Data Sandbox
            </button>
          </div>
        </div>
      </footer>

      {/* Drilldown Modal */}
      <CaseModal data={modalData} onClose={() => setModalData(null)} />
    </div>
  );
};

export default App;

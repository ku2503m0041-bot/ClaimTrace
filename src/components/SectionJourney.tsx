import React, { useState } from 'react';
import { GitCommit, Clock, FileCheck2, AlertCircle, ArrowRight, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { journeyStageAverages, claimJourneys, dataSummary } from '../data/claimData';
import { ModalData } from './CaseModal';

interface SectionJourneyProps {
  onOpenModal: (data: ModalData) => void;
}

const stageDescriptions: Record<string, { desc: string; friction: string; docRequirement: string }> = {
  'Hospital admission': {
    desc: 'Patient is registered at the hospital admission desk. Insurance card and government photo ID are verified, and the hospital TPA helpdesk initiates communication with the insurer.',
    friction: 'Delays often occur if policy details, active member ID, or network hospital empanelment status cannot be immediately confirmed.',
    docRequirement: 'Policy ID card, Aadhaar/Government ID, preliminary doctor admission note.',
  },
  'Pre-authorisation': {
    desc: 'The hospital submits an initial treatment estimate and diagnosis to the insurer/TPA for cashless approval before planned procedures or emergency stabilization.',
    friction: 'Cashless initial authorization often approves only an initial provisional tranche (e.g. 60-70% of estimated bill), requiring a final discharge authorization later.',
    docRequirement: 'Pre-auth request form, treating doctor report, initial cost estimate, diagnostic scans.',
  },
  'Document submission': {
    desc: 'Following treatment, the complete dossier of itemized invoices, pharmacy breakdown slips, daily nursing notes, and discharge summary is compiled and uploaded to the insurer portal.',
    friction: 'Any missing pharmacy sticker, implant barcode invoice, or doctor counter-signature leads to query status.',
    docRequirement: 'Discharge summary, itemized pharmacy bills, diagnostic reports, implant invoices with serial numbers.',
  },
  'Claim assessment': {
    desc: 'Medical underwriters and claims adjudicators at the TPA/Insurer review the bill against policy rules, exclusion lists, room limits, and contracted tariff packages.',
    friction: 'Medical necessity audits and tariff rate reconciliations create back-and-forth between adjudicator and hospital billing desk.',
    docRequirement: 'Full hospital indoor case papers (ICP) and OT notes if surgical.',
  },
  'Query/re-submission': {
    desc: 'The insurer issues formal queries requesting additional medical history (e.g., past treatment records to verify Pre-Existing Disease conditions) or clarification of specific billing entries.',
    friction: 'Key bottleneck: patients and hospitals must track down historical family physician papers or clarify why particular consumables were prescribed.',
    docRequirement: 'Physician clarification certificate, historic prescriptions, revised billing itemization.',
  },
  'Final authorization': {
    desc: 'Final reconciliation of the bill, deduction of non-payable items, calculation of deductible/co-pay, and generation of the final settlement letter for cashless discharge or bank payment.',
    friction: 'Discharge delays at hospital counter while waiting 3 to 6 hours for final TPA cashless approval email/SMS.',
    docRequirement: 'Final discharge authorization note, signed claim satisfaction voucher.',
  },
};

export const SectionJourney: React.FC<SectionJourneyProps> = ({ onOpenModal }) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

  const activeStage = journeyStageAverages[activeStageIndex] || journeyStageAverages[0];
  const activeMeta = stageDescriptions[activeStage.stage] || {
    desc: 'Claim processing milestone in the insurance adjudication workflow.',
    friction: 'Workflow synchronization between healthcare provider, TPA, and underwriter.',
    docRequirement: 'Standard claim documentation.',
  };

  const handleStageModal = (stageName: string, avgDays: number) => {
    const meta = stageDescriptions[stageName] || {
      desc: 'Claim milestone.',
      friction: 'Workflow coordination.',
      docRequirement: 'Documents.',
    };

    onOpenModal({
      title: stageName,
      subtitle: `Stage Milestone • Average Duration: ${avgDays} Days`,
      category: 'Claim Journey Lifecycle',
      keyMetric: {
        label: 'Average Stage Duration',
        value: `${avgDays} Days`,
      },
      body: `${meta.desc} Bottleneck Analysis: ${meta.friction}`,
      dataPoints: [
        { label: 'Milestone', value: stageName },
        { label: 'Observed Average Duration', value: `${avgDays} Days` },
        { label: 'Document Requisite', value: meta.docRequirement },
        { label: 'Dataset Lineage', value: 'claim_journey_synthetic.json' },
      ],
      sourceNote: 'Aggregated from synthetic claim journey telemetry',
      dataStatus: 'synthetic_for_visualization',
    });
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
          <Clock className="w-4 h-4 text-amber-700" />
          <span>Chapter 04 • The Claim Lifecycle</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          The Claim Journey
        </h2>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          A health insurance claim is not an instantaneous transaction. Follow each milestone from hospital entry through scrutiny and final payment.
        </p>
      </div>

      {/* Horizontal Interactive Milestone Strip */}
      <div className="paper-card rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-stone-900">
              Interactive Milestone Track
            </h3>
            <p className="text-xs text-stone-500">
              Click any milestone to isolate its duration, documentation hurdles, and process friction.
            </p>
          </div>
          <span className="text-xs font-mono text-stone-400">
            6 Sequential Milestones
          </span>
        </div>

        {/* Timeline track */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {journeyStageAverages.map((item, idx) => {
            const isSelected = idx === activeStageIndex;
            return (
              <button
                key={idx}
                id={`journey-step-${idx}`}
                onClick={() => setActiveStageIndex(idx)}
                className={`p-4 rounded-xl text-left border transition-all relative overflow-hidden flex flex-col justify-between h-36 ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-md ring-2 ring-amber-400/50'
                    : 'bg-white hover:bg-stone-50 text-stone-900 border-stone-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isSelected ? 'text-amber-400' : 'text-stone-400'
                      }`}
                    >
                      0{item.order}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-stone-800 text-stone-300' : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      ~{item.avgDays}d
                    </span>
                  </div>
                  <h4 className="font-semibold text-xs sm:text-sm mt-2 leading-snug line-clamp-2">
                    {item.stage}
                  </h4>
                </div>

                <div
                  className={`text-[11px] flex items-center gap-1 font-medium ${
                    isSelected ? 'text-amber-300' : 'text-amber-800'
                  }`}
                >
                  <span>{isSelected ? 'Selected' : 'Inspect'}</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Deep Dive Dossier */}
        <div className="mt-8 p-6 sm:p-8 rounded-xl bg-stone-50 border border-stone-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-amber-800 uppercase bg-amber-100/70 px-2 py-0.5 rounded">
                  Milestone 0{activeStage.order}
                </span>
                <span className="text-xs font-mono text-stone-500">
                  Total Telemetry Samples: {activeStage.totalRecords}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
                {activeStage.stage}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-stone-400 block">Average Turnaround</span>
                <span className="text-2xl font-mono font-bold text-amber-900">{activeStage.avgDays} Days</span>
              </div>
              <button
                onClick={() => handleStageModal(activeStage.stage, activeStage.avgDays)}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
              >
                Open Stage Modal
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2 p-4 rounded-lg bg-white border border-stone-200">
              <span className="text-xs font-mono uppercase text-stone-400 font-bold block">
                What Happens Here
              </span>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                {activeMeta.desc}
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-lg bg-white border border-stone-200">
              <span className="text-xs font-mono uppercase text-amber-800 font-bold block">
                Friction & Bottleneck Risks
              </span>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                {activeMeta.friction}
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-lg bg-white border border-stone-200">
              <span className="text-xs font-mono uppercase text-emerald-800 font-bold block">
                Key Documentation Requisite
              </span>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-mono text-xs">
                {activeMeta.docRequirement}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

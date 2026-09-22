import {
  ClaimRecord,
  BillComponent,
  ClaimDeduction,
  ClaimJourneyStage,
  AnomalyPattern,
  IndiaIndicator,
  GovernmentHealthScheme,
  PolicyGlossaryTerm,
  PainPoint,
  PolicyholderQuestion,
  SourceItem,
} from '../types';

// Raw JSON imports directly from the dataset folder
import rawClaims from '../../CLAIMTRACE_INTERACTIVE_WEBSITE/01_DATASETS/03_SYNTHETIC_INTERACTIVE_DATA/claim_records_synthetic.json';
import rawBillComponents from '../../CLAIMTRACE_INTERACTIVE_WEBSITE/01_DATASETS/03_SYNTHETIC_INTERACTIVE_DATA/hospital_bill_components_synthetic.json';
import rawDeductions from '../../CLAIMTRACE_INTERACTIVE_WEBSITE/01_DATASETS/03_SYNTHETIC_INTERACTIVE_DATA/claim_deductions_synthetic.json';
import rawJourneys from '../../CLAIMTRACE_INTERACTIVE_WEBSITE/01_DATASETS/03_SYNTHETIC_INTERACTIVE_DATA/claim_journey_synthetic.json';
import rawAnomalies from '../../CLAIMTRACE_INTERACTIVE_WEBSITE/01_DATASETS/03_SYNTHETIC_INTERACTIVE_DATA/anomaly_patterns_synthetic.json';
import rawSchemes from '../../CLAIMTRACE_INTERACTIVE_WEBSITE/01_DATASETS/02_REAL_PUBLIC_DATA/government_health_schemes.json';
import rawIndicators from '../../CLAIMTRACE_INTERACTIVE_WEBSITE/01_DATASETS/02_REAL_PUBLIC_DATA/india_health_insurance_indicators.json';
import rawGlossary from '../../CLAIMTRACE_INTERACTIVE_WEBSITE/01_DATASETS/02_REAL_PUBLIC_DATA/policy_glossary.json';
import rawPainPoints from '../../CLAIMTRACE_INTERACTIVE_WEBSITE/02_QUALITATIVE_DATA/claim_pain_points.json';
import rawQuestions from '../../CLAIMTRACE_INTERACTIVE_WEBSITE/02_QUALITATIVE_DATA/policyholder_questions.json';
import rawSources from '../../CLAIMTRACE_INTERACTIVE_WEBSITE/03_DATA_DICTIONARY/source_register.json';

// Cleaned and parsed datasets
export const claimRecords: ClaimRecord[] = (rawClaims as any[]).map((c) => ({
  claim_id: String(c.claim_id),
  bill_amount_inr: parseFloat(c.bill_amount_inr) || 0,
  deductible_inr: parseFloat(c.deductible_inr) || 0,
  copay_rate: parseFloat(c.copay_rate) || 0,
  copay_inr: parseFloat(c.copay_inr) || 0,
  room_limit_adjustment_inr: parseFloat(c.room_limit_adjustment_inr) || 0,
  noncovered_inr: parseFloat(c.noncovered_inr) || 0,
  policy_limit_adjustment_inr: parseFloat(c.policy_limit_adjustment_inr) || 0,
  insurer_paid_inr: parseFloat(c.insurer_paid_inr) || 0,
  policyholder_oop_inr: parseFloat(c.policyholder_oop_inr) || 0,
  claim_status: c.claim_status || 'Paid',
  processing_days: parseInt(c.processing_days, 10) || 0,
  data_status: c.data_status || 'synthetic_for_visualization',
}));

export const billComponents: BillComponent[] = (rawBillComponents as any[]).map((b) => ({
  claim_id: String(b.claim_id),
  bill_component: String(b.bill_component),
  amount_inr: parseFloat(b.amount_inr) || 0,
  data_status: b.data_status || 'synthetic_for_visualization',
}));

export const claimDeductions: ClaimDeduction[] = (rawDeductions as any[]).map((d) => ({
  claim_id: String(d.claim_id),
  deduction_type: String(d.deduction_type),
  amount_inr: parseFloat(d.amount_inr) || 0,
  data_status: d.data_status || 'synthetic_for_visualization',
}));

export const claimJourneys: ClaimJourneyStage[] = (rawJourneys as any[]).map((j) => ({
  claim_id: String(j.claim_id),
  stage_order: parseInt(j.stage_order, 10) || 1,
  stage: String(j.stage),
  stage_duration_days: parseInt(j.stage_duration_days, 10) || 0,
  data_status: j.data_status || 'synthetic_for_visualization',
}));

export const anomalyPatterns: AnomalyPattern[] = rawAnomalies as AnomalyPattern[];
export const governmentSchemes: GovernmentHealthScheme[] = rawSchemes as GovernmentHealthScheme[];
export const indiaIndicators: IndiaIndicator[] = rawIndicators as IndiaIndicator[];
export const policyGlossary: PolicyGlossaryTerm[] = rawGlossary as PolicyGlossaryTerm[];
export const painPoints: PainPoint[] = rawPainPoints as PainPoint[];
export const policyholderQuestions: PolicyholderQuestion[] = rawQuestions as PolicyholderQuestion[];
export const sourcesRegister: SourceItem[] = rawSources as SourceItem[];

// Helper formatting functions
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatINRCompact = (amount: number): string => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}k`;
  }
  return formatINR(amount);
};

// Summary Statistics
export const dataSummary = {
  totalClaimsCount: claimRecords.length,
  totalBillAmount: claimRecords.reduce((sum, c) => sum + c.bill_amount_inr, 0),
  totalInsurerPaid: claimRecords.reduce((sum, c) => sum + c.insurer_paid_inr, 0),
  totalPolicyholderOOP: claimRecords.reduce((sum, c) => sum + c.policyholder_oop_inr, 0),
  avgProcessingDays: Math.round(
    claimRecords.reduce((sum, c) => sum + c.processing_days, 0) / (claimRecords.length || 1)
  ),
  overallPayoutRatio: claimRecords.length > 0
    ? (claimRecords.reduce((sum, c) => sum + c.insurer_paid_inr, 0) /
       claimRecords.reduce((sum, c) => sum + c.bill_amount_inr, 0)) * 100
    : 0,
};

// Deductions summary aggregated across all synthetic claims
export const deductionTotalsByType = claimDeductions.reduce<Record<string, { count: number; totalAmount: number }>>((acc, d) => {
  if (!acc[d.deduction_type]) {
    acc[d.deduction_type] = { count: 0, totalAmount: 0 };
  }
  acc[d.deduction_type].count += 1;
  acc[d.deduction_type].totalAmount += d.amount_inr;
  return acc;
}, {});

export const deductionChartData = Object.entries(deductionTotalsByType).map(([type, val]) => ({
  type,
  amount: Math.round(val.totalAmount),
  count: val.count,
  avgAmount: Math.round(val.totalAmount / (val.count || 1)),
})).sort((a, b) => b.amount - a.amount);

// Journey stage averages
const journeyStagesGroup = claimJourneys.reduce<Record<string, { order: number; totalDays: number; count: number }>>((acc, j) => {
  if (!acc[j.stage]) {
    acc[j.stage] = { order: j.stage_order, totalDays: 0, count: 0 };
  }
  acc[j.stage].totalDays += j.stage_duration_days;
  acc[j.stage].count += 1;
  return acc;
}, {});

export const journeyStageAverages = Object.entries(journeyStagesGroup)
  .map(([stage, data]) => ({
    stage,
    order: data.order,
    avgDays: parseFloat((data.totalDays / (data.count || 1)).toFixed(1)),
    totalRecords: data.count,
  }))
  .sort((a, b) => a.order - b.order);

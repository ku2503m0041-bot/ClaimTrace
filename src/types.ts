export interface ClaimRecord {
  claim_id: string;
  bill_amount_inr: number;
  deductible_inr: number;
  copay_rate: number;
  copay_inr: number;
  room_limit_adjustment_inr: number;
  noncovered_inr: number;
  policy_limit_adjustment_inr: number;
  insurer_paid_inr: number;
  policyholder_oop_inr: number;
  claim_status: 'Paid' | 'Partially Paid' | 'Rejected' | string;
  processing_days: number;
  data_status: string;
}

export interface BillComponent {
  claim_id: string;
  bill_component: string;
  amount_inr: number;
  data_status: string;
}

export interface ClaimDeduction {
  claim_id: string;
  deduction_type: string;
  amount_inr: number;
  data_status: string;
}

export interface ClaimJourneyStage {
  claim_id: string;
  stage_order: number;
  stage: string;
  stage_duration_days: number;
  data_status: string;
}

export interface AnomalyPattern {
  pattern_id: string;
  pattern: string;
  signal: string;
  interpretation: string;
  data_status: string;
}

export interface IndiaIndicator {
  geography: string;
  period: string;
  indicator: string;
  value: number | string;
  unit: string;
  source_note: string;
  source_organization: string;
  data_status: string;
}

export interface GovernmentHealthScheme {
  scheme: string;
  type: string;
  coverage: string;
  delivery: string;
  source: string;
  note: string;
}

export interface PolicyGlossaryTerm {
  term: string;
  plain_language_definition: string;
  category: string;
  unit: string;
  data_status: string;
}

export interface PainPoint {
  id: string;
  pain_point: string;
  theme: string;
  priority: 'High' | 'Medium' | 'Low' | string;
  design_response: string;
}

export interface PolicyholderQuestion {
  id: string;
  question: string;
  theme: string;
  audience: string;
  design_opportunity: string;
}

export interface SourceItem {
  source_id: string;
  title: string;
  use: string;
  url: string;
  source_type: string;
  notes: string;
}

export interface QualitativeCode {
  code_id?: string;
  code?: string;
  category?: string;
  description?: string;
  [key: string]: unknown;
}

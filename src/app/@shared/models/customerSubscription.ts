export interface CustomerSubscription {
  object: string;
  data: CustomerSubscriptionDatum[];
  has_more: boolean;
  url: string;
}

export interface CustomerSubscriptionDatum {
  id: string;
  object: string;
  application_fee_percent: null;
  automatic_tax: AutomaticTax;
  billing_cycle_anchor: number;
  billing_thresholds: null;
  cancel_at: null;
  cancel_at_period_end: boolean;
  canceled_at: null;
  collection_method: string;
  created: number;
  current_period_end: number;
  current_period_start: number;
  customer: string;
  days_until_due: null;
  default_payment_method: null;
  default_source: null;
  default_tax_rates: any[];
  discount: null;
  ended_at: null;
  items: Items;
  latest_invoice: string;
  livemode: boolean;
  metadata: Metadata;
  next_pending_invoice_item_invoice: null;
  pause_collection: null;
  pending_invoice_item_interval: null;
  pending_setup_intent: null;
  pending_update: null;
  plan: Plan;
  quantity: number;
  schedule: null;
  start_date: number;
  status: string;
  transfer_data: null;
  trial_end: null;
  trial_start: null;
}

export interface AutomaticTax {
  enabled: boolean;
}

export interface Items {
  object: string;
  data: ItemsDatum[];
  has_more: boolean;
  total_count: number;
  url: string;
}

export interface ItemsDatum {
  id: string;
  object: string;
  billing_thresholds: null;
  created: number;
  metadata: Metadata;
  plan: Plan;
  price: Price;
  quantity: number;
  subscription: string;
  tax_rates: any[];
}

export interface Metadata {}

export interface Plan {
  id: string;
  object: string;
  active: boolean;
  aggregate_usage: null;
  amount: number;
  amount_decimal: string;
  billing_scheme: string;
  created: number;
  currency: string;
  interval: string;
  interval_count: number;
  livemode: boolean;
  metadata: Metadata;
  nickname: null;
  product: string;
  tiers_mode: null;
  transform_usage: null;
  trial_period_days: null;
  usage_type: string;
}

export interface Price {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  livemode: boolean;
  lookup_key: null;
  metadata: Metadata;
  nickname: null;
  product: string;
  recurring: Recurring;
  tiers_mode: null;
  transform_quantity: null;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

export interface Recurring {
  aggregate_usage: null;
  interval: string;
  interval_count: number;
  trial_period_days: null;
  usage_type: string;
}
export interface EventFundingInfo {
  id: string;
  name: string;
  totalAmount: number;
  time: string;
  description: string;
  listFamily?: FamilyFundingInfo[];
}

export interface FamilyFundingInfo {
  address: string;
  nameOnwer: string;
  amount: number;
}
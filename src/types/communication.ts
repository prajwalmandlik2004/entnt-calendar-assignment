export interface Communication {
  id: string;
  companyId: string;
  type: string;
  date: string;
  notes?: string;
  createdAt: string;
}

export interface CompanyWithCommunications {
  id: string;
  name: string;
  communicationPeriodicity: number;
  lastCommunications: Communication[];
  nextCommunication?: {
    type: string;
    date: string;
  };
  highlightDisabled?: boolean;
  status: 'overdue' | 'due' | 'normal';
}
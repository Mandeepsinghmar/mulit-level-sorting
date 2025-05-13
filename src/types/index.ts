export interface Client {
  id: string;
  client_id_numeric: number;
  name: string;
  type: 'Individual' | 'Company';
  email: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortCriterion {
  id: string;
  label: string;
  direction: SortDirection;
  type: 'string' | 'date' | 'number';
}

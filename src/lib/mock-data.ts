import { Client, SortCriterion } from '@/types';

// export const MOCK_CLIENTS: Client[] = [
//   {
//     id: 'cli_1',
//     client_id_numeric: 20,
//     name: 'John Doe',
//     type: 'Individual',
//     email: 'johndoe1@email.com',
//     status: 'Active',
//     createdAt: new Date('2023-01-15T10:00:00Z'),
//     updatedAt: new Date('2023-10-20T14:30:00Z'),
//     updatedBy: 'Alice',
//   },
//   {
//     // New: Same name, different created At
//     id: 'cli_6',
//     client_id_numeric: 22,
//     name: 'John Doe',
//     type: 'Individual',
//     email: 'johndoe2@email.com',
//     status: 'Inactive',
//     createdAt: new Date('2022-12-20T11:00:00Z'),
//     updatedAt: new Date('2023-09-01T11:30:00Z'),
//     updatedBy: 'Charlie',
//   },
//   {
//     // New: Same name, different created At
//     id: 'cli_8',
//     client_id_numeric: 23,
//     name: 'John Doe',
//     type: 'Individual',
//     email: 'johndoe3@email.com',
//     status: 'Active',
//     createdAt: new Date('2023-01-15T08:00:00Z'),
//     updatedAt: new Date('2023-11-15T10:00:00Z'),
//     updatedBy: 'Alice',
//   },
//   {
//     id: 'cli_2',
//     client_id_numeric: 21,
//     name: 'Test Test',
//     type: 'Individual',
//     email: 'test@test.com',
//     status: 'Active',
//     createdAt: new Date('2023-03-22T09:00:00Z'),
//     updatedAt: new Date('2023-11-05T11:00:00Z'),
//     updatedBy: 'Bob',
//   },
//   {
//     id: 'cli_3',
//     client_id_numeric: 15,
//     name: 'Alpha Corp',
//     type: 'Company',
//     email: 'contact@alpha.co',
//     status: 'Inactive',
//     createdAt: new Date('2022-11-10T12:00:00Z'),
//     updatedAt: new Date('2023-09-15T16:45:00Z'),
//     updatedBy: 'Charlie',
//   },
//   {
//     // New: Same name, different created At
//     id: 'cli_7',
//     client_id_numeric: 16,
//     name: 'Alpha Corp',
//     type: 'Company',
//     email: 'support@alpha.co',
//     status: 'Active',
//     createdAt: new Date('2023-02-01T15:00:00Z'),
//     updatedAt: new Date('2023-10-01T10:00:00Z'),
//     updatedBy: 'David',
//   },
//   {
//     id: 'cli_4',
//     client_id_numeric: 25,
//     name: 'Beta Solutions',
//     type: 'Company',
//     email: 'info@beta.inc',
//     status: 'Active',
//     createdAt: new Date('2023-05-01T08:30:00Z'),
//     updatedAt: new Date('2023-12-01T09:20:00Z'),
//     updatedBy: 'Alice',
//   },
//   {
//     id: 'cli_5',
//     client_id_numeric: 18,
//     name: 'Jane Smith',
//     type: 'Individual',
//     email: 'jane.s@mail.net',
//     status: 'Active',
//     createdAt: new Date('2023-02-28T15:00:00Z'),
//     updatedAt: new Date('2023-08-10T10:10:00Z'),
//     updatedBy: 'David',
//   },
// ];

export const MOCK_CLIENTS: Client[] = [
  // John Doe Group - designed for tertiary sort
  {
    id: 'cli_1',
    client_id_numeric: 20,
    name: 'John Doe',
    type: 'Individual',
    email: 'johndoe1@email.com',
    status: 'Active',
    createdAt: new Date('2023-01-15T10:00:00Z'), // Same createdAt as cli_9
    updatedAt: new Date('2023-10-20T14:30:00Z'), // Different updatedAt
    updatedBy: 'Alice',
  },
  {
    id: 'cli_9',
    client_id_numeric: 24,
    name: 'John Doe',
    type: 'Individual',
    email: 'johndoe4@email.com',
    status: 'Active',
    createdAt: new Date('2023-01-15T10:00:00Z'), // Same createdAt as cli_1
    updatedAt: new Date('2023-11-01T10:00:00Z'), // Different updatedAt (later)
    updatedBy: 'Eve',
  },
  {
    id: 'cli_10',
    client_id_numeric: 26,
    name: 'John Doe',
    type: 'Individual',
    email: 'johndoe5@email.com',
    status: 'Inactive',
    createdAt: new Date('2023-01-15T10:00:00Z'), // Same createdAt as cli_1 and cli_9
    updatedAt: new Date('2023-09-15T12:00:00Z'), // Different updatedAt (earlier than cli_1)
    updatedBy: 'Frank',
  },
  {
    id: 'cli_6',
    client_id_numeric: 22,
    name: 'John Doe',
    type: 'Individual',
    email: 'johndoe2@email.com',
    status: 'Inactive',
    createdAt: new Date('2022-12-20T11:00:00Z'), // Different createdAt from the group above
    updatedAt: new Date('2023-09-01T11:30:00Z'),
    updatedBy: 'Charlie',
  },
  {
    id: 'cli_8',
    client_id_numeric: 23,
    name: 'John Doe',
    type: 'Individual',
    email: 'johndoe3@email.com',
    status: 'Active',
    createdAt: new Date('2023-01-15T08:00:00Z'), // Different createdAt from the group above
    updatedAt: new Date('2023-11-15T10:00:00Z'),
    updatedBy: 'Alice',
  },

  // Alpha Corp Group - designed for secondary sort
  {
    id: 'cli_3',
    client_id_numeric: 15,
    name: 'Alpha Corp',
    type: 'Company',
    email: 'contact@alpha.co',
    status: 'Inactive',
    createdAt: new Date('2022-11-10T12:00:00Z'),
    updatedAt: new Date('2023-09-15T16:45:00Z'),
    updatedBy: 'Charlie',
  },
  {
    id: 'cli_7',
    client_id_numeric: 16,
    name: 'Alpha Corp',
    type: 'Company',
    email: 'support@alpha.co',
    status: 'Active',
    createdAt: new Date('2023-02-01T15:00:00Z'),
    updatedAt: new Date('2023-10-01T10:00:00Z'),
    updatedBy: 'David',
  },

  // Other Clients
  {
    id: 'cli_2',
    client_id_numeric: 21,
    name: 'Test Test',
    type: 'Individual',
    email: 'test@test.com',
    status: 'Active',
    createdAt: new Date('2023-03-22T09:00:00Z'),
    updatedAt: new Date('2023-11-05T11:00:00Z'),
    updatedBy: 'Bob',
  },
  {
    id: 'cli_4',
    client_id_numeric: 25,
    name: 'Beta Solutions',
    type: 'Company',
    email: 'info@beta.inc',
    status: 'Active',
    createdAt: new Date('2023-05-01T08:30:00Z'),
    updatedAt: new Date('2023-12-01T09:20:00Z'),
    updatedBy: 'Alice',
  },
  {
    id: 'cli_5',
    client_id_numeric: 18,
    name: 'Jane Smith',
    type: 'Individual',
    email: 'jane.s@mail.net',
    status: 'Active',
    createdAt: new Date('2023-02-28T15:00:00Z'),
    updatedAt: new Date('2023-08-10T10:10:00Z'),
    updatedBy: 'David',
  },
];

export const AVAILABLE_SORT_COLUMNS: Omit<SortCriterion, 'direction'>[] = [
  { id: 'name', label: 'Client Name', type: 'string' },
  { id: 'createdAt', label: 'Created At', type: 'date' },
  { id: 'updatedAt', label: 'Updated At', type: 'date' },
  { id: 'client_id_numeric', label: 'Client ID', type: 'number' },
];

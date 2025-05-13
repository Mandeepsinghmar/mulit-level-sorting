/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Client, SortCriterion } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function isClientKey(key: any): key is keyof Client {
  return [
    'id',
    'client_id_numeric',
    'name',
    'type',
    'email',
    'status',
    'createdAt',
    'updatedAt',
    'updatedBy',
  ].includes(key);
}

export function applySorting(data: Client[], sorts: SortCriterion[]): Client[] {
  if (!sorts || sorts.length === 0) {
    return [...data];
  }

  const sortedData = [...data].sort((a, b) => {
    for (const sort of sorts) {
      if (!isClientKey(sort.id)) {
        console.warn(`Invalid sort key: ${sort.id}`);
        continue;
      }

      const valA = a[sort.id];
      const valB = b[sort.id];

      let comparison = 0;

      if (sort.type === 'string') {
        comparison = String(valA).localeCompare(String(valB));
      } else if (sort.type === 'number') {
        comparison = Number(valA) - Number(valB);
      } else if (sort.type === 'date') {
        const dateA =
          valA instanceof Date
            ? valA.getTime()
            : new Date(String(valA)).getTime();
        const dateB =
          valB instanceof Date
            ? valB.getTime()
            : new Date(String(valB)).getTime();

        if (isNaN(dateA) && isNaN(dateB)) comparison = 0;
        else if (isNaN(dateA)) comparison = 1;
        else if (isNaN(dateB)) comparison = -1;
        else comparison = dateA - dateB;
      }

      if (comparison !== 0) {
        return sort.direction === 'desc' ? comparison * -1 : comparison;
      }
    }
    return 0;
  });

  return sortedData;
}

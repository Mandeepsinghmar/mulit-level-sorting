'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ArrowUpDown, Filter, Plus, Search } from 'lucide-react';

import { ClientTable } from '@/components/ClientTable';
import { SortPanel } from '@/components/SortPanel';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { MOCK_CLIENTS } from '@/lib/mock-data';
import { SortCriterion, Client } from '@/types';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Separator } from '@/components/ui/separator';
import { applySorting } from '@/lib/utils';

const CLIENTS_SORT_STORAGE_KEY = 'clientsTableSortOrder';

const DEFAULT_SORT_CRITERIA: SortCriterion[] = [
  { id: 'name', label: 'Client Name', direction: 'asc', type: 'string' },
];

export default function Clients() {
  const [isMounted, setIsMounted] = useState(false);
  const [clientsData] = useState<Client[]>(MOCK_CLIENTS);

  const [appliedSorts, setAppliedSorts] = useLocalStorage<SortCriterion[]>(
    CLIENTS_SORT_STORAGE_KEY,
    DEFAULT_SORT_CRITERIA
  );

  const [isSortPopoverOpen, setIsSortPopoverOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sortedClients = useMemo(() => {
    if (!isMounted) return [];
    return applySorting(clientsData, appliedSorts);
  }, [clientsData, appliedSorts, isMounted]);

  const handleApplySorts = (newSorts: SortCriterion[]) => {
    setAppliedSorts(newSorts);
    setIsSortPopoverOpen(false);
  };

  const renderSortBadge = () => {
    if (!isMounted || !appliedSorts || appliedSorts.length === 0) return null;

    return (
      <span className='absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white'>
        {appliedSorts.length}
      </span>
    );
  };

  return (
    <div className='container mx-auto py-8 px-4 md:px-6 lg:px-8'>
      <h1 className='text-xl font-medium'>Clients</h1>
      <Separator className='my-6' />

      <div className='flex justify-between items-center mb-4 gap-4'>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            className='font-bold cursor-pointer text-primary relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
          >
            All
          </Button>
          <Button
            variant='ghost'
            className=' cursor-pointer text-muted-foreground'
          >
            Individual
          </Button>
          <Button
            variant='ghost'
            className='text-muted-foreground cursor-pointer'
          >
            Company
          </Button>
        </div>

        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='icon'
            className='h-9 w-9 text-muted-foreground cursor-pointer'
          >
            <Search className='h-4 w-4' />
            <span className='sr-only'>Search</span>
          </Button>

          <Popover open={isSortPopoverOpen} onOpenChange={setIsSortPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='h-9 w-9 relative text-muted-foreground cursor-pointer'
              >
                <ArrowUpDown className='h-4 w-4' />
                {renderSortBadge()}
                <span className='sr-only'>Sort</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='end'>
              {isSortPopoverOpen && (
                <SortPanel
                  initialSorts={appliedSorts}
                  onApply={handleApplySorts}
                  onClose={() => setIsSortPopoverOpen(false)}
                />
              )}
            </PopoverContent>
          </Popover>

          <Button
            variant='ghost'
            size='icon'
            className='h-9 w-9 text-muted-foreground cursor-pointer'
          >
            <Filter className='h-4 w-4' />
            <span className='sr-only'>Filter</span>
          </Button>
          <Button className='h-9'>
            <Plus className='mr-2 h-4 w-4' /> Add Client
          </Button>
        </div>
      </div>

      <div className='border rounded-lg overflow-hidden'>
        <div className='border rounded-lg overflow-hidden'>
          {isMounted ? (
            <ClientTable clients={sortedClients} />
          ) : (
            // Optional: Render a placeholder or loading state during SSR/initial hydration
            <div className='p-4 text-center text-muted-foreground'>
              Loading table...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

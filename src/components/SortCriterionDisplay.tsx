// src/components/sort-criterion-display.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { SortDirection } from '@/types';
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  GripVertical,
  SquareUser,
  User,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SortCriterionDisplayProps {
  columnId: string;
  label: string;
  type: 'string' | 'date' | 'number';
  currentDirection?: SortDirection;
  onDirectionSelect: (direction: SortDirection) => void;
}

export const SortIcons = {
  grip: GripVertical,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  remove: X,
};

const getSortColumnIcon = (columnId: string): React.ReactNode => {
  switch (columnId) {
    case 'name':
      return <User className='h-4 w-4 text-muted-foreground' />;
    case 'createdAt':
    case 'updatedAt':
      return <CalendarDays className='h-4 w-4 text-muted-foreground' />;
    case 'client_id_numeric':
      return <SquareUser className='h-4 w-4 text-muted-foreground' />;
    default:
      return null;
  }
};

export function SortCriterionDisplay({
  columnId,
  label,
  type,
  currentDirection,
  onDirectionSelect,
}: SortCriterionDisplayProps) {
  const icon = getSortColumnIcon(columnId);

  const renderSortButtons = () => {
    switch (type) {
      case 'string':
      case 'number':
        return (
          <>
            <Button
              variant={currentDirection === 'asc' ? 'secondary' : 'ghost'}
              size='sm'
              onClick={() => onDirectionSelect('asc')}
              className={cn(
                ' cursor-pointer',
                currentDirection === 'asc'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-gray-50'
              )}
            >
              <SortIcons.arrowUp className='mr-1 h-3 w-3' /> A-Z
            </Button>
            <Button
              variant={currentDirection === 'desc' ? 'secondary' : 'ghost'}
              size='sm'
              onClick={() => onDirectionSelect('desc')}
              className={cn(
                ' cursor-pointer',
                currentDirection === 'desc'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-gray-50'
              )}
            >
              <SortIcons.arrowDown className='mr-1 h-3 w-3' /> Z-A
            </Button>
          </>
        );
      case 'date':
        return (
          <>
            <Button
              variant={currentDirection === 'desc' ? 'secondary' : 'ghost'}
              size='sm'
              className={cn(
                'h-7 px-2 text-xs cursor-pointer',
                currentDirection === 'desc'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-gray-50'
              )}
              onClick={() => onDirectionSelect('desc')}
            >
              <SortIcons.arrowUp className='mr-1 h-3 w-3' color='gray' /> Newest
              to Oldest
            </Button>
            <Button
              variant={currentDirection === 'asc' ? 'secondary' : 'ghost'}
              size='sm'
              className={cn(
                'h-7 px-2 text-xs cursor-pointer',
                currentDirection === 'asc'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-gray-50'
              )}
              onClick={() => onDirectionSelect('asc')}
            >
              <SortIcons.arrowDown className='mr-1 h-3 w-3' color='gray' />{' '}
              Oldest to Newest
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className='flex items-center justify-start flex-grow md:gap-20'>
      <div
        className={cn(
          'flex items-center gap-2 flex-grow ',
          !currentDirection && 'text-muted-foreground'
        )}
      >
        {icon && <span className='flex-shrink-0'>{icon}</span>}
        <span className='text-sm  font-medium truncate flex-grow min-w-0 w-28 sm:w-32 md:w-auto'>
          {label}
        </span>
      </div>

      <div className='flex justify-start items-center gap-4 flex-shrink-0'>
        {renderSortButtons()}
      </div>
    </div>
  );
}

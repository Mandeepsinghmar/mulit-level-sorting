import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SortCriterion, SortDirection } from '@/types';
import { SortCriterionDisplay, SortIcons } from './SortCriterionDisplay';
import { AVAILABLE_SORT_COLUMNS } from '@/lib/mock-data';

interface SortableAppliedItemProps {
  criterion: SortCriterion;
  onDirectionChange: (id: string, direction: SortDirection) => void;
  onRemove: (id: string) => void;
}

function SortableAppliedItem({
  criterion,
  onDirectionChange,
  onRemove,
}: SortableAppliedItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: criterion.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center py-2 px-1 ${
        isDragging ? 'bg-muted shadow-md rounded' : ''
      }`}
      {...attributes}
    >
      <button
        {...listeners}
        className='cursor-grab p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded mr-1 flex-shrink-0'
      >
        <SortIcons.grip className='h-4 w-4' />
      </button>
      <SortCriterionDisplay
        columnId={criterion.id}
        label={criterion.label}
        type={criterion.type}
        currentDirection={criterion.direction}
        onDirectionSelect={(dir) => onDirectionChange(criterion.id, dir)}
      />
      <Button
        variant='ghost'
        size='icon'
        className='h-7 w-7 ml-2 text-muted-foreground cursor-pointer hover:text-destructive flex-shrink-0'
        onClick={() => onRemove(criterion.id)}
      >
        <SortIcons.remove className='h-4 w-4' />
      </Button>
    </div>
  );
}

interface UnappliedSortItemProps {
  column: Omit<SortCriterion, 'direction'>;
  onApply: (columnId: string, direction: SortDirection) => void;
}

function UnappliedSortItem({ column, onApply }: UnappliedSortItemProps) {
  return (
    <div className='flex items-center py-2 px-1 '>
      <SortCriterionDisplay
        columnId={column.id}
        label={column.label}
        type={column.type}
        onDirectionSelect={(dir) => onApply(column.id, dir)}
      />
      <div className='w-7 ml-2  flex-shrink-0' />
    </div>
  );
}

interface SortPanelProps {
  initialSorts: SortCriterion[];
  onApply: (sorts: SortCriterion[]) => void;
  onClose: () => void;
}

export function SortPanel({ initialSorts, onApply, onClose }: SortPanelProps) {
  const [stagedSorts, setStagedSorts] = useState<
    { id: string; direction: SortDirection }[]
  >(initialSorts.map((s) => ({ id: s.id, direction: s.direction })));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setStagedSorts((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleChangeDirectionForApplied = (
    id: string,
    direction: SortDirection
  ) => {
    setStagedSorts((prev) =>
      prev.map((s) => (s.id === id ? { ...s, direction } : s))
    );
  };

  const handleRemoveApplied = (id: string) => {
    setStagedSorts((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddSortFromUnapplied = (
    columnId: string,
    direction: SortDirection
  ) => {
    setStagedSorts((prev) => [...prev, { id: columnId, direction }]);
  };

  const handleClearAll = () => {
    setStagedSorts([]);
  };

  const handleApplyAndClose = () => {
    const fullAppliedSorts: SortCriterion[] = stagedSorts.map((ss) => {
      const base = AVAILABLE_SORT_COLUMNS.find((c) => c.id === ss.id);
      if (!base)
        throw new Error(`Sort column definition not found for id: ${ss.id}`);
      return { ...base, direction: ss.direction };
    });
    onApply(fullAppliedSorts);
    onClose();
  };

  const appliedSortCriteriaFull: SortCriterion[] = stagedSorts
    .map((staged) => {
      const base = AVAILABLE_SORT_COLUMNS.find((col) => col.id === staged.id);
      return base ? { ...base, direction: staged.direction } : null;
    })
    .filter((item): item is SortCriterion => item !== null);

  const availableColumnsToApply = AVAILABLE_SORT_COLUMNS.filter(
    (colDef) => !stagedSorts.some((applied) => applied.id === colDef.id)
  );

  return (
    <div className='p-4 w-lg md:w-full md:max-w-2xl'>
      <h3 className='text-lg font-semibold mb-3'>Sort By</h3>

      {appliedSortCriteriaFull.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={appliedSortCriteriaFull.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className='space-y-0'>
              {appliedSortCriteriaFull.map((criterion) => (
                <SortableAppliedItem
                  key={criterion.id}
                  criterion={criterion}
                  onDirectionChange={handleChangeDirectionForApplied}
                  onRemove={handleRemoveApplied}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <p className='text-sm text-muted-foreground text-center py-2'>
          No sorts applied. Select from below.
        </p>
      )}
      {availableColumnsToApply.length > 0 && <Separator className='my-3' />}

      {availableColumnsToApply.length > 0 && (
        <div>
          {availableColumnsToApply.map((column) => (
            <UnappliedSortItem
              key={column.id}
              column={column}
              onApply={handleAddSortFromUnapplied}
            />
          ))}
        </div>
      )}
      {(availableColumnsToApply.length > 0 ||
        appliedSortCriteriaFull.length > 0) && <Separator className='my-3' />}
      <div className='flex justify-between items-center mt-2'>
        <Button
          variant='ghost'
          onClick={handleClearAll}
          disabled={stagedSorts.length === 0}
          className='text-sm cursor-pointer text-muted-foreground'
        >
          Clear all
        </Button>
        <Button
          onClick={handleApplyAndClose}
          className='text-sm cursor-pointer'
        >
          Apply Sort
        </Button>
      </div>
    </div>
  );
}

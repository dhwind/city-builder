import { useSortable } from '@dnd-kit/sortable';
import { GripVertical, GripHorizontal } from 'lucide-react';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ComponentProps = {
  id: string;
  children: React.ReactNode;
  sortType?: 'vertical' | 'horizontal';
  active?: boolean;
  prefix?: string;
  className?: string;
  hovered?: boolean;
  ref?: React.Ref<HTMLDivElement>;
};

const SortableItem: React.FC<ComponentProps> = ({
  prefix,
  id,
  children,
  sortType = 'vertical',
  className,
  active,
  hovered,
  ref,
}) => {
  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
    setActivatorNodeRef,
  } = useSortable({
    id,
  });

  const isVertical = sortType === 'vertical';

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      id={prefix ? `${prefix}-${id}` : id}
      ref={setNodeRef}
      style={style}
      className="flex mt-auto h-auto"
    >
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2 relative',
          className,
          isDragging ? 'opacity-[.4]' : '',
          isVertical ? 'flex-row' : 'flex-col border-b-transparent',
        )}
      >
        {isVertical ? (
          <Button
            variant="ghost"
            className={cn(
              '!h-auto !p-2 rounded',
              active ? 'cursor-grabbing' : 'cursor-grab',
            )}
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
          >
            <GripVertical className="stroke-gray-500" size={24} />
          </Button>
        ) : null}
        <div className="w-full">{children}</div>
        {!isVertical ? (
          <div
            className={`w-full rounded-b py-1 flex justify-center items-center absolute top-full bg-gray-200 opacity-0 transition-opacity ${hovered ? 'opacity-100' : ''}`}
          >
            <Button
              variant="ghost"
              className={cn(
                '!h-auto !p-2 rounded',
                active ? 'cursor-grabbing' : 'cursor-grab',
              )}
              ref={setActivatorNodeRef}
              {...attributes}
              {...listeners}
            >
              <GripHorizontal className="stroke-gray-500" size={24} />
            </Button>
          </div>
        ) : null}
      </div>
    </li>
  );
};

export default SortableItem;

import { useSortable } from '@dnd-kit/sortable';
import { GripVertical } from 'lucide-react';
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
  handleHover?: (hovered: boolean) => void;
};

const SortableItem: React.FC<ComponentProps> = ({
  prefix,
  id,
  children,
  sortType = 'vertical',
  className,
  active,
  hovered,
  handleHover,
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
      className={cn(
        'flex items-center gap-2 relative',
        className,
        isDragging ? 'opacity-[.4]' : '',
        isVertical ? 'flex-row' : 'flex-col border-b-transparent',
      )}
      ref={setNodeRef}
      style={style}
      onMouseEnter={() => handleHover?.(true)}
      onMouseLeave={() => handleHover?.(false)}
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
            <GripVertical className="stroke-gray-500" size={24} />
          </Button>
        </div>
      ) : null}
    </li>
  );
};

export default SortableItem;

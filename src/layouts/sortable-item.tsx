import { useSortable } from '@dnd-kit/sortable';
import { GripVertical } from 'lucide-react';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ComponentProps = {
  id: string;
  children: React.ReactNode;
  active?: boolean;
  prefix?: string;
  className?: string;
};

const SortableItem: React.FC<ComponentProps> = ({
  prefix,
  id,
  children,
  className,
  active,
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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      id={prefix ? `${prefix}-${id}` : id}
      className={cn(className, isDragging ? 'opacity-[.4]' : '')}
      ref={setNodeRef}
      style={style}
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
      {children}
    </li>
  );
};

export default SortableItem;

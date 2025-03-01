import { GripVertical } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Building } from '@/types/builder';
import { useBuilderStore } from '@/store/builder';
import { cn } from '@/lib/utils';

type ComponentProps = {
  building: Building;
};

const BuildingsCardItem: React.FC<ComponentProps> = ({ building }) => {
  const { removeBuilding } = useBuilderStore();

  const {
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
    setNodeRef,
    setActivatorNodeRef,
  } = useSortable({
    id: building.uuid,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      id={`building-card-${building.uuid}`}
      className={`w-full p-2 border rounded hover:bg-gray-50 flex gap-x-2 ${isDragging ? 'opacity-[.4] bg-gray-50' : ''}`}
      ref={setNodeRef}
      style={style}
    >
      <div>
        <Button
          variant="ghost"
          className={cn(
            '!h-auto !p-2',
            isDragging ? 'cursor-grabbing' : 'cursor-grab',
          )}
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
        >
          <GripVertical size={24} />
        </Button>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between gap-x-2">
          <div>{building.name}</div>
          <Button
            variant="ghost"
            className="!h-auto !p-2"
            onClick={() => removeBuilding(building.uuid)}
          >
            <Trash2 size={24} />
          </Button>
        </div>
      </div>
    </li>
  );
};

export default BuildingsCardItem;

import { GripVertical } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Building } from '@/types/builder';
import { useBuilderStore } from '@/store/builder';

type ComponentProps = {
  building: Building;
};

const BuildingsCardItem: React.FC<ComponentProps> = ({ building }) => {
  const { removeBuilding } = useBuilderStore();

  return (
    <li className="w-full p-2 hover:bg-gray-50 flex gap-x-2">
      <div>
        <Button variant="ghost" className="cursor-grab">
          <GripVertical size={24} />
        </Button>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between gap-x-2">
          <div>{building.name}</div>
          <Button variant="ghost" onClick={() => removeBuilding(building.uuid)}>
            <Trash2 size={24} />
          </Button>
        </div>
      </div>
    </li>
  );
};

export default BuildingsCardItem;

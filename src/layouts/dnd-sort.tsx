import {
  closestCenter,
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  SortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';

type ComponentProps = {
  children: React.ReactNode;
  items: UniqueIdentifier[];
  strategy: SortingStrategy;
  renderActiveItem: (item: UniqueIdentifier) => React.ReactNode;
  onDragEndHandler: (sortedItems: UniqueIdentifier[]) => void;
};

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.4',
      },
    },
  }),
};

const DndSort: React.FC<ComponentProps> = ({
  children,
  items,
  strategy,
  renderActiveItem,
  onDragEndHandler,
}) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    setActiveId(active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      // id can be string or number; in our case it's a string
      const oldIndex = items.indexOf(active?.id as string);
      const newIndex = items.indexOf(over?.id as string);

      const sortedItems = arrayMove(items, oldIndex, newIndex);

      onDragEndHandler(sortedItems);
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items} strategy={strategy}>
        {children}
      </SortableContext>
      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeId ? renderActiveItem(activeId) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DndSort;

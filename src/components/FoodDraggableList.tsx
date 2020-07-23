import * as React from 'react';
import { List } from '@material-ui/core';
import { FoodListItem } from '../types';
import { Droppable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import { FoodDraggableItem } from './FoodDraggableItem';

export type FoodDraggableListProps = {
  items: FoodListItem[];
  onItemDoneChange: (itemId: string, checked: boolean) => void;
  onItemMove: (itemId: string, newIndex: number) => void;
  droppableId: string;
  className?: string;
};

export function FoodDraggableList(props: FoodDraggableListProps) {
  const { items, onItemDoneChange, droppableId, onItemMove, className } = props;

  const handleDrag = (result: DropResult) => {
    if (!result.destination) return;

    onItemMove(result.draggableId, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <List
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={className}
          >
            {items.map((item, index) => (
              <FoodDraggableItem
                key={item.id}
                item={item}
                index={index}
                onDoneChange={onItemDoneChange}
              />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}

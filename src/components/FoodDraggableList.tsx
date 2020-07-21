import * as React from 'react';
import {
  makeStyles,
  Theme,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from '@material-ui/core';
import { FoodListItem } from '../types';
import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
} from 'react-beautiful-dnd';
import clsx from 'clsx';

export type FoodDraggableListProps = {
  items: FoodListItem[];
  onItemDoneChange: (itemId: string, checked: boolean) => void;
  onItemMove: (itemId: string, newIndex: number) => void;
  droppableId: string;
  className?: string;
};

const useStyles = makeStyles<Theme, FoodDraggableListProps>((theme) => ({
  item: {
    borderRadius: theme.shape.borderRadius,
  },
  draggingItem: {
    boxShadow: theme.shadows[8],
  },
}));

export function FoodDraggableList(props: FoodDraggableListProps) {
  const classes = useStyles(props);
  const { items, onItemDoneChange, droppableId, onItemMove, className } = props;

  const handleDrag = (result: DropResult) => {
    if (!result.destination) return;

    onItemMove(result.draggableId, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <List
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={className}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(dragProvided, dragSnapshot) => (
                  <ListItem
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    className={clsx(
                      classes.item,
                      dragSnapshot.isDragging && classes.draggingItem,
                    )}
                  >
                    <ListItemIcon>
                      <Checkbox
                        value="done"
                        checked={!!item.done}
                        onChange={(ev) => {
                          onItemDoneChange(item.id, !item.done);
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText>
                      {item.quantity.value} {item.quantity.unit} {item.food}
                    </ListItemText>
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}

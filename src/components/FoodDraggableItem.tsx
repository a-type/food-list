import * as React from 'react';
import { FoodListItem } from '../types';
import { Draggable } from 'react-beautiful-dnd';
import {
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  makeStyles,
  Chip,
} from '@material-ui/core';
import clsx from 'clsx';
import { DragHandle } from '@material-ui/icons';
import pluralize from 'pluralize';
import { toReadableFraction } from 'readable-fractions';
import { OriginalIngredients } from './OriginalIngredients';

function readableQuantity(quantity: number) {
  return toReadableFraction(quantity, true);
}

function pluralizeUnit(unit: string, count: number) {
  if (unit.endsWith('.')) return unit;
  return pluralize(unit, count);
}

export type FoodDraggableItemProps = {
  item: FoodListItem;
  index: number;
  onDoneChange: (id: string, done: boolean) => void;
};

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dragging: {
    boxShadow: theme.shadows[8],
  },
  checkbox: {
    flex: '0 0 auto',
  },
  name: {
    flex: '1',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      flex: '0 0 auto',
    },
  },
  quantity: {
    flex: '0 0 auto',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginRight: 'auto',
    },
  },
  handle: {
    flex: '0 0 auto',
    opacity: 0.5,
    paddingTop: 6,
  },
  originalIngredients: {
    opacity: 0.75,
    marginRight: theme.spacing(2),
  },
}));

export function FoodDraggableItem({
  item,
  index,
  onDoneChange,
}: FoodDraggableItemProps) {
  const classes = useStyles();

  return (
    <Draggable draggableId={item.id} index={index}>
      {(dragProvided, dragSnapshot) => (
        <ListItem
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
          className={clsx(
            classes.root,
            dragSnapshot.isDragging && classes.dragging,
          )}
        >
          <ListItemIcon className={classes.checkbox}>
            <Checkbox
              value="done"
              checked={!!item.done}
              onChange={(ev) => {
                onDoneChange(item.id, !item.done);
              }}
            />
          </ListItemIcon>
          <ListItemText className={classes.name}>{item.food}</ListItemText>
          <Chip
            label={`${readableQuantity(item.quantity.value)} ${
              (item.quantity.unit &&
                pluralizeUnit(item.quantity.unit, item.quantity.value)) ||
              ''
            }`}
            className={classes.quantity}
          />
          <OriginalIngredients
            className={classes.originalIngredients}
            ingredients={item.items}
          />
          <div {...dragProvided.dragHandleProps} className={classes.handle}>
            <DragHandle />
          </div>
        </ListItem>
      )}
    </Draggable>
  );
}

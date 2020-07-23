import * as React from 'react';
import { makeStyles, Theme, Box } from '@material-ui/core';
import { FoodListItem } from '../types';
import { useList } from '../contexts/ListContext';
import { FoodDraggableList } from './FoodDraggableList';

export type FoodListProps = {
  className?: string;
};

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const useStyles = makeStyles<Theme, FoodListProps>((theme) => ({
  doneList: {
    opacity: 0.5,
  },
}));

export function FoodList(props: FoodListProps) {
  const classes = useStyles(props);

  const { list, setList } = useList();

  const onItemDoneChange = React.useCallback(
    (itemId: string, done: boolean) => {
      setList((existing) => {
        const itemIndex = existing.findIndex((group) => group.id === itemId);
        return [
          ...existing.slice(0, itemIndex),
          {
            ...existing[itemIndex],
            done,
          },
          ...existing.slice(itemIndex + 1),
        ].sort((a, b) => (a.done !== b.done ? (a.done ? 1 : -1) : 0));
      });
    },
    [setList],
  );

  const [notDone, done] = list.reduce<[FoodListItem[], FoodListItem[]]>(
    function ([notDoneList, doneList], item) {
      if (item.done) {
        doneList.push(item);
      } else {
        notDoneList.push(item);
      }
      return [notDoneList, doneList];
    },
    [[], []],
  );

  const onNotDoneItemMove = React.useCallback(
    (itemId: string, toIndex: number) => {
      setList((existing) => {
        // find index of original item
        const itemIndex = existing.findIndex((i) => i.id === itemId);
        // find id of notdone item dropped on
        const targetId = notDone[toIndex].id;
        // find index of that in the main list
        const targetIndex = existing.findIndex((i) => i.id === targetId);
        // rearrange
        return reorder(existing, itemIndex, targetIndex);
      });
    },
    [notDone, setList],
  );

  const onDoneItemMove = React.useCallback(
    (itemId: string, toIndex: number) => {
      setList((existing) => {
        // find index of original item
        const itemIndex = existing.findIndex((i) => i.id === itemId);
        // find id of done item dropped on
        const targetId = done[toIndex].id;
        // find index of that in the main list
        const targetIndex = existing.findIndex((i) => i.id === targetId);
        // rearrange
        return reorder(existing, itemIndex, targetIndex);
      });
    },
    [done, setList],
  );

  return (
    <Box {...props}>
      <FoodDraggableList
        items={notDone}
        onItemDoneChange={onItemDoneChange}
        onItemMove={onNotDoneItemMove}
        droppableId="not-done"
      />
      <FoodDraggableList
        items={done}
        onItemDoneChange={onItemDoneChange}
        onItemMove={onDoneItemMove}
        droppableId="done"
        className={classes.doneList}
      />
    </Box>
  );
}

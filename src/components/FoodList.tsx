import * as React from 'react';
import {
  makeStyles,
  Theme,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Box,
} from '@material-ui/core';
import { FoodListItem } from '../types';

export type FoodListProps = {
  list: FoodListItem[];
  onItemDoneChange: (itemId: string, done: boolean) => void;
};

const useStyles = makeStyles<Theme, FoodListProps>((theme) => ({
  doneList: {
    opacity: 0.5,
  },
}));

export function FoodList(props: FoodListProps) {
  const classes = useStyles(props);
  const { list, onItemDoneChange } = props;

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

  return (
    <Box>
      <List>
        {notDone.map((group) => (
          <ListItem key={`${group.id}`}>
            <ListItemIcon>
              <Checkbox
                value="done"
                checked={false}
                onChange={(ev) => {
                  onItemDoneChange(group.id, true);
                }}
              />
            </ListItemIcon>
            <ListItemText>
              {group.quantity.value} {group.quantity.unit} {group.food}
            </ListItemText>
          </ListItem>
        ))}
      </List>
      <List className={classes.doneList}>
        {done.map((group) => (
          <ListItem key={`${group.id}`}>
            <ListItemIcon>
              <Checkbox
                value="done"
                checked={true}
                onChange={(ev) => {
                  onItemDoneChange(group.id, false);
                }}
              />
            </ListItemIcon>
            <ListItemText>
              {group.quantity.value} {group.quantity.unit} {group.food}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

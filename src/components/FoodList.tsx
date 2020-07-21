import * as React from 'react';
import {
  makeStyles,
  Theme,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { MergedGroup } from 'ingredient-merge';

export type FoodListProps = {
  list: MergedGroup[];
};

const useStyles = makeStyles<Theme, FoodListProps>((theme) => ({}));

export function FoodList(props: FoodListProps) {
  const classes = useStyles(props);
  const { list } = props;

  return (
    <List>
      {list.map((group) => (
        <ListItem key={`${group.food}-${group.quantity.unit}`}>
          <ListItemText>
            {group.quantity.value} {group.quantity.unit} {group.food}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
}

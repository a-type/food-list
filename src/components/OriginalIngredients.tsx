import * as React from 'react';
import { ParseResult } from 'ingredient-merge';
import {
  IconButton,
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  DialogTitle,
} from '@material-ui/core';
import { ListAlt } from '@material-ui/icons';

export type OriginalIngredientsProps = {
  ingredients: ParseResult[];
  className?: string;
};

export function OriginalIngredients({
  ingredients,
  className,
}: OriginalIngredientsProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)} className={className}>
        <ListAlt />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md">
        <DialogTitle>Original Ingredients</DialogTitle>
        <DialogContent>
          <List>
            {ingredients.map((ing) => (
              <ListItem key={ing.original}>
                <ListItemText>{ing.original}</ListItemText>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}

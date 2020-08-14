import * as React from 'react';
import { FoodListItem } from '../types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import { useList } from '../contexts/ListContext';

export type FoodItemDetailsProps = {
  item: FoodListItem;
  className?: string;
};

export function FoodItemDetails({ item, className }: FoodItemDetailsProps) {
  const [open, setOpen] = React.useState(false);
  const { editIngredient } = useList();

  const handleEdit = React.useCallback(
    (values: FoodListItem, { setSubmitting }: FormikHelpers<FoodListItem>) => {
      let valueAsNumber =
        values.quantity.value !== null
          ? parseInt((values.quantity.value as any) as string)
          : values.quantity.value;
      if (isNaN(valueAsNumber)) {
        valueAsNumber = 1;
      }
      editIngredient({
        ...values,
        quantity: {
          ...values.quantity,
          value: valueAsNumber,
        },
      });
      setSubmitting(false);
      setOpen(false);
    },
    [editIngredient, setOpen],
  );

  return (
    <>
      <IconButton onClick={() => setOpen(true)} className={className}>
        <MoreVert />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{item.food}</DialogTitle>
        <DialogContent>
          <Box mb={3}>
            <Typography variant="h4">Original ingredients</Typography>
            <List>
              {item.items.map((ing) => (
                <ListItem key={ing.original}>
                  <ListItemText>{ing.original}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box mb={2}>
            <Typography variant="h4">Edit item</Typography>
            <Formik onSubmit={handleEdit} initialValues={item}>
              {({}) => (
                <Form>
                  <div>
                    <Field
                      component={TextField}
                      name="food"
                      label="Name"
                      margin="normal"
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      name="quantity.value"
                      label="Value"
                      margin="normal"
                      type="number"
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      name="quantity.unit"
                      label="Unit"
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

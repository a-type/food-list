import * as React from 'react';
import { TextField } from '@material-ui/core';
import { useList } from '../contexts/ListContext';
import { mergeIngredients } from 'ingredient-merge';
import { FoodListItem } from '../types';
import { useSnackbar } from 'notistack';

export type AddFieldProps = {
  className?: string;
  fullWidth?: boolean;
};

function hasTextContent(str: string) {
  return !!str?.trim().length;
}

export function AddField(props: AddFieldProps) {
  const { setList } = useList();

  const onSubmit = React.useCallback(
    (rawString: string) => {
      const ingredients = rawString.split(/\n/).filter(hasTextContent);

      setList((existing) =>
        mergeIngredients(
          ingredients.filter((i) => !!i.trim()?.length),
          existing,
        ).map((group) => {
          // this could be improved
          const asItem = group as FoodListItem;
          if (asItem.done === undefined) {
            asItem.done = false;
          }
          return asItem;
        }),
      );

      setTimeout(() => {
        setText('');
      }, 0);
    },
    [setList],
  );

  const [text, setText] = React.useState('');

  const handleChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (ev.target.value.match(/\n/)) {
        onSubmit(text);
      } else {
        setText(ev.target.value);
      }
    },
    [onSubmit, text],
  );

  const handleKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>) => {
      if (ev.key === 'Enter') {
        onSubmit(text);
      }
    },
    [text, onSubmit],
  );

  const handlePaste = React.useCallback(
    (e: any) => {
      const text = e.clipboardData.getData('text/plain');
      if (text.match(/\n/)) {
        onSubmit(text);
      }
    },
    [onSubmit],
  );

  const { enqueueSnackbar } = useSnackbar();

  // listening for query params
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.toString());
      const add = url.searchParams.get('add');
      if (add) {
        onSubmit(add);
        window.history.replaceState(null, 'home', '/');
        enqueueSnackbar('Shared items added!', { variant: 'success' });
      }
    }
  }, [enqueueSnackbar, onSubmit]);

  return (
    <TextField
      value={text}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      label="Type or paste ingredients"
      {...props}
    />
  );
}

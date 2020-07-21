import * as React from 'react';
import { makeStyles, Theme, TextField } from '@material-ui/core';
import { useList } from '../contexts/ListContext';
import { mergeIngredients } from 'ingredient-merge';
import { FoodListItem } from '../types';

export type AddFieldProps = {
  className?: string;
};

const useStyles = makeStyles<Theme, AddFieldProps>((theme) => ({}));

function hasTextContent(str: string) {
  return !!str?.trim().length;
}

export function AddField(props: AddFieldProps) {
  const classes = useStyles(props);
  const { ...rest } = props;

  const [_list, setList] = useList();

  const onSubmit = (ingredients: string[]) => {
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
  };

  const [text, setText] = React.useState('');

  const handleChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (ev.target.value.match(/\n/)) {
        onSubmit(text.split(/\n/).filter(hasTextContent));
        setText('');
      } else {
        setText(ev.target.value);
      }
    },
    [onSubmit],
  );

  const handleKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLDivElement>) => {
      if (ev.key === 'Enter') {
        onSubmit(text.split(/\n/).filter(hasTextContent));
        setText('');
      }
    },
    [text, onSubmit],
  );

  const handlePaste = React.useCallback(
    (e: any) => {
      const text = e.clipboardData.getData('text/plain');
      if (text.match(/\n/)) {
        onSubmit(text.split(/\n/).filter(hasTextContent));
        setTimeout(() => {
          setText('');
        }, 0);
      }
    },
    [onSubmit],
  );

  return (
    <TextField
      value={text}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      label="Type or paste ingredients"
      {...rest}
    />
  );
}

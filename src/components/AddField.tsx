import * as React from 'react';
import { TextField } from '@material-ui/core';
import { useList } from '../contexts/ListContext';
import { useSnackbar } from 'notistack';

export type AddFieldProps = {
  className?: string;
  fullWidth?: boolean;
};

function hasTextContent(str: string) {
  return !!str?.trim().length;
}

export function AddField(props: AddFieldProps) {
  const { addIngredients } = useList();

  const onSubmit = React.useCallback(
    (rawString: string) => {
      const ingredients = rawString.split(/\n/).filter(hasTextContent);

      addIngredients(ingredients);

      setTimeout(() => {
        setText('');
      }, 0);
    },
    [addIngredients],
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
      placeholder="1 1/2 c chopped red onion"
      {...props}
    />
  );
}

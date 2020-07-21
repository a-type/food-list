import * as React from 'react';
import {
  makeStyles,
  Theme,
  TextField,
  OutlinedTextFieldProps,
} from '@material-ui/core';

export type AddFieldProps = {
  onAdd: (ingredients: string[]) => void;
  className?: string;
};

const useStyles = makeStyles<Theme, AddFieldProps>((theme) => ({}));

function hasTextContent(str: string) {
  return !!str?.trim().length;
}

export function AddField(props: AddFieldProps) {
  const classes = useStyles(props);
  const { onAdd: onSubmit, ...rest } = props;

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

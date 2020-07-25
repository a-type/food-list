import * as React from 'react';

export function useToggle(
  initial?: boolean,
  { onOn, onOff }: { onOn?: () => void; onOff?: () => void } = {},
) {
  const [on, setOn] = React.useState(!!initial);
  const toggle = React.useCallback(
    (newState?: boolean | any) => {
      if (typeof newState === 'boolean') {
        setOn(newState);
        if (newState) {
          onOn?.();
        } else {
          onOff?.();
        }
      } else {
        setOn((current) => {
          if (!current) {
            onOn?.();
          } else {
            onOff?.();
          }
          return !current;
        });
      }
    },
    [setOn, onOn, onOff],
  );
  return [on, toggle] as const;
}

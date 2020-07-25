import * as React from 'react';

export function useToggle(
  initial?: boolean,
  config?: { onOn?: () => void; onOff?: () => void },
) {
  const [on, setOn] = React.useState(!!initial);
  const toggle = React.useCallback(
    (newState?: boolean | any) => {
      if (typeof newState === 'boolean') {
        setOn(newState);
        if (newState) {
          config?.onOn?.();
        } else {
          config?.onOff?.();
        }
      } else {
        setOn((current) => {
          if (!current) {
            config?.onOn?.();
          } else {
            config?.onOff?.();
          }
          return !current;
        });
      }
    },
    [setOn, config],
  );
  return [on, toggle] as const;
}

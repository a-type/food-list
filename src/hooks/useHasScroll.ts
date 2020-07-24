import * as React from 'react';
import { debounce } from '@material-ui/core';

export function useHasScroll<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [[scrollAbove, scrollBelow], setHasScroll] = React.useState<
    [boolean, boolean]
  >([false, false]);

  React.useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    function update(el: T) {
      const canScroll = el.scrollHeight > el.clientHeight;
      if (!canScroll) {
        setHasScroll([false, false]);
      } else {
        const hasAbove = el.scrollTop > 0;
        const hasBelow = el.scrollTop + el.clientHeight < el.scrollHeight;
        setHasScroll([hasAbove, hasBelow]);
      }
    }

    const obs = new MutationObserver((entries) => {
      for (let entry of entries) {
        const el = entry.target as T;
        update(el);
      }
    });

    obs.observe(element, {
      childList: true,
    });

    update(element);

    const debouncedUpdate = debounce(() => {
      if (ref.current) update(ref.current);
    }, 100);

    element.addEventListener('scroll', debouncedUpdate);

    return () => {
      obs.disconnect();
      element?.removeEventListener('scroll', debouncedUpdate);
    };
  }, []);

  return [ref, { above: scrollAbove, below: scrollBelow }] as const;
}

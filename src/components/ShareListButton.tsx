import * as React from 'react';
import { useList } from '../contexts/ListContext';
import { useCopyList } from '../hooks/useCopyList';
import { Button } from '@material-ui/core';
import { Share } from '@material-ui/icons';

export function ShareListButton() {
  const { getOriginalIngredients } = useList();
  const { copy: copyIngredients } = useCopyList();

  const share = React.useCallback(async () => {
    // @ts-ignore
    if (navigator.share) {
      // @ts-ignore
      navigator.share({
        text: getOriginalIngredients().join('\n'),
      });
    } else {
      await copyIngredients();
    }
  }, [getOriginalIngredients, copyIngredients]);

  return (
    <Button variant="text" startIcon={<Share />} onClick={share}>
      Share your list
    </Button>
  );
}

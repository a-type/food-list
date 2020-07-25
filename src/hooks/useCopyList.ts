import * as React from 'react';
import { useList } from '../contexts/ListContext';
import useCopy from '@react-hook/copy';
import { useSnackbar } from 'notistack';

export function useCopyList(onDone?: () => void) {
  const { enqueueSnackbar } = useSnackbar();
  const { getOriginalIngredients } = useList();

  const memoizedIngredients = React.useMemo(() => {
    return getOriginalIngredients().join('\n');
  }, [getOriginalIngredients]);
  const { copy, ...rest } = useCopy(memoizedIngredients);
  const handleCopy = async () => {
    await copy();
    enqueueSnackbar('Copied all ingredients!', {
      variant: 'success',
      persist: true,
    });
    onDone?.();
  };

  return {
    copy: handleCopy,
    ...rest,
  };
}

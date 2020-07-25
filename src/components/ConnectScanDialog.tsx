import * as React from 'react';
import { useBugout } from '../contexts/BugoutContext';
import { Dialog, DialogContent } from '@material-ui/core';
import QrReader from 'react-qr-reader';
import { useSnackbar } from 'notistack';
import { useList } from '../contexts/ListContext';

export function ConnectScanDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { enqueueSnackbar } = useSnackbar();

  const { addIngredients } = useList();
  const { get, connect } = useBugout();

  const handleError = React.useCallback(
    (error: Error) => {
      console.error(error);
      enqueueSnackbar('Something went wrong while scanning', {
        variant: 'error',
      });
    },
    [enqueueSnackbar],
  );

  const handleScan = React.useCallback(
    (data: any) => {
      connect(data);
      get().rpc('requestList', null, ({ list }) => {
        addIngredients(list);
      });
    },
    [connect, get, addIngredients],
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <QrReader delay={300} onError={handleError} onScan={handleScan} />
      </DialogContent>
    </Dialog>
  );
}

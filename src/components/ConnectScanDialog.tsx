import * as React from 'react';
import { useBugout } from '../contexts/BugoutContext';
import {
  Dialog,
  DialogContent,
  Typography,
  CircularProgress,
  Box,
  Button,
} from '@material-ui/core';
import QrReader from 'react-qr-reader';
import { useSnackbar } from 'notistack';
import { useList } from '../contexts/ListContext';
import { ShareListButton } from './ShareListButton';
import { Refresh, Check } from '@material-ui/icons';

type ConnectStage = 'scan' | 'error' | 'transfer' | 'choice' | 'done';

export function ConnectScanDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { enqueueSnackbar } = useSnackbar();

  const [stage, setStage] = React.useState<ConnectStage>('scan');
  const [scannedData, setScannedData] = React.useState('');
  const [transferredList, setTransferredList] = React.useState<string[]>([]);

  const { addIngredients, replaceIngredients } = useList();
  const { connect } = useBugout();

  const handleError = React.useCallback(
    (error: Error) => {
      setStage('error');
      console.error(error);
    },
    [enqueueSnackbar, setStage],
  );

  // state transition effects
  React.useEffect(() => {
    if (stage === 'error') {
      enqueueSnackbar('Something went wrong while connecting', {
        variant: 'error',
      });
    } else if (stage === 'transfer') {
      if (!scannedData) return;
      (async () => {
        const timeout = window.setTimeout(() => {
          handleError(new Error("Sorry, we couldn't connect."));
        }, 60 * 1000);
        try {
          const bugout = await connect(scannedData);
          bugout.rpc('requestList', null, ({ list: newItems }) => {
            setTransferredList(newItems);
            setStage('choice');
            window.clearTimeout(timeout);
          });
        } catch (err) {
          handleError(err);
        }
      })();
    } else if (stage === 'done') {
      enqueueSnackbar('Transfer complete', {
        variant: 'success',
      });
      onClose();
    }
  }, [
    stage,
    enqueueSnackbar,
    onClose,
    connect,
    setTransferredList,
    setStage,
    handleError,
  ]);

  const handleScan = React.useCallback(
    (data: string) => {
      if (data) {
        setScannedData(data);
        setStage('transfer');
      }
    },
    [setScannedData, setStage],
  );

  const replaceList = React.useCallback(() => {
    replaceIngredients(transferredList);
    setStage('done');
  }, [replaceIngredients, transferredList, setStage]);

  const addList = React.useCallback(() => {
    addIngredients(transferredList);
    setStage('done');
  }, [addIngredients, transferredList, setStage]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent>
        {stage === 'scan' && (
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
            facingMode="environment"
          />
        )}
        {stage === 'transfer' && (
          <Box>
            <CircularProgress style={{ alignSelf: 'center' }} />
            <Typography>
              Connecting to device. This could take a moment.
            </Typography>
          </Box>
        )}
        {stage === 'choice' && (
          <Box>
            <Typography gutterBottom>
              What would you like to do with this list?
            </Typography>
            <Box display="flex" flexDirection="row">
              <Button onClick={replaceList} style={{ marginRight: 8 }}>
                Replace mine
              </Button>
              <Button onClick={addList}>Add to mine</Button>
            </Box>
          </Box>
        )}
        {stage === 'error' && (
          <Box>
            Sorry, we couldn't connect devices. You can try again in a moment,
            or just share your list directly to someone else.
            <ShareListButton />
            <Button
              variant="text"
              startIcon={<Refresh />}
              onClick={() => setScannedData('')}
            >
              Retry
            </Button>
          </Box>
        )}
        {stage === 'done' && (
          <Box alignItems="center" p={2}>
            <Check color="primary" fontSize="large" />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

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
  const [transferredList, setTransferredList] = React.useState<string[]>([]);

  const { addIngredients, replaceIngredients } = useList();
  const { connect } = useBugout();

  const handleError = React.useCallback(
    (error: Error) => {
      setStage('error');
      console.error(error);
      enqueueSnackbar('Something went wrong while connecting', {
        variant: 'error',
      });
    },
    [setStage, enqueueSnackbar],
  );

  const handleScan = React.useCallback(
    async (data: string) => {
      if (data) {
        setStage('transfer');

        const timeout = window.setTimeout(() => {
          handleError(new Error("Sorry, we couldn't connect."));
        }, 45 * 1000);
        try {
          console.debug(`Connecting to: ${data}`);
          const bugout = await connect(data);
          console.debug(`Requesting list`);
          bugout.rpc('requestList', null, ({ list: newItems }) => {
            setTransferredList(newItems);
            console.debug(`Received: ${newItems.join(',')}`);
            setStage('choice');
            window.clearTimeout(timeout);
          });
        } catch (err) {
          handleError(err);
        }
      }
    },
    [setStage, handleError, setTransferredList, connect],
  );

  const replaceList = React.useCallback(() => {
    replaceIngredients(transferredList);
    setStage('done');
    enqueueSnackbar('Transfer complete', {
      variant: 'success',
    });
    onClose();
  }, [replaceIngredients, transferredList, setStage, enqueueSnackbar, onClose]);

  const addList = React.useCallback(() => {
    addIngredients(transferredList);
    setStage('done');
    enqueueSnackbar('Transfer complete', {
      variant: 'success',
    });
    onClose();
  }, [addIngredients, transferredList, setStage, enqueueSnackbar, onClose]);

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
            <Typography>
              Sorry, we couldn't connect devices. You can try again in a moment,
              or just share your list directly to someone else.
            </Typography>
            <ShareListButton />
            <Button
              variant="text"
              startIcon={<Refresh />}
              onClick={() => setStage('scan')}
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

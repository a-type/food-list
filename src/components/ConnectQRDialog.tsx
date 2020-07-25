import * as React from 'react';
import { Dialog, DialogContent, Typography } from '@material-ui/core';
import QRCode from 'qrcode.react';
import { useBugout } from '../contexts/BugoutContext';
import useMeasure from 'react-use-measure';
import { useSnackbar } from 'notistack';

export function ConnectQRDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { serve, get } = useBugout();
  const [connected, setConnected] = React.useState(false);

  React.useEffect(() => {
    if (!connected) {
      (async () => {
        const bugout = await serve();
        bugout.on('seen', () => {
          setConnected(true);
        });
        bugout.on('rpc', () => {
          setConnected(true);
        });
      })();
    }
  }, [serve, setConnected, connected]);

  React.useEffect(() => {
    if (connected) {
      enqueueSnackbar('Connected to device');
      onClose();
    }
  }, [connected, onClose, enqueueSnackbar]);

  const [ref, size] = useMeasure();

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogContent>
        <div style={{ width: '100%' }} ref={ref}>
          <QRCode
            value={get()?.address()}
            style={{ width: size.width, height: size.width }}
            size={size.width}
            includeMargin
          />
        </div>
        <Typography>
          Open up Food List on another device and scan this code to sync!
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

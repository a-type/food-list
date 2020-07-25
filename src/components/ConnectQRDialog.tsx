import * as React from 'react';
import { Dialog, DialogContent, Typography } from '@material-ui/core';
import QRCode from 'qrcode.react';
import { useBugout } from '../contexts/BugoutContext';

export function ConnectQRDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { serve, get } = useBugout();

  React.useEffect(() => {
    serve();
  }, [serve]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <QRCode
          value={get()?.address()}
          style={{ width: '50vw', height: '50vw' }}
          size={256}
          includeMargin
        />
        <Typography>
          Open up Food List on another device and scan this code to sync!
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

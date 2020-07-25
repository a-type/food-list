import * as React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { ConnectScanDialog } from './ConnectScanDialog';
import { ConnectQRDialog } from './ConnectQRDialog';
import { useToggle } from '../hooks/useToggle';
import { GetApp, Publish } from '@material-ui/icons';

export function DevicesMenu({ onClose }: { onClose?: () => void }) {
  const [showScan, toggleScan] = useToggle(false, {
    onOff: onClose,
  });
  const [showQr, toggleQr] = useToggle(false, {
    onOff: onClose,
  });

  return (
    <>
      <List>
        <ListItem button onClick={toggleScan}>
          <ListItemAvatar>
            <GetApp />
          </ListItemAvatar>
          <ListItemText
            primary="Read list"
            secondary="Receive a list from another device"
          />
        </ListItem>
        <ListItem button onClick={toggleQr}>
          <ListItemAvatar>
            <Publish />
          </ListItemAvatar>
          <ListItemText
            primary="Share list"
            secondary="Send a list to another device"
          />
        </ListItem>
      </List>
      <ConnectScanDialog open={showScan} onClose={toggleScan} />
      <ConnectQRDialog open={showQr} onClose={toggleQr} />
    </>
  );
}

import * as React from 'react';
import { IconButton, MenuItem, Menu, Button } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useList } from '../contexts/ListContext';
import useCopy from '@react-hook/copy';
import { useSnackbar } from 'notistack';
import { ConnectQRDialog } from './ConnectQRDialog';
import { ConnectScanDialog } from './ConnectScanDialog';

export function ListMenu() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { list, setList, getOriginalIngredients } = useList();

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleOpen = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const clearChecked = () => {
    setList((current) => current.filter((i) => !i.done));
    handleClose();
  };

  const memoizedIngredients = React.useMemo(() => {
    return getOriginalIngredients().join('\n');
  }, [getOriginalIngredients]);
  const { copied, copy } = useCopy(memoizedIngredients);
  const handleCopy = async () => {
    await copy();
    enqueueSnackbar('Copied all ingredients!', {
      variant: 'success',
      persist: true,
    });
    handleClose();
  };

  const clearAll = () => {
    const current = list;
    const undo = () => setList(current);
    setList([]);
    enqueueSnackbar('Cleared the list.', {
      action: (key) => (
        <Button
          variant="text"
          onClick={() => {
            undo();
            closeSnackbar(key);
          }}
          color="primary"
        >
          Undo
        </Button>
      ),
    });
    handleClose();
  };

  const [qrOpen, setQROpen] = React.useState(false);
  const handleQROpen = () => {
    setQROpen(true);
    handleClose();
  };

  const [connectOpen, setConnectOpen] = React.useState(false);
  const handleConnectOpen = () => {
    setConnectOpen(true);
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-controls="list-menu"
        aria-haspopup="true"
        onClick={handleOpen}
        color="inherit"
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="list-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={clearChecked}>Clear checked</MenuItem>
        <MenuItem onClick={clearAll}>Clear all</MenuItem>
        <MenuItem onClick={handleCopy}>
          {copied ? 'Copied' : 'Copy list'}
        </MenuItem>
        <MenuItem onClick={handleQROpen}>Sync to device</MenuItem>
        <MenuItem onClick={handleConnectOpen}>Sync from device</MenuItem>
      </Menu>
      <ConnectQRDialog open={qrOpen} onClose={() => setQROpen(false)} />
      <ConnectScanDialog
        open={connectOpen}
        onClose={() => setConnectOpen(false)}
      />
    </>
  );
}

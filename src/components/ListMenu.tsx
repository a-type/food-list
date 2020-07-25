import * as React from 'react';
import { IconButton, MenuItem, Menu, Button, Box } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useList } from '../contexts/ListContext';
import { useSnackbar } from 'notistack';
import { useCopyList } from '../hooks/useCopyList';

export function ListMenu() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { list, setList } = useList();

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleOpen = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const clearChecked = () => {
    setList((current) => current.filter((i) => !i.done));
    handleClose();
  };

  const { copy: handleCopy, copied } = useCopyList();

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

  return (
    <Box display="flex" flexDirection="row">
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
      </Menu>
    </Box>
  );
}

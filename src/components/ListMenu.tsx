import * as React from 'react';
import { IconButton, MenuItem, Menu } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { useList } from '../contexts/ListContext';

export type ListMenuProps = {};

export function ListMenu(props: ListMenuProps) {
  const { setList } = useList();

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleOpen = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const clearChecked = () => {
    setList((current) => current.filter((i) => !i.done));
  };

  return (
    <>
      <IconButton
        aria-controls="list-menu"
        aria-haspopup="true"
        onClick={handleOpen}
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
      </Menu>
    </>
  );
}

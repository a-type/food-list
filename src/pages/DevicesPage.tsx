import * as React from 'react';
import { makeStyles, Box, IconButton, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import { DevicesMenu } from '../components/DevicesMenu';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    fontSize: theme.typography.pxToRem(18),
  },
}));

export function DevicesPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box display="flex" flexDirection="row" alignItems="center" p={1}>
        <Link component={IconButton} to="/" color="inherit">
          <ArrowBack />
        </Link>
        <Typography variant="h1" className={classes.title}>
          Devices
        </Typography>
      </Box>
      <DevicesMenu />
    </div>
  );
}

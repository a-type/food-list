import * as React from 'react';
import {
  Typography,
  Container,
  makeStyles,
  Box,
  Paper,
  IconButton,
  Drawer,
} from '@material-ui/core';
import { AddField } from '../components/AddField';
import { FoodList } from '../components/FoodList';
import { ListMenu } from '../components/ListMenu';
import { colors } from '../theme/colors';
import { Background } from '../components/Background';
import { FoodListScrollContainer } from '../components/FoodListScrollContainer';
import { useToggle } from '../hooks/useToggle';
import { Devices } from '@material-ui/icons';
import { DevicesMenu } from '../components/DevicesMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
    color: colors.purple[600],
  },
  container: {
    height: '100vh',
    position: 'relative',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5),
    },
  },
  addField: {
    padding: theme.spacing(2),
  },
  foodList: {
    flex: 1,
  },
  foodListContainer: {
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopWidth: 4,
    borderTopColor: theme.palette.background.paper,
    borderTopStyle: 'solid',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    color: theme.palette.text.primary,
    overflow: 'hidden',
  },
  title: {
    flex: 1,
    fontFamily: 'Pacifico, "Open Sans", "Roboto", Arial, Helvetica, sans-serif',
  },
}));

export function ListPage() {
  const classes = useStyles();

  const [devicesPaneOpen, toggleDevicesPane] = useToggle();

  return (
    <div className={classes.root}>
      <Background />
      <Container maxWidth="md" className={classes.container}>
        <Box display="flex" flexDirection="column" height="100%" pt={2}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            mb={2}
            px={1}
          >
            <Typography variant="h1" className={classes.title}>
              Food List
            </Typography>
            <IconButton onClick={toggleDevicesPane} color="inherit">
              <Devices />
            </IconButton>
            <ListMenu />
          </Box>
          <Paper className={classes.foodListContainer}>
            <FoodListScrollContainer className={classes.foodList}>
              <FoodList />
            </FoodListScrollContainer>
            <Box p={2}>
              <AddField fullWidth />
            </Box>
          </Paper>
        </Box>
      </Container>
      <Drawer
        open={devicesPaneOpen}
        anchor="bottom"
        onClose={toggleDevicesPane}
      >
        <DevicesMenu onClose={toggleDevicesPane} />
      </Drawer>
    </div>
  );
}

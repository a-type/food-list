import * as React from 'react';
import {
  Typography,
  Container,
  makeStyles,
  Box,
  Paper,
} from '@material-ui/core';
import { AddField } from './components/AddField';
import { FoodList } from './components/FoodList';
import { ListMenu } from './components/ListMenu';
import { colors } from './theme/colors';
import { Background } from './components/Background';

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
      padding: 0,
    },
  },
  addField: {
    padding: theme.spacing(2),
  },
  foodList: {
    flex: 1,
    overflow: 'auto',
  },
  foodListContainer: {
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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

function App() {
  const classes = useStyles();

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
            <ListMenu />
          </Box>
          <Paper className={classes.foodListContainer}>
            <Box flex={1} className={classes.foodList}>
              <FoodList />
            </Box>
            <Box p={2}>
              <AddField fullWidth />
            </Box>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default App;

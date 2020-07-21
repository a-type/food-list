import * as React from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Typography,
  Container,
  makeStyles,
  Box,
} from '@material-ui/core';
import { lightTheme } from './theme/theme';
import { AddField } from './components/AddField';
import { FoodList } from './components/FoodList';
import { ListMenu } from './components/ListMenu';
import { InstallPrompt } from './components/InstallPrompt';

const useStyles = makeStyles((theme) => ({
  addField: {
    position: 'fixed',
    bottom: theme.spacing(2),
    width: '800px',
    maxWidth: '90vw',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  title: {
    flex: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div className="App">
        <Container maxWidth="md">
          <InstallPrompt />
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography variant="h1" className={classes.title}>
              Food List
            </Typography>
            <ListMenu />
          </Box>
          <AddField className={classes.addField} />
          <FoodList />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

import React, { useState } from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Typography,
  Container,
  makeStyles,
} from '@material-ui/core';
import { lightTheme } from './theme/theme';
import { AddField } from './components/AddField';
import { mergeIngredients, MergedGroup } from 'ingredient-merge';
import { FoodList } from './components/FoodList';

const useStyles = makeStyles((theme) => ({
  addField: {
    position: 'fixed',
    bottom: theme.spacing(2),
    width: '800px',
    maxWidth: '90vw',
    left: '50%',
    transform: 'translateX(-50%)',
  },
}));

function App() {
  const classes = useStyles();

  const [list, setList] = useState<MergedGroup[]>([]);
  // const setList = useSetRecoilState(listState);

  const addIngredients = (ingredients: string[]) => {
    console.log(ingredients);
    setList((existing) =>
      mergeIngredients(
        ingredients.filter((i) => !!i.trim()?.length),
        existing,
      ),
    );
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div className="App">
        <Container maxWidth="md">
          <Typography variant="h1">Food List</Typography>
          <AddField onAdd={addIngredients} className={classes.addField} />
          <FoodList list={list} />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

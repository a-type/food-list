import * as React from 'react';
import {
  ThemeProvider,
  CssBaseline,
  Typography,
  Container,
  makeStyles,
} from '@material-ui/core';
import { lightTheme } from './theme/theme';
import { AddField } from './components/AddField';
import { mergeIngredients } from 'ingredient-merge';
import { FoodList } from './components/FoodList';
import { loadList, saveList } from './storage/listStorage';
import { FoodListItem } from './types';

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

  const [list, setList] = React.useState<FoodListItem[]>(() => loadList());

  React.useEffect(() => {
    saveList(list);
  }, [list]);

  const addIngredients = (ingredients: string[]) => {
    setList((existing) =>
      mergeIngredients(
        ingredients.filter((i) => !!i.trim()?.length),
        existing,
      ).map((group) => {
        // this could be improved
        const asItem = group as FoodListItem;
        if (asItem.done === undefined) {
          asItem.done = false;
        }
        return asItem;
      }),
    );
  };

  const onItemDoneChange = React.useCallback(
    (itemId: string, done: boolean) => {
      setList((existing) => {
        console.log(`mark ${itemId} done ${done}`);
        const itemIndex = existing.findIndex((group) => group.id === itemId);
        return [
          ...existing.slice(0, itemIndex),
          {
            ...existing[itemIndex],
            done,
          },
          ...existing.slice(itemIndex + 1),
        ];
      });
    },
    [],
  );

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div className="App">
        <Container maxWidth="md">
          <Typography variant="h1">Food List</Typography>
          <AddField onAdd={addIngredients} className={classes.addField} />
          <FoodList list={list} onItemDoneChange={onItemDoneChange} />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

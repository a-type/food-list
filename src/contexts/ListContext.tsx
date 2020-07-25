import * as React from 'react';
import { FoodListItem } from '../types';
import { loadList, saveList } from '../storage/listStorage';
import { mergeIngredients } from 'ingredient-merge';

export const ListContext = React.createContext<{
  list: FoodListItem[];
  setList: React.Dispatch<React.SetStateAction<FoodListItem[]>>;
  addIngredients: (ingredients: string[]) => void;
  getOriginalIngredients: () => string[];
}>({
  list: [],
  setList: () => [],
  addIngredients: () => {},
  getOriginalIngredients: () => [],
});

export function ListProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = React.useState<FoodListItem[]>(() => loadList());

  React.useEffect(() => {
    saveList(list);
  }, [list]);

  const addIngredients = React.useCallback(
    (ingredients: string[]) => {
      setList((existing) =>
        mergeIngredients(
          ingredients.filter((i) => !!i.trim()?.length),
          existing,
        ).map((group) => {
          const asItem = group as FoodListItem;
          if (asItem.done === undefined) {
            asItem.done = false;
          }
          return asItem;
        }),
      );
    },
    [setList],
  );

  const getOriginalIngredients = React.useCallback(() => {
    return list.reduce<string[]>((items, group) => {
      return items.concat(group.items.map((i) => i.original));
    }, []);
  }, [list]);

  return (
    <ListContext.Provider
      value={{ list, setList, addIngredients, getOriginalIngredients }}
    >
      {children}
    </ListContext.Provider>
  );
}

export function useList() {
  return React.useContext(ListContext);
}

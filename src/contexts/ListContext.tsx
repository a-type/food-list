import * as React from 'react';
import { FoodListItem } from '../types';
import { loadList, saveList } from '../storage/listStorage';
import { mergeIngredients } from 'ingredient-merge';
import { mergeGroupToListItem } from '../utils/mergeGroupToListItem';

export const ListContext = React.createContext<{
  list: FoodListItem[];
  setList: React.Dispatch<React.SetStateAction<FoodListItem[]>>;
  addIngredients: (ingredients: string[]) => void;
  replaceIngredients: (ingredients: string[]) => void;
  getOriginalIngredients: () => string[];
  editIngredient: (item: FoodListItem) => void;
}>({
  list: [],
  setList: () => [],
  addIngredients: () => {},
  replaceIngredients: () => {},
  getOriginalIngredients: () => [],
  editIngredient: () => {},
});

export function ListProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = React.useState<FoodListItem[]>(() => loadList());

  React.useEffect(() => {
    saveList(list);
  }, [list]);

  const addIngredients = React.useCallback(
    (ingredients: string[]) => {
      if (!ingredients) return;
      setList((existing) =>
        mergeIngredients(
          ingredients.filter((i) => !!i.trim()?.length),
          existing,
        ).map(mergeGroupToListItem),
      );
    },
    [setList],
  );

  const replaceIngredients = React.useCallback(
    (ingredients: string[]) => {
      setList(
        mergeIngredients(
          (ingredients || []).filter((i) => !!i.trim()?.length),
        ).map(mergeGroupToListItem),
      );
    },
    [setList],
  );

  const getOriginalIngredients = React.useCallback(() => {
    return list.reduce<string[]>((items, group) => {
      return items.concat(group.items.map((i) => i.original));
    }, []);
  }, [list]);

  const editIngredient = React.useCallback((item: FoodListItem) => {
    setList((existing) => {
      const index = existing.findIndex((i) => i.id === item.id);
      existing.splice(index, 1, item);
      return [...existing];
    });
  }, []);

  return (
    <ListContext.Provider
      value={{
        list,
        setList,
        addIngredients,
        getOriginalIngredients,
        replaceIngredients,
        editIngredient,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}

export function useList() {
  return React.useContext(ListContext);
}

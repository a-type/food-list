import * as React from 'react';
import { FoodListItem } from '../types';
import { loadList, saveList } from '../storage/listStorage';

export const ListContext = React.createContext<{
  list: FoodListItem[];
  setList: React.Dispatch<React.SetStateAction<FoodListItem[]>>;
}>({
  list: [],
  setList: () => [],
});

export function ListProvider({ children }: { children: React.ReactNode }) {
  const [list, setList] = React.useState<FoodListItem[]>(() => loadList());

  React.useEffect(() => {
    saveList(list);
  }, [list]);

  return (
    <ListContext.Provider value={{ list, setList }}>
      {children}
    </ListContext.Provider>
  );
}

export function useList() {
  const ctx = React.useContext(ListContext);
  return [ctx.list, ctx.setList] as const;
}

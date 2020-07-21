import { FoodListItem } from '../types';

const localStorageKey = 'food-list-list';

export function loadList(): FoodListItem[] {
  const raw = localStorage.getItem(localStorageKey);
  if (!raw) return [];

  try {
    const data = JSON.parse(raw);
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export function saveList(list: FoodListItem[]) {
  localStorage.setItem(localStorageKey, JSON.stringify(list));
}

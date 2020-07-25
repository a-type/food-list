import { MergedGroup } from 'ingredient-merge';
import { FoodListItem } from '../types';

export function mergeGroupToListItem(group: MergedGroup) {
  const asItem = group as FoodListItem;
  if (asItem.done === undefined) {
    asItem.done = false;
  }
  return asItem;
}

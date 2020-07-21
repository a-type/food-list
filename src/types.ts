import { MergedGroup } from 'ingredient-merge';

export type FoodListItem = MergedGroup & {
  done: boolean;
};

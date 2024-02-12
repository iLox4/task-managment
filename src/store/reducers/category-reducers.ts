import { Category } from "../category-context";

export const addCategoryReducer = (
  state: Category[],
  category: Category
): Category[] => {
  const id = String(Math.round(Math.random() * 100));
  const newCategory = { ...category, id };

  return [...state, newCategory];
};

export const updateCategoryReducer = (
  state: Category[],
  category: Category
): Category[] => {
  const categoryIdx = state.findIndex((el) => el.id === category.id);
  const newCategories = [...state];

  newCategories[categoryIdx] = category;

  return newCategories;
};

export const deleteCategoryReducer = (
  state: Category[],
  category: Category
): Category[] => {
  //TODO: Add removing tasks that are in that category
  return state.filter((el) => el.id !== category.id);
};

import { ReactElement, createContext, useReducer } from "react";

import { DUMMY_CATEGORIES } from "../dummy-data/dummy-categories";
import {
  addCategoryReducer,
  updateCategoryReducer,
  deleteCategoryReducer,
} from "./reducers/category-reducers";

export type Category = {
  id?: string;
  category: string;
  color: string;
};

type CategoryContext = {
  categories: Category[];
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (category: Category) => void;
  getCategoryById: (id: string) => Category;
};

type Action = {
  type: string;
  payload: {
    category: Category;
  };
};
type ReducerFunction = (state: Category[], action: Action) => Category[];

type DispatchTypes = "CATEGORY_ADD" | "CATEGORY_UPDATE" | "CATEGORY_DELETE";

const categoryListReducer = (state: Category[], action: Action): Category[] => {
  console.log(action);
  if (action.type === "CATEGORY_ADD") {
    return addCategoryReducer(state, action.payload.category);
  }

  if (action.type === "CATEGORY_UPDATE" && action.payload.category.id) {
    return updateCategoryReducer(state, action.payload.category);
  }

  if (action.type === "CATEGORY_DELETE" && action.payload.category.id) {
    return deleteCategoryReducer(state, action.payload.category);
  }

  return state;
};

export const CategoryContext = createContext<CategoryContext>({
  categories: [],
  addCategory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
  getCategoryById: () => ({
    id: "0",
    color: "#ffffff",
    category: "dummy",
  }),
});

export default function CategoryContextProvider({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  const [categoryList, categoryListDispatch] = useReducer<
    ReducerFunction,
    Category[]
  >(
    categoryListReducer,
    DUMMY_CATEGORIES,
    (categories: Category[]) => categories
  );

  const handleDispatchCategory = (
    type: DispatchTypes,
    category: Category
  ): void => {
    categoryListDispatch({
      type,
      payload: {
        category,
      },
    });
  };

  const handleFindCategory = (id: string): Category => {
    const category = categoryList.find((category) => category.id === id);

    if (!category) {
      throw new Error("Could not find the category");
    }

    return category;
  };

  const ctxValue: CategoryContext = {
    categories: categoryList,
    addCategory: (category: Category) =>
      handleDispatchCategory("CATEGORY_ADD", category),
    updateCategory: (category: Category) =>
      handleDispatchCategory("CATEGORY_UPDATE", category),
    deleteCategory: (category: Category) =>
      handleDispatchCategory("CATEGORY_DELETE", category),
    getCategoryById: handleFindCategory,
  };

  return (
    <CategoryContext.Provider value={ctxValue}>
      {children}
    </CategoryContext.Provider>
  );
}

import { useFetchAllCategoriesQuery } from "../redux/features/categories/categoryApi";

;

export function useCategories() {
  const { data, isLoading:isCategoryLoading, error } = useFetchAllCategoriesQuery();

  return {
    categories: data?.data || [],
    isCategoryLoading,
    error,
  };
}

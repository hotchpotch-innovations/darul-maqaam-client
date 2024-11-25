"use client";

import { useGetAllCategoriesQuery } from "@/redux/api/content/categoryApi";
import { TResponseDataObj } from "@/types";

export type TCategoryQueryObj = {
  type?: string;
  limit?: number | 50;
  page?: number | 1;
};

export const useDesignationOptions = (queryObj: TCategoryQueryObj = {}) => {
  const { data, isLoading } = useGetAllCategoriesQuery(queryObj);

  const categoryData = data as TResponseDataObj;
  const category_data = categoryData?.data?.data || [];

  let category_options = [];
  if (!!category_data) {
    category_options = category_data?.map((item: Record<string, any>) => {
      return {
        label: item?.title,
        value: item?.id,
      };
    });
  }
  return {
    options: category_options,
    isLoading,
  };
};

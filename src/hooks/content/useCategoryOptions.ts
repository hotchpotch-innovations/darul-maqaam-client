"use client";
import { useGetAllPublicCommonCategoryQuery } from "@/redux/api/content/commonCategoryApi";
import { TResponseDataObj } from "@/types";

export type TCategoryQueryObj = {
  type?: string;
  limit?: number | 20;
  page?: number | 1;
};

export const useCategoryOptions = (queryObj: TCategoryQueryObj = {}) => {
  const { data, isLoading } = useGetAllPublicCommonCategoryQuery(queryObj);

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

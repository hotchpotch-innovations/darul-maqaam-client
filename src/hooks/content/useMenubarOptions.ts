"use client";
import { useGetAllMenuQuery } from "@/redux/api/content/menuApi";
import { TResponseDataObj } from "@/types";

export type TCategoryQueryObj = {
  limit?: number | 20;
  page?: number | 1;
};

export const useMenubarOptions = (queryObj: TCategoryQueryObj = {}) => {
  const { data, isLoading } = useGetAllMenuQuery(queryObj);

  const menubarData = data as TResponseDataObj;
  const menubar_data = menubarData?.data?.data || [];

  let menubar_options = [];

  if (!!menubar_data) {
    menubar_options = menubar_data?.map((item: Record<string, any>) => {
      return {
        label: item?.title,
        value: item?.id,
      };
    });
  }

  return {
    options: menubar_options,
    isLoading,
  };
};

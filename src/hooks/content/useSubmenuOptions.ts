"use client";
import { useGetAllSubmenuQuery } from "@/redux/api/content/submenuApi";
import { TResponseDataObj } from "@/types";

export type TSubmenuQueryObj = {
  menubarId?: string;
  limit?: number | 20;
  page?: number | 1;
};

const useSubmenuOptions = (queryObj: TSubmenuQueryObj = {}) => {
  const { data, isLoading } = useGetAllSubmenuQuery(queryObj);

  const submenuData = data as TResponseDataObj;
  const submenu_data = submenuData?.data?.data || [];

  let submenu_options = [];

  if (!!submenu_data) {
    submenu_options = submenu_data?.map((item: Record<string, any>) => {
      return {
        label: item?.title,
        value: item?.id,
      };
    });
  }

  return {
    options: submenu_options,
    isLoading,
  };
};

export default useSubmenuOptions;

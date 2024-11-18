"use client";

import { useGetAllDivisionQuery } from "@/redux/api/user/clientTypeApi";
import { TResponseDataObj } from "@/types";

export type TDivisionQueryObj = {
  countryId?: string;
  page?: number | 1;
  limit?: number | 20;
};

export const useDivisionOptions = (queryObj: TDivisionQueryObj = {}) => {
  const { data, isLoading } = useGetAllDivisionQuery(queryObj);

  const divisionData = data as TResponseDataObj;
  const division_data = divisionData?.data?.data || [];

  let division_options = [];
  if (!!division_data) {
    division_options = division_data?.map((item: Record<string, any>) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    });
  }
  return {
    options: division_options,
    isLoading,
  };
};

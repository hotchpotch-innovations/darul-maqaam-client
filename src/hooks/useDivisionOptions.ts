"use client";

import { useGetAllDivisionQuery } from "@/redux/api/user/clientTypeApi";
import { TResponseDataObj } from "@/types";

type TQueryObj = {
  countryId?: string;
};

export const useDivisionOptions = (Id?: string | null) => {
  const queryObj: TQueryObj = {};
  if (Id) {
    queryObj["countryId"] = Id;
  }
  const { data, isLoading } = useGetAllDivisionQuery({
    ...queryObj,
  });

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

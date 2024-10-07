"use client";

import { useGetAllDivisionQuery } from "@/redux/api/user/clientTypeApi";
import { TResponseDataObj } from "@/types";

type TQueryObj = {
  countryId?: string;
};

type TDivisionObj = {};

export const usePermanentDivisionOptions = (Id: string | null) => {
  const queryObj: TQueryObj = {};
  if (Id) {
    queryObj["countryId"] = Id;
  }
  const { data, isLoading } = useGetAllDivisionQuery({
    ...queryObj,
  });
  const divisionData = data as TResponseDataObj;
  const division_data = divisionData?.data?.data || [];

  let permanent_division_options = [];
  if (!!division_data) {
    permanent_division_options = division_data?.map(
      (item: Record<string, any>) => {
        return {
          label: item?.name,
          value: item?.id,
        };
      }
    );
  }
  return {
    options: permanent_division_options,
    isLoading,
  };
};

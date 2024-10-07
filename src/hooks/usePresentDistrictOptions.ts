"use client";

import { useGetAllDistrictQuery } from "@/redux/api/user/clientTypeApi";
import { TResponseDataObj } from "@/types";

type TQueryObj = {
  divisionId?: string;
};

export const usePresentDistrictOptions = (Id: string | null) => {
  const queryObj: TQueryObj = {};
  if (Id) {
    queryObj["divisionId"] = Id;
  }
  const { data, isLoading } = useGetAllDistrictQuery({
    ...queryObj,
  });

  const districtData = data as TResponseDataObj;
  const district_data = districtData?.data?.data || [];
  let district_options = [];
  if (!!district_data) {
    district_options = district_data?.map((item: Record<string, any>) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    });
  }
  return {
    options: district_options,
    isLoading,
  };
};

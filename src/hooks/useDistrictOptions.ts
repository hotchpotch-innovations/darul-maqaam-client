"use client";

import { useGetAllDistrictQuery } from "@/redux/api/user/settings/districtApi";
import { TResponseDataObj } from "@/types";

export type TDistrictQueryObj = {
  divisionId?: string;
  page?: number | 1;
  limit?: number | 20;
};

export const useDistrictOptions = (queryObj: TDistrictQueryObj = {}) => {
  const { data, isLoading } = useGetAllDistrictQuery(queryObj);

  const districtData = data as TResponseDataObj;
  const district_data = districtData?.data?.data || [];

  let permanent_district_options = [];
  if (!!district_data) {
    permanent_district_options = district_data?.map(
      (item: Record<string, any>) => {
        return {
          label: item?.name,
          value: item?.id,
        };
      }
    );
  }
  return {
    options: permanent_district_options,
    isLoading,
  };
};

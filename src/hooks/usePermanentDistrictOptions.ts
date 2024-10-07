"use client";

import { useGetAllDistrictQuery } from "@/redux/api/user/clientTypeApi";
import { TResponseDataObj } from "@/types";

type TQueryObj = {
  divisionId?: string;
};

export const usePermanentDistrictOptions = (Id: string | null) => {
  const queryObj: TQueryObj = {};
  if (Id) {
    queryObj["divisionId"] = Id;
  }
  const { data, isLoading } = useGetAllDistrictQuery({
    ...queryObj,
  });

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

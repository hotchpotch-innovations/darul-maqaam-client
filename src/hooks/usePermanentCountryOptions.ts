"use client";

import { useGetAllcountrysQuery } from "@/redux/api/user/clientTypeApi";
import { TResponseDataObj } from "@/types";

export const usePermanentCountryOptions = () => {
  const { data, isLoading } = useGetAllcountrysQuery({});

  const countryData = data as TResponseDataObj;
  const country_data = countryData?.data?.data || [];

  let permanent_country_options = [];
  if (!!country_data) {
    permanent_country_options = country_data?.map(
      (item: Record<string, any>) => {
        return {
          label: item?.name,
          value: item?.id,
        };
      }
    );
  }
  return {
    options: permanent_country_options,
    isLoading,
  };
};

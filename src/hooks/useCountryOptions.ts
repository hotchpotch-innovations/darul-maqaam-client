"use client";
import { useGetAllCountryQuery } from "@/redux/api/user/settings/countryApi";
import { TResponseDataObj } from "@/types";

export const useCountryOptions = () => {
  const { data, isLoading } = useGetAllCountryQuery({});
  const countryDataObj = data as TResponseDataObj;
  const country_data = countryDataObj?.data?.data || [];

  // const data = countryData?.data?.data || null;
  let country_options = [];
  if (!!country_data) {
    country_options = country_data?.map((item: Record<string, any>) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    });
  }
  return {
    options: country_options,
    isLoading,
  };
};

"use client";

import { useGetAllAccountTypesQuery } from "@/redux/api/user/clientTypeApi";

export const useClientTypeOption = () => {
  const { data: client_types_data, isLoading } = useGetAllAccountTypesQuery("");
  const data = client_types_data?.data || null;
  let client_type_option = [];

  if (!!data) {
    client_type_option = data.map((item: Record<string, any>) => {
      return {
        label: item?.title,
        value: item?.id,
      };
    });
  }

  return {
    options: client_type_option,
    isLoading,
  };
};

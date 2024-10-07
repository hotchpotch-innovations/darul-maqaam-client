"use client";

import { useGetAllAccountTypesQuery } from "@/redux/api/user/clientTypeApi";
import { TResponseDataObj } from "@/types";

export const useClientTypeOption = () => {
  const { data, isLoading } = useGetAllAccountTypesQuery({});

  const clientTypeDataObj = data as TResponseDataObj;
  const client_data = clientTypeDataObj?.data || [];

  let client_type_option = [];

  if (!!client_data) {
    client_type_option = client_data?.map((item: Record<string, any>) => {
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

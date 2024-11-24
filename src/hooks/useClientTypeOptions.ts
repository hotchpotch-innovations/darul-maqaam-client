"use client";
import { useGetAllClientTypeQuery } from "@/redux/api/user/settings/clientTypeApi";
import { TResponseDataObj } from "@/types";

export const useClientTypeOption = () => {
  const { data, isLoading } = useGetAllClientTypeQuery({});

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

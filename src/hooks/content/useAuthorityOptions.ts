"use client";
import { useGetAllPublicAuthorityQuery } from "@/redux/api/content/authorityApi";
import { TResponseDataObj } from "@/types";

export type TAuthorityQueryObj = {
  limit?: number | 20;
  page?: number | 1;
};

export const useAuthorityOptions = (queryObj: TAuthorityQueryObj = {}) => {
  const { data, isLoading } = useGetAllPublicAuthorityQuery(queryObj);

  const authorityData = data as TResponseDataObj;
  const authority_data = authorityData?.data?.data || [];

  let authority_options = [];
  if (!!authority_data) {
    authority_options = authority_data?.map((item: Record<string, any>) => {
      return {
        label: item?.title,
        value: item?.id,
      };
    });
  }
  return {
    options: authority_options,
    isLoading,
  };
};

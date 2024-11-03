"use client";

import { useGetAllDesignationQuery } from "@/redux/api/user/clientTypeApi";
import { TResponseDataObj } from "@/types";

export type TDesignationQueryObj = {
  departmentId?: string;
  limit?: number | 20;
  page?: number | 1;
};

export const useDesignationOptions = (queryObj: TDesignationQueryObj = {}) => {
  const { data, isLoading } = useGetAllDesignationQuery(queryObj);

  const designationData = data as TResponseDataObj;
  const designation_data = designationData?.data?.data || [];

  let designation_options = [];
  if (!!designation_data) {
    designation_options = designation_data?.map((item: Record<string, any>) => {
      return {
        label: item?.title,
        value: item?.id,
      };
    });
  }
  return {
    options: designation_options,
    isLoading,
  };
};

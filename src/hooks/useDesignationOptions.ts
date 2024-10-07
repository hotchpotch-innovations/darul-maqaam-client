"use client";

import { useGetAllDesignationQuery } from "@/redux/api/user/clientTypeApi";
import { TResponseDataObj } from "@/types";
type TQueryObj = {
  departmentId?: string;
};

export const useDesignationOptions = (departmentId: string | null) => {
  const queryObj: TQueryObj = {};
  if (departmentId) {
    queryObj["departmentId"] = departmentId;
  }
  const { data, isLoading } = useGetAllDesignationQuery({
    ...queryObj,
  });

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

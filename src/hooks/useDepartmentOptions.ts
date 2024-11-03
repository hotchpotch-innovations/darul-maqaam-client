"use client";

import { useGetAllDepartmentQuery } from "@/redux/api/user/clientTypeApi";
import { TResponseDataObj } from "@/types";

export const useDepartmentOptions = () => {
  const { data, isLoading } = useGetAllDepartmentQuery(null);

  const departmentsData = data as TResponseDataObj;
  const department_data = departmentsData?.data?.data || [];

  let department_options = [];
  if (!!department_data) {
    department_options = department_data?.map((item: Record<string, any>) => {
      return {
        label: item?.title,
        value: item?.id,
      };
    });
  }
  return {
    options: department_options,
    isLoading,
  };
};

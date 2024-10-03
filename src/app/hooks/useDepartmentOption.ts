import { useGetAllDepartmentQuery } from "@/redux/api/user/departmentApi";

export const useDepartmentOption = (paramObj) => {
  const { data, isLoading } = useGetAllDepartmentQuery({
    ...paramObj,
  });

  const department_data = data?.data?.data || null;

  let department_options = [];

  if (!!department_data) {
    department_options = department_data?.map((item) => {
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

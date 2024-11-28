"use client";

import { useGetAllPublicWebpageQuery } from "@/redux/api/content/webpageApi";
import { TResponseDataObj } from "@/types";

export type TWebpageQueryObj = {
  menubarId?: string;
  submenuId?: string;
  only_wp?: string;
  limit?: number | 20;
  page?: number | 1;
};

const useWebpageOptions = (queryObj: TWebpageQueryObj = {}) => {
  const { data, isLoading } = useGetAllPublicWebpageQuery(queryObj);

  const webpageData = data as TResponseDataObj;
  const webpage_data = webpageData?.data?.data || [];

  let webpage_options = [];

  if (!!webpage_data) {
    webpage_options = webpage_data?.map((item: Record<string, any>) => {
      return {
        label: item?.title,
        value: item?.id,
      };
    });
  }

  return {
    options: webpage_options,
    isLoading,
  };
};

export default useWebpageOptions;

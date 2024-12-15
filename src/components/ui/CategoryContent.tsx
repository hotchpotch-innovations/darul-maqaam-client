"use client";
import { useGetAllPublicMPSQuery } from "@/redux/api/content/multiplePageSectionApi";
import { Box, Container, Stack } from "@mui/material";
import Image from "next/image";
import Loading from "./LoadingBar";
import { useEffect } from "react";

type TProps = {
  categoryId: string;
};

type TQueryObj = {
  page: number;
  limit: number;
  categoryId?: string;
};

const CategoryContent = ({ categoryId }: TProps) => {
  const queryObj: TQueryObj = {
    page: 1,
    limit: 20,
  };

  if (!!categoryId) {
    queryObj["categoryId"] = categoryId;
  }

  const { data: contents_data_obj, isLoading } =
    useGetAllPublicMPSQuery(queryObj);

  if (!!isLoading) {
    return <Loading />;
  }

  const contents = contents_data_obj?.data?.data || [];

  console.log(contents);

  return (
    <Container>
      <Stack>
        {contents?.map((item: Record<string, any>) => (
          <Box key={item?.id}>
            <Box mb={1}>
              <Image
                src={item?.cover_image?.url}
                className="rounded-md"
                alt="Gallery Photo"
                height={400}
                width={400}
              />
            </Box>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default CategoryContent;

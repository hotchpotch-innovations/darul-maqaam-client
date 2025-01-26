"use client";
import { useGetAllPublicMPSQuery } from "@/redux/api/content/multiplePageSectionApi";
import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import Loading from "./LoadingBar";

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

  // console.log(contents);

  return (
    <Container>
      <Stack>
        <ImageList
          // sx={{ width: 500, height: 450 }} cols={3}
          variant="standard"
          cols={3}
          gap={8}
        >
          {contents?.map((item: Record<string, any>) => (
            <ImageListItem key={item?.id}>
              <Box>
                <Box mb={1}>
                  <Image
                    src={item?.cover_image?.url}
                    className="rounded-md"
                    alt="Gallery Photo"
                    height={400}
                    width={400}
                  />
                </Box>
                <Box mb={1}>
                  <Typography>{item?.title}</Typography>
                </Box>
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      </Stack>
    </Container>
  );
};

export default CategoryContent;

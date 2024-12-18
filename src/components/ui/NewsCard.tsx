import { Box, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewsCard = ({ data }: { data: Record<string, any> }) => {
  const date = dayjs(data?.published_date).format("DD MMM YYYY");
  return (
    <Grid item xs={12} sm={6} md={4} paddingY={4} paddingRight={2}>
      <Link href={`/news/${data?.id}`}>
        <Box
          padding={2}
          bgcolor={"white"}
          sx={{
            border: "0.1px solid #dee2e6",
            borderRadius: "10px",
            height: "600px",
            width: "100%",
          }}
        >
          <Box sx={{ height: "350px", width: "full" }}>
            <Box sx={{ height: "100px" }}>
              <Typography variant="h5" pb={2}>
                {data?.title?.length > 100
                  ? data?.title?.slice(0, 100) + "..."
                  : data?.title}
              </Typography>
            </Box>
            <Image
              className="rounded-[5px] h-[225px]"
              src={data?.cover_image?.url || ""}
              alt={data?.title || ""}
              height={315}
              width={1000}
              objectFit="cover"
            />
            <Box
              display={"flex"}
              dir="row"
              justifyContent={"space-between"}
              alignItems={"center"}
              height={"20px"}
              marginTop={"5px"}
            >
              <Box>
                <Typography color={"GrayText"}>{data?.author}</Typography>
              </Box>
              <Box>
                <Typography color={"GrayText"}>{date}</Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ height: "250px", width: "full" }}>
            <Typography
              pt={2}
              pb={2}
              fontSize={16}
              className="text-justify"
              color={"GrayText"}
            >
              {data?.summary.length > 300
                ? data?.summary.slice(0, 300) + "..."
                : data?.summary}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Grid>
  );
};

export default NewsCard;

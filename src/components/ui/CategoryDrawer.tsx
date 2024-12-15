"use client";
import { Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import CategoryContent from "./CategoryContent";

type TProps = {
  categoryData: Record<string, any>[];
};

const CategoryDrawer = ({ categoryData }: TProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categoryData[0]?.id
  );

  return (
    <Container>
      <Stack
        sx={{
          gap: {
            sx: "10px",
            sm: "20px",
            md: "30px",
          },
          flexDirection: {
            sx: "column",
            md: "row",
          },
        }}
        py={8}
      >
        <Stack
          gap={2}
          sx={{
            minWidth: {
              xs: "80px", // Mobile devices
              sm: "100px", // Tablet devices
              md: "200px", // Laptop devices
            },
          }}
        >
          {categoryData?.map((item: Record<string, any>) => (
            <Typography
              className={`cursor-pointer sm:text-sx text-sm overflow-hidden ${
                selectedCategoryId == item?.id
                  ? "text-green-500 border-e-2 border-green-500 pe-4 font-bold transition-all"
                  : ""
              }`}
              key={item?.id}
            >
              <span onClick={() => setSelectedCategoryId(item?.id)}>
                {item?.title}
              </span>
            </Typography>
          ))}
        </Stack>
        <Stack className="flex-grow mt-6 md:mt-0">
          <CategoryContent categoryId={selectedCategoryId} />
        </Stack>
      </Stack>
    </Container>
  );
};
export default CategoryDrawer;

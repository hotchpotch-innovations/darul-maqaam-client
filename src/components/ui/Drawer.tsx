"use client";

import { Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Content from "./Content";

type DrawerProps = {
  drawerData: Record<string, any>[];
};

const Drawer = ({ drawerData }: DrawerProps) => {
  const [selectedDrawerData, setSelectedDrawerData] = useState(drawerData[0]);
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
          {drawerData?.map((item: Record<string, any>) => (
            <Typography
              className={`cursor-pointer sm:text-sx text-sm overflow-hidden ${
                selectedDrawerData?.id == item?.id
                  ? "text-green-500 border-e-2 border-green-500 pe-4 font-bold transition-all"
                  : ""
              }`}
              key={item?.id}
            >
              <span onClick={() => setSelectedDrawerData(item)}>
                {item?.title}
              </span>
            </Typography>
          ))}
        </Stack>
        <Stack className="flex-grow mt-6 md:mt-0">
          <Content selectedData={selectedDrawerData} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Drawer;

"use client";

import { Container, Stack, Typography } from "@mui/material";
import Contant from "./Contant";
import { useState } from "react";
import { AboutData, TGalleray } from "@/app/(withCommonLayout)/Types";

type DrawerProps = {
  firstMenu?: string;
  isGallery?: boolean;
  drawerData?: AboutData | TGalleray;
};

const Drawer = ({ firstMenu, drawerData, isGallery }: DrawerProps) => {
  const [menu, setMenu] = useState(firstMenu);
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
          {drawerData?.map((item) => (
            <Typography
              className={`text-nowrap cursor-pointer sm:text-sx text-sm overflow-hidden ${
                menu == item.menu
                  ? "text-green-500 border-e-2 border-green-500 pe-4 font-bold transition-all"
                  : ""
              }`}
              key={item.menu}
            >
              <span onClick={() => setMenu(item?.menu)}>{item?.menu}</span>
            </Typography>
          ))}
        </Stack>
        <Stack className="flex-grow mt-6 md:mt-0">
          <Contant menu={menu} isGallery={isGallery} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Drawer;

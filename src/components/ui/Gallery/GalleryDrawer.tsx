"use client";

import { Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { AboutData, TGalleray } from "@/app/(withCommonLayout)/Types";
import GalleryPhoto from "./GalleryPhoto";

type DrawerProps = {
  firstMenu?: string;
  isGallery?: boolean;
  drawerData?: AboutData | TGalleray;
};

const GalleryDrawer = ({ firstMenu, drawerData, isGallery }: DrawerProps) => {
  const [menu, setMenu] = useState(firstMenu);
  return (
    <Container>
      <Stack direction={"row"} gap={7} py={8}>
        <Stack gap={2} minWidth={200}>
          {drawerData?.map((item) => (
            <Typography
              className={`text-nowrap cursor-pointer ${
                menu == item.menu
                  ? "text-green-500 border-e-2 border-green-500 pe-4 font-bold transition-all"
                  : ""
              }`}
              key={item.menu}
            >
              <span onClick={() => setMenu(item?.menu)}>{item.menu}</span>
            </Typography>
          ))}
        </Stack>
        <Stack className="flex-grow">
          <GalleryPhoto menu={menu} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default GalleryDrawer;

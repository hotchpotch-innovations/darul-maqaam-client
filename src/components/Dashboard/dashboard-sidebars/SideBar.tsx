"use client";
import { Box, Divider, List, Stack, Typography } from "@mui/material";
import Image from "next/image";
import logoImage from "../../../../public/images/darul_p_logo.png";
import Link from "next/link";
import { TUserRole } from "@/types/common";
import { useEffect, useState } from "react";
import { drawerItems } from "@/utils/drawerItems";
import { getUserInfoFromLocalStorage } from "@/services/auth.Services.Loacl";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const user_info = getUserInfoFromLocalStorage() as any;

    setUserRole(user_info?.role.toLowerCase());
    setLoading(false);
  }, []);

  const dashboard_drawer_items = drawerItems(userRole as TUserRole);

  if (loading) {
    return <Typography> Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        borderRight: "2px solid lightgray",
        bgcolor: "#1E293B",
        color: "#E5E7EB",
        pb: "100px",
      }}
    >
      <Stack
        className="mt-6"
        justifyContent={"center"}
        alignItems={"center"}
        direction={"row"}
        height="90px"
        gap={2}
        py={1}
        component={Link}
        href={"/"}
      >
        <Image src={logoImage} alt="Logo Image" className="w-4/5" />
      </Stack>

      <Box
        sx={{
          minHeight: "calc(100vh - 90*2px)",
        }}
      >
        <List>
          {dashboard_drawer_items.map((item, index) => {
            // console.log({ item });
            return (
              <Box key={index}>
                <SidebarItem item={item} />
                {dashboard_drawer_items?.length - 1 !== index && <Divider />}
              </Box>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;

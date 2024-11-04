"use client";
import { Box, List, Stack, Typography } from "@mui/material";
import Image from "next/image";
import logoImage from "../../../../public/images/mainLogo.png";
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
    const {role} = getUserInfoFromLocalStorage() as any;

    setUserRole(role.toLowerCase());
    setLoading(false);
  }, []);

  if (loading) {
    return <Typography> Loading...</Typography>;
  }

  return (
    <Box
      sx={{
        borderRight: "2px solid lightgray",
        bgcolor: "#2E2E2E",
        color: "#E5E7EB",
        pb: "100px",
      }}
    >
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        direction={"row"}
        height="90px"
        gap={2}
        py={1}
        component={Link}
        href={"/"}
      >
        <Image
          src={logoImage}
          alt="Logo Image"
          height={40}
          width={40}
          className="size-16"
        />{" "}
        <Typography variant="h5" color="primary.main" fontWeight={700}>
          C-Project
        </Typography>
      </Stack>

      <Box
        sx={{
          minHeight: "calc(100vh - 90*2px)",
        }}
      >
        <List>
          {drawerItems(userRole as TUserRole).map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;

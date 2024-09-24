import { Box, List, Stack, Typography } from "@mui/material";
import Image from "next/image";
import logoImage from "../../../../public/images/mainLogo.png";
import Link from "next/link";
import { drawerItems } from "@/utils/drawerItems";
import { TUserRole } from "@/types/common";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <Box
      sx={{
        borderRight: "2px solid lightgray",
        minHeight: "100vh",
        bgcolor: "lightgray",
      }}
    >
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        direction={"row"}
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
      <List>
        {drawerItems("dev-super-admin" as TUserRole).map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;

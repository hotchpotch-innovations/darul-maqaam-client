"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Badge, Stack } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import dynamic from "next/dynamic";
import AccountMenu from "../shared/accountMenu/AccountMenu";
import Sidebar from "../dashboard-sidebars/SideBar";
import Loading from "@/components/UI/LoadingBar";
import { useGetMyProfileQuery } from "@/redux/api/user/userApi";

// 280
const drawerWidth = 280;

const DashboardDrawer = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  // Fetching user data from the API
  const { data, isLoading } = useGetMyProfileQuery("");
  const profile_image_url =
    data?.data?.profile_image ||
    "https://hotch-potch-2016.s3.us-east-2.amazonaws.com/default/user/Sample_User_Icon.png";

  const UserEmail = dynamic(() => import("../shared/UserEmail"), {
    ssr: false,
  });

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  if (!!isLoading) {
    return <Loading />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "#F4F7FE",
          boxShadow: 0,
          borderBottom: "1px solid #ddd",
          py: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "primary.main" }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box>
              <Typography
                variant="body2"
                noWrap
                component="div"
                sx={{ color: "rgba(11, 17, 52, 0.6)" }}
              >
                Hi,
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ color: "primary.main" }}
              >
                Welcome to Darul Maqaam Foundation!
              </Typography>
              <UserEmail />
            </Box>
            <Stack direction="row" gap={3}>
              {/* <Badge badgeContent={1} color="primary">
                <IconButton sx={{ background: "#ffffff" }}>
                  <NotificationsNoneIcon color="action" />
                </IconButton>
              </Badge> */}
              <Avatar alt={"name"} src={profile_image_url} />
              <AccountMenu />
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* For mobile Device  */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Sidebar />
        </Drawer>

        {/* For Large Device  */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardDrawer;

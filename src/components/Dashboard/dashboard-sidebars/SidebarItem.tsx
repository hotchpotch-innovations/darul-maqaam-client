"use client";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { IDrawerItems } from "@/types/common";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Link from "next/link";
import FirstChildren from "./childrens/FirstChildren";

type TItemProps = {
  item: IDrawerItems;
};

const SidebarItem = ({ item }: TItemProps) => {
  const pathName = usePathname();
  const [isChildOpen, setIsChildOpen] = useState(false);

  const handleToggle = () => {
    setIsChildOpen((prev) => !prev);
  };

  return (
    <>
      <Box style={{ textDecoration: "none" }}>
        <ListItem
          disablePadding
          sx={{
            width: "100%",
            display: "block",
            color: "#E5E7EB", // Sidebar text color
          }}
        >
          {/* Management part  */}
          <ListItemButton
            onClick={handleToggle}
            sx={{
              ...(item?.management !== "no-management" && {
                cursor: "pointer",
                ":hover": { bgcolor: "primary.main" },
              }),

              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              ...(pathName.includes(
                item?.management ? `/${item.management}` : ""
              )
                ? {
                    bgcolor: "primary.main",
                  }
                : {}),
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "0px",
                color: "#E5E7EB", // Icon and text color
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#E5E7EB", // Icon color
                  ...(item?.path === pathName
                    ? {
                        color: "primary.main",
                      }
                    : {}),
                }}
              >
                {item?.icon && <item.icon />}
              </ListItemIcon>

              <ListItemText
                sx={{
                  marginLeft: "20px",
                }}
              >
                <Link href={item?.path ? item?.path : ""}>
                  <Typography
                    sx={{
                      color: "#E5E7EB",
                      fontSize: "16px",
                      marginLeft: "-40px",
                      ...(item?.path === pathName && {
                        color: "primary.main",
                      }),
                      ...(item.is_parent && {
                        fontSize: "14px",
                      }),
                    }}
                  >
                    {item?.title.length > 20
                      ? item?.title.slice(0, 17) + "..."
                      : item?.title}
                  </Typography>
                </Link>
              </ListItemText>
            </Box>
            {item?.child && (
              <IconButton sx={{ color: "#E5E7EB" }}>
                {isChildOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            )}
          </ListItemButton>

          {/* First Child of Management */}
          <FirstChildren isChildOpen={isChildOpen} item={item} />
        </ListItem>
      </Box>
    </>
  );
};

export default SidebarItem;

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
  const [isChildOpen, setIsChildOpen] = useState(false);

  const linkPath = `/dashboard/${item?.path}`;
  const pathName = usePathname();

  return (
    <>
      <Link
        href={item?.path ? linkPath : "#"}
        style={{ textDecoration: "none" }}
      >
        <ListItem
          disablePadding
          sx={{
            width: "100%",
            display: "block",
            // borderBottom: "0.5px solid black",
            color: "#E5E7EB", // Sidebar text color
          }}
        >
          {/* Management part  */}
          <ListItemButton
            onClick={() => setIsChildOpen(!isChildOpen)}
            sx={{
              ...(item.is_parent && {
                // bgcolor: "black",
                cursor: "pointer",
                ":hover": { bgcolor: "primary.main" },
              }),
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
                  ...(linkPath === pathName
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
                <Typography
                  sx={{
                    color: "#E5E7EB",
                    fontSize: "16px",
                    // marginLeft: "-15px",
                    ...(linkPath === pathName
                      ? {
                          color: "primary.main",
                        }
                      : {}),

                    // Management Title
                    ...(item.is_parent && {
                      marginLeft: "-40px",
                      fontSize: "14px",
                    }),
                  }}
                >
                  {item?.title.length > 20
                    ? item?.title.slice(0, 17) + "..."
                    : item?.title}
                </Typography>
              </ListItemText>
            </Box>
            {item.child && (
              <IconButton sx={{ color: "#E5E7EB" }}>
                {isChildOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            )}
          </ListItemButton>

          {/* First Child of Management */}
          <FirstChildren isChildOpen={isChildOpen} item={item} />
        </ListItem>
      </Link>
    </>
  );
};

export default SidebarItem;

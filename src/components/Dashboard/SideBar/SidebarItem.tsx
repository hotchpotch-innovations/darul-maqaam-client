"use client";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Collapse,
  IconButton,
} from "@mui/material";
import { IDrawerItems } from "@/types/common";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Link from "next/link";

type TItemProps = {
  item: IDrawerItems;
};

const SidebarItem = ({ item }: TItemProps) => {
  const [isChildOpen, setIsChildOpen] = useState(false);
  const [isSecondChildOpen, setIsSecondChildOpen] = useState(false);

  const linkPath = `/dashboard/${item?.path}`;
  const pathName = usePathname();

  return (
    <Link href={linkPath}>
      <ListItem
        disablePadding
        sx={{
          display: "block",
          bgcolor: linkPath === pathName ? "#e3f2fd" : "transparent",
          borderBottom: "1px solid #ddd",
        }}
      >
        <ListItemButton
          onClick={() => setIsChildOpen(!isChildOpen)}
          sx={{
            ...(linkPath === pathName
              ? { borderRight: "3px solid #1586FD" }
              : {}),
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 1,
            py: 1,
            borderRadius: 1,
            "&:hover": {
              bgcolor: "#f0f0f0",
            },
          }}
        >
          <Stack direction="row" alignItems="start" spacing={0} width="100%">
            <ListItemIcon>{item?.icon && <item.icon />}</ListItemIcon>
            <ListItemText primary={item?.title} />
          </Stack>
          {item.child && (
            <IconButton>
              {isChildOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </ListItemButton>

        <Collapse
          in={isChildOpen}
          timeout="auto"
          unmountOnExit
          sx={{
            top: "10px",
          }}
        >
          <Stack
            width="100%"
            direction="column"
            gap={1}
            sx={{
              pl: 1, // Indent child items
              pb: 1, // Padding at the bottom
            }}
          >
            {item?.child?.map((childItem, index) => (
              <Link key={index} href={childItem.path}>
                <ListItem sx={{ display: "block" }} disablePadding>
                  <ListItemButton
                    onClick={() => setIsSecondChildOpen(!isSecondChildOpen)}
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      pl: 1,
                      py: 1,
                      borderRadius: 1,
                      "&:hover": {
                        bgcolor: "#f0f0f0",
                      },
                    }}
                  >
                    <Stack direction="row" spacing={0} width="100%">
                      <ListItemIcon>
                        {childItem?.icon && <childItem.icon />}
                      </ListItemIcon>
                      <ListItemText primary={childItem?.title} />
                    </Stack>
                    {childItem.child && (
                      <IconButton>
                        {isSecondChildOpen ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </IconButton>
                    )}
                  </ListItemButton>
                  <Collapse
                    in={isSecondChildOpen}
                    timeout="auto"
                    unmountOnExit
                    sx={{
                      top: "10px",
                    }}
                  >
                    <Stack
                      width="100%"
                      direction="column"
                      gap={1}
                      sx={{
                        pl: 1, // Indent child items
                        pb: 1, // Padding at the bottom
                      }}
                    >
                      {childItem?.child?.map((childItem, index) => (
                        <Link key={index} href={childItem?.path}>
                          <ListItem disablePadding>
                            <ListItemButton sx={{ pl: 8 }}>
                              <ListItemText primary={childItem?.title} />
                              {}
                            </ListItemButton>
                          </ListItem>
                        </Link>
                      ))}
                    </Stack>
                  </Collapse>
                </ListItem>
              </Link>
            ))}
          </Stack>
        </Collapse>
      </ListItem>
    </Link>
  );
};

export default SidebarItem;

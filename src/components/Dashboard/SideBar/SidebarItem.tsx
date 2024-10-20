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

  const getLastPartOfUrl = (url: string): string => {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  };

  const getLastSecondOfUrl = (url: string): string => {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 2];
  };

  const lastSecond = getLastSecondOfUrl(pathName);
  const lastPart = getLastPartOfUrl(pathName);

  return (
    <Link href={item?.path ? linkPath : "#"}>
      <ListItem
        disablePadding
        sx={{
          width: "100%",
          display: "block",
          borderBottom: "1px solid #ddd",
        }}
      >
        <ListItemButton
          onClick={() => setIsChildOpen(!isChildOpen)}
          sx={{
            ...(item.is_parent && {
              // borderTop: "1px solid #1586FD",
              borderLeft: "5px solid gray",
              bgcolor: "#BDBDBD",
              cursor: "default",
              ":hover": { bgcolor: "#BDBDBD" },
            }),
            ...(linkPath === pathName
              ? {
                  borderRight: "3px solid #1586FD",
                }
              : {}),
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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

        <Collapse in={isChildOpen} timeout="auto" unmountOnExit>
          {/**
           * ================================================================
           *                    Second Children List
           * ================================================================
           */}
          <Stack width="100%" direction="column" gap={1}>
            {item?.child?.map((childItem, index) => (
              <Link
                key={index}
                href={
                  childItem?.child
                    ? ""
                    : `/${childItem?.parentPath || ""}/${childItem?.path || ""}`
                }
              >
                <ListItem sx={{ display: "block" }} disablePadding>
                  <ListItemButton
                    onClick={() => setIsSecondChildOpen(!isSecondChildOpen)}
                    sx={{
                      ...(lastPart === childItem?.path
                        ? {
                            borderRight: "3px solid #1586FD",
                          }
                        : {}),
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
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
                  <Collapse in={isSecondChildOpen} timeout="auto" unmountOnExit>
                    {/**
                     * ================================================================
                     *                    third Children List
                     * ================================================================
                     */}
                    <Stack width="100%" direction="column">
                      {childItem?.child?.map(
                        (grandChildItem, grandChildIndex) => (
                          <Link
                            key={grandChildIndex}
                            href={`/${grandChildItem?.parentPath || ""}/${
                              grandChildItem?.path || ""
                            }`}
                          >
                            <ListItem disablePadding>
                              <ListItemButton
                                sx={{
                                  ...(lastPart === grandChildItem?.path
                                    ? {
                                        borderRight: "3px solid #1586FD",
                                      }
                                    : {}),
                                  width: "100%",
                                  textAlign: "end",
                                  pr: "50px",
                                }}
                              >
                                <ListItemText primary={grandChildItem?.title} />
                              </ListItemButton>
                            </ListItem>
                          </Link>
                        )
                      )}
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

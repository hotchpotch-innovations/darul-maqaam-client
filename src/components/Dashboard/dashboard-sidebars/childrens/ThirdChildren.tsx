"use client";
import { IDrawerItems } from "@/types";
import { getLastPartOfUrl } from "@/utils/drawerHelpers";
import {
  Collapse,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type TProps = {
  item: IDrawerItems;
  isChildOpen: boolean;
};

type TChildOpen = {
  state?: string | null;
  isChildOpen: boolean;
};

const ThirdChildren = ({ item, isChildOpen }: TProps) => {
  const pathName = usePathname();
  const lastPart = getLastPartOfUrl(pathName);
  const [childOpenObj, setChildOpenObj] = useState<TChildOpen>({
    state: null,
    isChildOpen: false,
  });
  return (
    <Collapse in={isChildOpen} timeout="auto" unmountOnExit>
      <Stack width="100%" direction="column">
        {item?.child?.map((childItem, grandChildIndex) => (
          <Link
            key={grandChildIndex}
            href={childItem.path ? childItem.path : ""}
          >
            <ListItem
              disablePadding
              sx={{
                ":hover": {
                  backgroundColor: "#08101c",
                  transitionDuration: "0.3s",
                },
              }}
            >
              <ListItemButton
                onClick={() =>
                  setChildOpenObj({
                    state: childItem?.state,
                    isChildOpen: !childOpenObj?.isChildOpen,
                  })
                }
                sx={{
                  width: "100%",
                }}
              >
                <Stack direction="row" spacing={0} width="100%">
                  <ListItemIcon sx={{ color: "#E5E7EB" }}>
                    {childItem?.icon && <childItem.icon />}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      sx={{
                        color: "#E5E7EB", // Text color
                        textAlign: "start",
                        fontSize: "11px",
                        marginLeft: "32px",
                        cursor: "pointer",
                        ":hover": {
                          color: "primary.main",
                          transitionDuration: "0.3s",
                        },
                        ...(lastPart === childItem?.path
                          ? {
                              color: "primary.main",
                            }
                          : {}),
                        ...(pathName.includes(
                          childItem?.identifier ? childItem?.identifier : ""
                        )
                          ? {
                              color: "primary.main",
                            }
                          : {}),
                      }}
                    >
                      {childItem?.title}
                    </Typography>
                  </ListItemText>
                </Stack>
                {childItem?.child && (
                  <IconButton sx={{ color: "#E5E7EB" }}>
                    {childOpenObj?.state === childItem?.state &&
                    childOpenObj?.isChildOpen ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </IconButton>
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </Stack>
    </Collapse>
  );
};

export default ThirdChildren;

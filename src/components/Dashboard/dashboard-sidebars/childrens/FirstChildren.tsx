"use client";

import { IDrawerItems } from "@/types";
import { getLastPartOfUrl } from "@/utils/drawerHelpers";
import { usePathname } from "next/navigation";
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Link from "next/link";
import { useState } from "react";

type TProps = {
  item: IDrawerItems;
  isChildOpen: boolean;
};

type TChildOpen = {
  state?: string | null;
  isChildOpen: boolean;
};

const FirstChildren = ({ item, isChildOpen }: TProps) => {
  const pathName = usePathname();
  const lastPart = getLastPartOfUrl(pathName);
  //   const [isChildOpen, setIsChildOpen] = useState(false);
  const [childOpenObj, setChildOpenObj] = useState<TChildOpen>({
    state: null,
    isChildOpen: false,
  });
  return (
    <Collapse in={isChildOpen} timeout="auto" unmountOnExit>
      <Stack width="100%" direction="column" gap={1}>
        {item?.child?.map((childItem, index) => (
          <Link
            key={index}
            href={
              childItem?.child
                ? ""
                : `/${childItem?.parentPath || ""}/${childItem?.path || ""}`
            }
            style={{ textDecoration: "none" }}
          >
            <ListItem sx={{ display: "block" }} disablePadding>
              <ListItemButton
                onClick={() =>
                  setChildOpenObj({
                    state: childItem?.state,
                    isChildOpen: !childOpenObj?.isChildOpen,
                  })
                }
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "start",
                  textAlign: "start",
                  alignItems: "center",
                  // fontSize: "48px",
                }}
              >
                <Stack direction="row" spacing={0} width="100%">
                  {/* Second Child of management */}
                  <ListItemIcon sx={{ color: "#E5E7EB" }}>
                    {childItem?.icon && <childItem.icon />}
                  </ListItemIcon>

                  <ListItemText>
                    <Typography
                      sx={{
                        color: "#E5E7EB",
                        width: "100%",
                        display: "flex",
                        justifyContent: "start",
                        textAlign: "start",
                        alignItems: "center",
                        fontSize: "12.5px",
                        // marginLeft: "10px",
                        ...(lastPart === childItem?.path
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
                {childItem.child && (
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

              {/* Second Child of management item */}
              <Collapse
                in={
                  childOpenObj?.state === childItem?.state &&
                  childOpenObj?.isChildOpen
                }
                timeout="auto"
                unmountOnExit
              >
                <Stack width="100%" direction="column">
                  {childItem?.child?.map((grandChildItem, grandChildIndex) => (
                    <Link
                      key={grandChildIndex}
                      href={`/${grandChildItem?.parentPath || ""}/${
                        grandChildItem?.path || ""
                      }`}
                      style={{ textDecoration: "none" }}
                    >
                      <ListItem disablePadding>
                        <ListItemButton
                          sx={{
                            width: "100%",
                          }}
                        >
                          <ListItemIcon sx={{ color: "#E5E7EB" }}>
                            {grandChildItem?.icon && <grandChildItem.icon />}
                          </ListItemIcon>
                          <ListItemText>
                            <Typography
                              sx={{
                                color: "#E5E7EB", // Text color
                                textAlign: "start",
                                fontSize: "11px",
                                marginLeft: "16px",
                                ...(lastPart === grandChildItem?.path
                                  ? {
                                      color: "primary.main",
                                    }
                                  : {}),
                              }}
                            >
                              {grandChildItem?.title}
                            </Typography>
                          </ListItemText>
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
  );
};

export default FirstChildren;

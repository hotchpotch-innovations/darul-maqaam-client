import { IDrawerItems } from "@/types";
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
import SecondChildren from "./SecondChildren";

type TProps = {
  item: IDrawerItems;
  isChildOpen: boolean;
};

const FirstChildren = ({ item, isChildOpen }: TProps) => {
  const pathName = usePathname();
  const [openChildState, setOpenChildState] = useState<string | null>(null);

  const handleToggle = (state: string | undefined) => {
    setOpenChildState((prev) => (prev === state ? null : state || null));
  };

  return (
    <Collapse in={isChildOpen} timeout="auto" unmountOnExit>
      <Stack width="100%" direction="column" gap={1}>
        {item?.child?.map((childItem, index) => {
          const isChildOpen = openChildState === childItem?.state;

          return (
            <Link
              key={index}
              href={childItem?.path || ""}
              style={{ textDecoration: "none" }}
            >
              <ListItem
                sx={{
                  display: "block",
                  ":hover": {
                    backgroundColor: "#172130",
                    transitionDuration: "0.3s",
                  },
                }}
                disablePadding
              >
                <ListItemButton
                  onClick={() => handleToggle(childItem?.state)}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "start",
                    textAlign: "start",
                    alignItems: "center",
                  }}
                >
                  <Stack direction="row" spacing={0} width="100%">
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
                          cursor: "pointer",
                          ":hover": {
                            color: "primary.main",
                            transitionDuration: "0.3s",
                          },
                          ...(pathName.includes(
                            childItem?.identifier || ""
                          ) && {
                            color: "primary.main",
                          }),
                        }}
                      >
                        {childItem?.title}
                      </Typography>
                    </ListItemText>
                  </Stack>
                  {childItem?.child && (
                    <IconButton sx={{ color: "#E5E7EB" }}>
                      {isChildOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  )}
                </ListItemButton>

                {/* Second Child of management item */}
                <SecondChildren item={childItem} isChildOpen={isChildOpen} />
              </ListItem>
            </Link>
          );
        })}
      </Stack>
    </Collapse>
  );
};

export default FirstChildren;

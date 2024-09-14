// "use client";

// import {
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Stack,
//   Collapse,
//   IconButton,
// } from "@mui/material";
// import { IDrawerItems } from "@/types/common";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import Link from "next/link";

// type TItemProps = {
//   item: IDrawerItems;
// };

// const SidebarItem = ({ item }: TItemProps) => {
//   const [isChildOpen, setIsChildOpen] = useState(false);
//   const [isSecondChildOpen, setIsSecondChildOpen] = useState(false);

//   const linkPath = `/dashboard/${item?.path}`;

//   const pathName = usePathname();
//   console.log(pathName);

//   return (
//     <ListItem
//       disablePadding
//       sx={{
//         width: "100%",
//         display: "block",
//         borderBottom: "1px solid #ddd",
//       }}
//     >
//       <ListItemButton
//         onClick={() => setIsChildOpen(!isChildOpen)}
//         sx={{
//           ...(linkPath === pathName
//             ? {
//                 borderRight: "3px solid #1586FD",
//               }
//             : {}),
//           width: "100%",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Stack direction="row" alignItems="start" spacing={0} width="100%">
//           <ListItemIcon>{item?.icon && <item.icon />}</ListItemIcon>
//           <Link href={item?.path === "" ? "" : linkPath} className="w-full">
//             <ListItemText primary={item?.title} />
//           </Link>
//         </Stack>
//         {item.child && (
//           <IconButton>
//             {isChildOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//           </IconButton>
//         )}
//       </ListItemButton>

//       <Collapse
//         in={isChildOpen}
//         timeout="auto"
//         unmountOnExit
//         sx={{
//           top: "10px",
//         }}
//       >
//         <Stack width="100%" direction="column" gap={1}>
//           {item?.child?.map((childItem, index) => (
//             <Link
//               key={index}
//               href={`${
//                 childItem?.path
//                   ? `${childItem?.parentPath}/${childItem?.path}`
//                   : ""
//               }`}
//             >
//               <ListItem sx={{ display: "block" }} disablePadding>
//                 <ListItemButton
//                   onClick={() => setIsSecondChildOpen(!isSecondChildOpen)}
//                   sx={{
//                     width: "100%",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     pl: 1,
//                     py: 1,
//                     borderRadius: 1,
//                     "&:hover": {
//                       bgcolor: "#f0f0f0",
//                     },
//                   }}
//                 >
//                   <Stack direction="row" spacing={0} width="100%">
//                     <ListItemIcon>
//                       {childItem?.icon && <childItem.icon />}
//                     </ListItemIcon>
//                     <ListItemText primary={childItem?.title} />
//                   </Stack>
//                   {childItem.child && (
//                     <IconButton>
//                       {isSecondChildOpen ? (
//                         <ExpandLessIcon />
//                       ) : (
//                         <ExpandMoreIcon />
//                       )}
//                     </IconButton>
//                   )}
//                 </ListItemButton>
//                 <Collapse
//                   in={isSecondChildOpen}
//                   timeout="auto"
//                   unmountOnExit
//                   sx={{
//                     top: "10px",
//                   }}
//                 >
//                   <Stack
//                     width="100%"
//                     direction="column"
//                     gap={1}
//                     sx={{
//                       pl: 1,
//                       pb: 1,
//                     }}
//                   >
//                     {childItem?.child?.map((childItem, index) => (
//                       <Link key={index} href={""}>
//                         <ListItem disablePadding>
//                           <ListItemButton sx={{ pl: 8 }}>
//                             <ListItemText primary={childItem?.title} />
//                             {}
//                           </ListItemButton>
//                         </ListItem>
//                       </Link>
//                     ))}
//                   </Stack>
//                 </Collapse>
//               </ListItem>
//             </Link>
//           ))}
//         </Stack>
//       </Collapse>
//     </ListItem>
//   );
// };

// export default SidebarItem;

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
    // Split the URL by '/' and filter out any empty strings
    const parts = url.split("/").filter(Boolean);

    // Return the last part
    return parts[parts.length - 1];
  };

  const lastPart = getLastPartOfUrl(pathName);

  return (
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
          <Link href={item?.path ? linkPath : "#"} className="w-full">
            <ListItemText primary={item?.title} />
          </Link>
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
        // sx={{ top: "10px" }}
      >
        <Stack width="100%" direction="column" gap={1}>
          {item?.child?.map((childItem, index) => (
            <Link
              key={index}
              href={`/${childItem?.parentPath || ""}/${childItem?.path || ""}`}
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
                <Collapse
                  in={isSecondChildOpen}
                  timeout="auto"
                  unmountOnExit
                  // sx={{ top: "10px" }}
                >
                  <Stack width="100%" direction="column" gap={1}>
                    {childItem?.child?.map(
                      (grandChildItem, grandChildIndex) => (
                        <Link
                          key={grandChildIndex}
                          href={`/${grandChildItem?.parentPath || ""}/${
                            grandChildItem?.path || ""
                          }`}
                        >
                          <ListItem disablePadding>
                            <ListItemButton sx={{ pl: 8 }}>
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
  );
};

export default SidebarItem;

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { IDrawerItems } from "@/types/common";
import { usePathname } from "next/navigation";

type TItemProps = {
  item: IDrawerItems;
};

const SidebarItem = ({ item }: TItemProps) => {
  const linkPath = `/dashboard/${item?.path}`;
  const pathName = usePathname();
  return (
    <Link href={linkPath}>
      <ListItem
        disablePadding
        sx={{
          ...(linkPath === pathName
            ? { borderRight: "3px solid #1586FD" }
            : {}),
        }}
      >
        <ListItemButton>
          <ListItemIcon>{item?.icon && <item.icon />}</ListItemIcon>
          <ListItemText primary={item?.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItem;

import { USER_ROLE } from "@/constants/role";
import { IDrawerItems, TUserRole } from "@/types/common";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const drawerItems = (role: TUserRole): IDrawerItems[] => {
  const management = "users";
  const content = "content";

  console.log({ role });

  const roleMenus: IDrawerItems[] = [];
  switch (role) {
    case USER_ROLE.DEV_SUPER_ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "User Management",
          is_parent: true,
          parent_Id: "CM001",
        },
        {
          title: "All Users",
          management: "users",
          path: `${role}/${management}/all-users`,
          icon: GroupIcon,
          parent_Id: "CM001",
        },
        {
          title: "Admin",
          icon: DashboardIcon,
          child: [
            {
              title: "Create Super Admin",
              parentPath: `dashboard/${role}/users/admin`,
              path: "create-super-admin",
            },
            {
              title: "Create Admin",
              parentPath: `dashboard/${role}/users/admin`,
              path: "create-admin",
            },
            {
              title: "Manage",
              parentPath: `dashboard/${role}/users/admin`,
              path: "manage",
            },
          ],
        },
        {
          title: "Employee",
          icon: GroupIcon,
          child: [
            {
              title: "Create Employee",
              parentPath: `dashboard/${role}/users/employee`,
              path: "create-employee",
            },
            {
              title: "Manage",
              parentPath: `dashboard/${role}/users/employee`,
              path: "manage-employee",
            },
          ],
        },
        {
          title: "Client",
          path: `${role}/users/client`,
          icon: GroupIcon,
        },
        {
          title: "Settings",
          icon: DashboardIcon,
          child: [
            {
              title: "Address",
              icon: DashboardIcon,
              child: [
                {
                  title: "Country",
                  parentPath: `dashboard/${role}/users/settings/address`,
                  path: "country",
                },
                {
                  title: "Divisition",
                  parentPath: `dashboard/${role}/users/settings/address`,
                  path: "division",
                },
                {
                  title: "District",
                  parentPath: `dashboard/${role}/users/settings/address`,
                  path: "district",
                },
              ],
            },
            {
              title: "Department",
              parentPath: `dashboard/${role}/users/settings`,
              path: "department",
            },
            {
              title: "Designation",
              parentPath: `dashboard/${role}/users/settings`,
              path: "designation",
            },
            {
              title: "Clinet Type",
              parentPath: `dashboard/${role}/users/settings`,
              path: "client-type",
            },
          ],
        },
        {
          title: "Contant Management",
          is_parent: true,
        },
        {
          title: "Menu",
          path: `${role}/${content}/menu`,
          icon: GroupIcon,
        },
        {
          title: "Submenu",
          path: `${role}/${content}/submenu`,
          icon: GroupIcon,
        },
        {
          title: "Webpage",
          path: `${role}/${content}/web-page`,
          icon: GroupIcon,
        },
        {
          title: "W.P Section",
          path: `${role}/${content}/page-section`,
          icon: GroupIcon,
        },
        {
          title: "Blog",
          path: `${role}/${content}/blog`,
          icon: GroupIcon,
        },
        {
          title: "Other",
          icon: GroupIcon,
          child: [
            {
              title: "Hero-Section",
              parentPath: `dashboard/${role}/${content}/others`,
              path: "hero-section",
            },
            {
              title: "Team",
              parentPath: `dashboard/${role}/${content}/others`,
              path: "team",
            },
            {
              title: "Core Value",
              parentPath: `dashboard/${role}/${content}/others`,
              path: "core-value",
            },
            {
              title: "FAQ",
              parentPath: `dashboard/${role}/${content}/others`,
              path: "faq",
            },
            {
              title: "Memories",
              parentPath: `dashboard/${role}/${content}/others`,
              path: "memories",
            },
            {
              title: "Company Videos",
              parentPath: `dashboard/${role}/${content}/others`,
              path: "company-videos",
            },
            {
              title: "Resource Portal",
              parentPath: `dashboard/${role}/${content}/others`,
              path: "resource-portal",
            },
            {
              title: "Forms & Templates",
              parentPath: `dashboard/${role}/${content}/others`,
              path: "forms-&-templates",
            },
          ],
        },
        {
          title: "Contant Settings",
          icon: DashboardIcon,
          child: [
            {
              title: "Address",
              icon: DashboardIcon,
              child: [
                {
                  title: "Country",
                  parentPath: `dashboard/${role}/users/settings/address`,
                  path: "country",
                },
                {
                  title: "Divisition",
                  parentPath: `dashboard/${role}/users/settings/address`,
                  path: "division",
                },
                {
                  title: "District",
                  parentPath: `dashboard/${role}/users/settings/address`,
                  path: "district",
                },
              ],
            },
            {
              title: "department",
              parentPath: `dashboard/${role}/users/settings`,
              path: "Department",
            },
            {
              title: "Designation",
              parentPath: `dashboard/${role}/users/settings`,
              path: "designation",
            },
            {
              title: "Clinet Type",
              parentPath: `dashboard/${role}/users/settings`,
              path: "client-type",
            },
          ],
        }
      );
      break;

    case USER_ROLE.SUPER_ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "User Management",
          is_parent: true,
        },
        {
          title: "All Users",
          management: "users",
          path: `${role}/${management}/all-users`,
          icon: GroupIcon,
        },
        {
          title: "Admin",
          icon: DashboardIcon,
          child: [
            {
              title: "Create Admin",
              parentPath: `dashboard/${role}/users/admin`,
              path: "create-admin",
            },
            {
              title: "Manage",
              parentPath: `dashboard/${role}/users/admin`,
              path: "manage",
            },
          ],
        },
        {
          title: "Employee",
          icon: GroupIcon,
          child: [
            {
              title: "Create Employee",
              parentPath: `dashboard/${role}/users/employee`,
              path: "create-employee",
            },
            {
              title: "Manage",
              parentPath: `dashboard/${role}/users/employee`,
              path: "manage-employee",
            },
          ],
        },
        {
          title: "Client",
          path: `${role}/users/client`,
          icon: GroupIcon,
        },
        {
          title: "Settings",
          icon: DashboardIcon,
          child: [
            {
              title: "Department",
              parentPath: `dashboard/${role}/users/settings`,
              path: "department",
            },
            {
              title: "Designation",
              parentPath: `dashboard/${role}/users/settings`,
              path: "designation",
            },
          ],
        },
        {
          title: "Contant Management",
          is_parent: true,
        },
        {
          title: "Contant Settings",
          icon: DashboardIcon,
          child: [
            {
              title: "Address",
              icon: DashboardIcon,
              child: [
                {
                  title: "Country",
                  parentPath: `dashboard/${role}/users/settings/address`,
                  path: "country",
                },
                {
                  title: "Divisition",
                  parentPath: `dashboard/${role}/users/settings/address`,
                  path: "division",
                },
                {
                  title: "District",
                  parentPath: `dashboard/${role}/users/settings/address`,
                  path: "district",
                },
              ],
            },
            {
              title: "department",
              parentPath: `dashboard/${role}/users/settings`,
              path: "Department",
            },
            {
              title: "Designation",
              parentPath: `dashboard/${role}/users/settings`,
              path: "designation",
            },
            {
              title: "Clinet Type",
              parentPath: `dashboard/${role}/users/settings`,
              path: "client-type",
            },
          ],
        }
      );
      break;

    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}/dashboard`,
          icon: DashboardIcon,
        },
        {
          title: "Schedules",
          path: `${role}/schedules`,
          icon: CalendarMonthIcon,
        },
        {
          title: "Appointments",
          path: `${role}/appointments`,
          icon: BookOnlineIcon,
        }
      );
      break;
    case USER_ROLE.EMPLOYEE:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}/dashboard`,
          icon: DashboardIcon,
        },
        {
          title: "Schedules",
          path: `${role}/schedules`,
          icon: CalendarMonthIcon,
        },
        {
          title: "Appointments",
          path: `${role}/appointments`,
          icon: BookOnlineIcon,
        }
      );
      break;

    case USER_ROLE.CLIENT:
      roleMenus.push(
        {
          title: "Appointments",
          path: `${role}/appointments`,
          icon: BookOnlineIcon,
        },
        {
          title: "Prescriptions",
          path: `${role}/prescriptions`,
          icon: ReceiptLongIcon,
        },
        {
          title: "Payment History",
          path: `${role}/payment-history`,
          icon: AttachMoneyIcon,
        }
      );
      break;

    default:
      break;
  }
  return [...roleMenus];
};

import { USER_ROLE } from "@/constants/role";
import { IDrawerItems, TUserRole } from "@/types/common";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import WebIcon from "@mui/icons-material/Web";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import RateReviewIcon from "@mui/icons-material/RateReview";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import SettingsIcon from "@mui/icons-material/Settings";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import GroupsIcon from "@mui/icons-material/Groups";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CategoryIcon from "@mui/icons-material/Category";
import RuleIcon from "@mui/icons-material/Rule";

export const drawerItems = (role: TUserRole): IDrawerItems[] => {
  const users = "users";
  const content = "content";

  const roleMenus: IDrawerItems[] = [];

  switch (role) {
    case USER_ROLE.DEV_SUPER_ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `/dashboard/${role}`,
          icon: DashboardIcon,
        },
        {
          title: "User Management",
          is_parent: true,
          path: "",
          icon: GroupIcon,
          parent_Id: "CM001",
          child: [
            {
              title: "All Users",
              management: users,
              path: `/dashboard/${role}/${users}/all-users`,
              // path: `all-users`,
              icon: GroupsIcon,
              parent_Id: "CM001",
            },
            // user > admin
            {
              title: "Admin",
              icon: AdminPanelSettingsIcon,
              state: "user_admin",
              child: [
                {
                  title: "Create Super Admin",
                  path: `/dashboard/${role}/${users}/admin/create-super-admin`,
                },
                {
                  title: "Create Admin",
                  path: `/dashboard/${role}/${users}/admin/create-admin`,
                },
                {
                  title: "Manage",
                  path: `/dashboard/${role}/${users}/admin/manage`,
                },
              ],
            },
            // user > employee
            {
              title: "Employee",
              icon: GroupIcon,
              state: "user_employee",
              child: [
                {
                  title: "Create Employee",
                  path: `/dashboard/${role}/${users}/employee/create-employee`,
                },
                {
                  title: "Manage",
                  path: `/dashboard/${role}/${users}/employee/manage`,
                },
              ],
            },
            // user > client
            {
              title: "Client",
              path: `/dashboard/${role}/${users}/client`,
              icon: HowToRegIcon,
            },
            // user > settings
            {
              title: "Settings",
              icon: SettingsIcon,
              state: "UserSettings",
              child: [
                {
                  title: "Address",
                  state: "user_address",
                  child: [
                    {
                      title: "Country",
                      path: `/dashboard/${role}/${users}/settings/address/country`,
                    },
                    {
                      title: "Division",
                      path: `/dashboard/${role}/${users}/settings/address/division`,
                    },
                    {
                      title: "District",
                      path: `/dashboard/${role}/${users}/settings/address/district`,
                    },
                  ],
                },
                {
                  title: "Department",
                  path: `/dashboard/${role}/${users}/settings/department`,
                },
                {
                  title: "Designation",
                  path: `/dashboard/${role}/${users}/settings/designation`,
                },
                {
                  title: "Client Type",
                  path: `/dashboard/${role}/${users}/settings/client-type`,
                },
              ],
            },
          ],
        },

        // content management
        {
          title: "Content Management",
          is_parent: true,
          path: "",
          icon: MenuBookIcon,
          parent_Id: "CM002",
          child: [
            {
              title: "Menu",
              path: `${role}/${content}/menu`,
              icon: MenuIcon,
            },
            {
              title: "Submenu",
              path: `${role}/${content}/submenu`,
              icon: MenuOpenIcon,
            },
            {
              title: "Webpage",
              path: `${role}/${content}/web-page`,
              icon: WebIcon,
            },
            {
              title: "W.P Section (single)",
              path: `${role}/${content}/page-section/single`,
              icon: WebAssetIcon,
            },
            {
              title: "W.P Section (multiple)",
              path: `${role}/${content}/page-section/multiple`,
              icon: WebAssetIcon,
            },
            {
              title: "Articles",
              path: `${role}/${content}/articles`,
              icon: RateReviewIcon,
            },
            // content > others
            {
              title: "Others",
              icon: DevicesOtherIcon,
              state: "content_others",
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
                  title: "FAQ",
                  parentPath: `dashboard/${role}/${content}/others`,
                  path: "faq",
                },
              ],
            },
            // content > settings
            {
              title: "Settings",
              icon: SettingsIcon,
              state: "content_settings",
              child: [
                // content > settings > category
                {
                  title: "Category",
                  parentPath: `dashboard/${role}/${content}/settings`,
                  path: "category",
                },
                {
                  title: "Authority",
                  parentPath: `dashboard/${role}/${content}/settings`,
                  path: "authority",
                },
              ],
            },
          ],
        }
      );
      break;

    // SUPER ADMIN ============================000===========================
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
          path: `${role}/${users}/all-users`,
          icon: GroupsIcon,
        },
        {
          title: "Admin",
          icon: AdminPanelSettingsIcon,
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
          icon: HowToRegIcon,
        },
        {
          title: "Settings",
          icon: SettingsIcon,
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
          icon: SettingsIcon,
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

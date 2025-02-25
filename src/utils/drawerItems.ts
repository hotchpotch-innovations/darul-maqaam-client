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
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

export const drawerItems = (role: TUserRole): IDrawerItems[] => {
  const users = "users";
  const content = "content";
  const organization = "organization";

  const roleMenus: IDrawerItems[] = [];

  switch (role) {
    case USER_ROLE.DEV_SUPER_ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `/dashboard/${role}`,
          management: "no-management",
          icon: DashboardIcon,
        },
        // user management
        {
          title: "User Management",
          is_parent: true,
          management: users,
          icon: GroupIcon,
          parent_Id: "CM001",
          child: [
            {
              title: "All Users",
              management: users,
              path: `/dashboard/${role}/${users}/all-users`,
              // path: `all-users`,
              icon: GroupsIcon,
              identifier: "/all-users",
              parent_Id: "CM001",
            },
            // user > admin
            {
              title: "Admin",
              icon: AdminPanelSettingsIcon,
              state: "user_admin",
              identifier: "/admin",
              child: [
                {
                  title: "Create Super Admin",
                  path: `/dashboard/${role}/${users}/admin/create-super-admin`,
                  identifier: "/create-super-admin",
                },
                {
                  title: "Create Admin",
                  path: `/dashboard/${role}/${users}/admin/create-admin`,
                  identifier: "/create-admin",
                },
                {
                  title: "Manage",
                  path: `/dashboard/${role}/${users}/admin/manage`,
                  identifier: "/admin/manage",
                },
              ],
            },
            // user > employee
            {
              title: "Employee",
              icon: GroupIcon,
              state: "user_employee",
              identifier: "/employee",
              child: [
                {
                  title: "Create Employee",
                  path: `/dashboard/${role}/${users}/employee/create-employee`,
                  identifier: "/create-employee",
                },
                {
                  title: "Manage",
                  path: `/dashboard/${role}/${users}/employee/manage`,
                  identifier: "/employee/manage",
                },
              ],
            },
            // user > client
            {
              title: "Client",
              path: `/dashboard/${role}/${users}/client`,
              identifier: "/client",
              icon: HowToRegIcon,
            },
          ],
        },

        // content management
        {
          title: "Content Management",
          is_parent: true,
          management: content,
          icon: MenuBookIcon,
          parent_Id: "CM002",
          child: [
            {
              title: "Menu",
              path: `/dashboard/${role}/${content}/menu`,
              identifier: "/menu",
              icon: MenuIcon,
            },
            {
              title: "Submenu",
              path: `/dashboard/${role}/${content}/submenu`,
              icon: MenuOpenIcon,
              identifier: "/submenu",
            },
            {
              title: "Webpage",
              path: `/dashboard/${role}/${content}/web-page`,
              icon: WebIcon,
              identifier: "/web-page",
            },
            {
              title: "W.P Section (single)",
              path: `/dashboard/${role}/${content}/page-section/single`,
              icon: WebAssetIcon,
              identifier: "/page-section/single",
            },
            {
              title: "W.P Section (multiple)",
              path: `/dashboard/${role}/${content}/page-section/multiple`,
              icon: WebAssetIcon,
              identifier: "/page-section/multiple",
            },
            {
              title: "Articles",
              path: `/dashboard/${role}/${content}/articles`,
              icon: RateReviewIcon,
              identifier: "/articles",
            },
            // content > others
            {
              title: "Others",
              icon: DevicesOtherIcon,
              state: "content_others",
              identifier: `/${content}/others`,
              child: [
                // {
                //   title: "Hero-Section",
                //   path: `/dashboard/${role}/${content}/others/hero-section`,
                //   identifier: "/hero-section",
                // },
                {
                  title: "Team",
                  path: `/dashboard/${role}/${content}/others/team`,
                  identifier: "/team",
                },
                {
                  title: "FAQ",
                  path: `/dashboard/${role}/${content}/others/faq`,
                  identifier: "/faq",
                },
                {
                  title: "Forms & Templates",
                  path: `/dashboard/${role}/${content}/others/forms`,
                  identifier: "/forms",
                },
              ],
            },
            // content > settings
            {
              title: "Settings",
              icon: SettingsIcon,
              state: "content_settings",
              identifier: `/${content}/settings`,
              child: [
                // content > settings > category
                {
                  title: "Category",
                  path: `/dashboard/${role}/${content}/settings/category`,
                  identifier: "/category",
                },
                {
                  title: "Authority",
                  path: `/dashboard/${role}/${content}/settings/authority`,
                  identifier: "/authority",
                },
              ],
            },
          ],
        },
        // Org management
        {
          title: "Org. Management",
          is_parent: true,
          management: organization,
          icon: CorporateFareIcon,
          parent_Id: "CM003",
          child: [
            // Org > settings
            {
              title: "Settings",
              icon: SettingsIcon,
              state: "org_settings",
              identifier: `/${organization}/settings`,
              child: [
                // Org > settings > business
                {
                  title: "Address",
                  state: "user_address",
                  identifier: "/address",
                  child: [
                    {
                      title: "Country",
                      path: `/dashboard/${role}/${organization}/settings/address/country`,
                      identifier: "/country",
                    },
                    {
                      title: "Division",
                      path: `/dashboard/${role}/${organization}/settings/address/division`,
                      identifier: "/division",
                    },
                    {
                      title: "District",
                      path: `/dashboard/${role}/${organization}/settings/address/district`,
                      identifier: "/district",
                    },
                  ],
                },
                {
                  title: "Department",
                  path: `/dashboard/${role}/${organization}/settings/department`,
                  identifier: "/department",
                },
                {
                  title: "Designation",
                  path: `/dashboard/${role}/${organization}/settings/designation`,
                  identifier: "/designation",
                },
                {
                  title: "Client Type",
                  path: `/dashboard/${role}/${organization}/settings/c_type`,
                  identifier: "/c_type",
                },
                {
                  title: "Branch",
                  path: `/dashboard/${role}/${organization}/settings/branch`,
                  identifier: "/branch",
                },
                {
                  title: "Manage",
                  path: `/dashboard/${role}/${organization}/settings/manage`,
                  identifier: `/manage`,
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
          path: `/dashboard/${role}`,
          management: "no-management",
          icon: DashboardIcon,
        },
        // user management
        {
          title: "User Management",
          is_parent: true,
          management: users,
          icon: GroupIcon,
          parent_Id: "CM001",
          child: [
            {
              title: "All Users",
              management: users,
              path: `/dashboard/${role}/${users}/all-users`,
              // path: `all-users`,
              icon: GroupsIcon,
              identifier: "/all-users",
              parent_Id: "CM001",
            },
            // user > admin
            {
              title: "Admin",
              icon: AdminPanelSettingsIcon,
              state: "user_admin",
              identifier: "/admin",
              child: [
                {
                  title: "Create Admin",
                  path: `/dashboard/${role}/${users}/admin/create-admin`,
                  identifier: "/create-admin",
                },
                {
                  title: "Manage",
                  path: `/dashboard/${role}/${users}/admin/manage`,
                  identifier: "/admin/manage",
                },
              ],
            },
            // user > employee
            {
              title: "Employee",
              icon: GroupIcon,
              state: "user_employee",
              identifier: "/employee",
              child: [
                {
                  title: "Create Employee",
                  path: `/dashboard/${role}/${users}/employee/create-employee`,
                  identifier: "/create-employee",
                },
                {
                  title: "Manage",
                  path: `/dashboard/${role}/${users}/employee/manage`,
                  identifier: "/employee/manage",
                },
              ],
            },
            // user > client
            {
              title: "Client",
              path: `/dashboard/${role}/${users}/client`,
              identifier: "/client",
              icon: HowToRegIcon,
            },
          ],
        },

        // content management
        {
          title: "Content Management",
          is_parent: true,
          management: content,
          icon: MenuBookIcon,
          parent_Id: "CM002",
          child: [
            {
              title: "Menu",
              path: `/dashboard/${role}/${content}/menu`,
              identifier: "/menu",
              icon: MenuIcon,
            },
            {
              title: "Submenu",
              path: `/dashboard/${role}/${content}/submenu`,
              icon: MenuOpenIcon,
              identifier: "/submenu",
            },
            {
              title: "Webpage",
              path: `/dashboard/${role}/${content}/web-page`,
              icon: WebIcon,
              identifier: "/web-page",
            },
            {
              title: "W.P Section (single)",
              path: `/dashboard/${role}/${content}/page-section/single`,
              icon: WebAssetIcon,
              identifier: "/page-section/single",
            },
            {
              title: "W.P Section (multiple)",
              path: `/dashboard/${role}/${content}/page-section/multiple`,
              icon: WebAssetIcon,
              identifier: "/page-section/multiple",
            },
            {
              title: "Articles",
              path: `/dashboard/${role}/${content}/articles`,
              icon: RateReviewIcon,
              identifier: "/articles",
            },
            // content > others
            {
              title: "Others",
              icon: DevicesOtherIcon,
              state: "content_others",
              identifier: `/${content}/others`,
              child: [
                {
                  title: "Team",
                  path: `/dashboard/${role}/${content}/others/team`,
                  identifier: "/team",
                },
                {
                  title: "FAQ",
                  path: `/dashboard/${role}/${content}/others/faq`,
                  identifier: "/faq",
                },
                {
                  title: "Forms & Templates",
                  path: `/dashboard/${role}/${content}/others/forms`,
                  identifier: "/forms",
                },
              ],
            },
            // content > settings
            {
              title: "Settings",
              icon: SettingsIcon,
              state: "content_settings",
              identifier: `/${content}/settings`,
              child: [
                // content > settings > category
                {
                  title: "Category",
                  path: `/dashboard/${role}/${content}/settings/category`,
                  identifier: "/category",
                },
                {
                  title: "Authority",
                  path: `/dashboard/${role}/${content}/settings/authority`,
                  identifier: "/authority",
                },
              ],
            },
          ],
        },
        // Org management
        {
          title: "Org. Management",
          is_parent: true,
          management: organization,
          icon: CorporateFareIcon,
          parent_Id: "CM003",
          child: [
            // Org > settings
            {
              title: "Settings",
              icon: SettingsIcon,
              state: "org_settings",
              identifier: `/${organization}/settings`,
              child: [
                {
                  title: "Department",
                  path: `/dashboard/${role}/${organization}/settings/department`,
                  identifier: "/department",
                },
                {
                  title: "Designation",
                  path: `/dashboard/${role}/${organization}/settings/designation`,
                  identifier: "/designation",
                },
                {
                  title: "Branch",
                  path: `/dashboard/${role}/${organization}/settings/branch`,
                  identifier: "/branch",
                },
                {
                  title: "Manage",
                  path: `/dashboard/${role}/${organization}/settings/manage`,
                  identifier: `/manage`,
                },
              ],
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

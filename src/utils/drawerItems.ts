import { USER_ROLE } from "@/constants/role";
import { IDrawerItems, TUserRole } from "@/types/common";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReviewsIcon from "@mui/icons-material/Reviews";
import TryIcon from "@mui/icons-material/Try";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const drawerItems = (role: TUserRole): IDrawerItems[] => {
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
          title: "All Users",
          path: `${role}/users/all-users`,
          icon: GroupIcon,
        },
        {
          title: "Admin",
          path: ``,
          icon: DashboardIcon,
          child: [
            {
              title: "Create Super Admin",
              parentPath: "admin",
              path: `${role}/admin/create-super-admin`,
            },
            {
              title: "Create  Admin",
              parentPath: "admin",
              path: `${role}/admin/create-super-admin`,
            },
            {
              title: "Create Super employee",
              parentPath: "admin",
              path: `${role}/admin/create-super-admin`,
            },
          ],
        },
        {
          title: "All people",
          path: ``,
          icon: GroupIcon,
          child: [
            {
              title: "option 1",
              parentPath: "admin",
              path: `${role}/admin/create-super-admin`,
            },
            {
              title: "option 2",
              parentPath: "admin",
              path: `${role}/admin/create-super-admin`,
            },
            {
              title: "option 3",
              parentPath: "admin",
              path: ``,
              child: [
                {
                  title: " Admin",
                  parentPath: "admin",
                  path: `${role}/admin/create-super-admin`,
                },
                {
                  title: "Create  Admin",
                  parentPath: "admin",
                  path: `${role}/admin/create-super-admin`,
                },
                {
                  title: "employee",
                  parentPath: "admin",
                  path: `${role}/admin/last-item`,
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
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Specialties",
          path: `${role}/specialties`,
          icon: TryIcon,
          child: [
            {
              title: "admin1",
              path: "",
            },
            {
              title: "admin2",
              path: "",
            },
            {
              title: "admin3",
              path: "",
              child: [
                {
                  title: "three",
                  path: "",
                },
                {
                  title: "three1",
                  path: "",
                },
                {
                  title: "three2",
                  path: "",
                },
                {
                  title: "three3",
                  path: "",
                },
              ],
            },
          ],
        },
        {
          title: "Doctors",
          path: `${role}/doctors`,
          icon: MedicalInformationIcon,
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
        },
        {
          title: "Reviews",
          path: `${role}/reviews`,
          icon: ReviewsIcon,
        }
      );
      break;

    case USER_ROLE.EMPLOYEE:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Schedules",
          path: `${role}/schedules`,
          icon: CalendarMonthIcon,
        },
        {
          title: "Appointments",
          path: `${role}/appointment`,
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

"use client";

import { getUserInfoFromLocalStorage } from "@/services/auth.Services.Loacl";

const user_info = getUserInfoFromLocalStorage();
const user_role = user_info?.role?.toLowerCase();

type TNavbarItem = {
  id: string;
  name: string;
  path: string;
};

const loginItem: TNavbarItem = {
  id: "12",
  name: "Login",
  path: "/login",
};

const dashboardItem: TNavbarItem = {
  id: "11",
  name: "Dashboard",
  path: `/dashboard/${user_role}`,
};

export const navbarItem: TNavbarItem[] = [
  {
    id: "1",
    name: "home",
    path: "/",
  },
  {
    id: "2",
    name: "about",
    path: "/about",
  },
  {
    id: "3",
    name: "projects",
    path: "/projects",
  },
  {
    id: "4",
    name: "ongoing projects",
    path: "/ongoing-projects",
  },
  {
    id: "6",
    name: "gallery",
    path: "/gallery",
  },
  {
    id: "7",
    name: "video",
    path: "/video",
  },
  {
    id: "8",
    name: "volunteer registration",
    path: "/volunteer",
  },
  {
    id: "9",
    name: "news",
    path: "/news",
  },
  {
    id: "10",
    name: "contact",
    path: "/contact",
  },
  user_info && user_role ? dashboardItem : loginItem,
];

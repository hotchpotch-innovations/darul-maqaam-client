"use client";

type TNavbarItem = {
  id: string;
  name: string;
  path: string;
};

export const navbarItem: TNavbarItem[] = [
  {
    id: "1",
    name: "Home",
    path: "/",
  },
  {
    id: "2",
    name: "About",
    path: "/about",
  },
  {
    id: "3",
    name: "Projects",
    path: "/projects",
  },
  {
    id: "4",
    name: "Ongoing Projects",
    path: "/ongoing-projects",
  },
  {
    id: "6",
    name: "Gallery",
    path: "/gallery",
  },
  {
    id: "7",
    name: "Video",
    path: "/video",
  },
  {
    id: "8",
    name: "Volunteer Registration",
    path: "/volunteer",
  },
  {
    id: "9",
    name: "News",
    path: "/news",
  },
  {
    id: "10",
    name: "Contact",
    path: "/contact",
  },
];

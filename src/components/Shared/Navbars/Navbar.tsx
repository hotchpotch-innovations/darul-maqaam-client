"use client";

import { navbarItem } from "../../../../public/data/NavbarData";
import { Container, Stack } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import logo from "../../../../public/primary_logo.png";
import { usePathname } from "next/navigation";
import AuthButton from "./AuthButton";
import DashboardButton from "./DashboardButton";
import { getUserInfoFromLocalStorage } from "@/services/auth.Services.Loacl";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathNameDM = usePathname();
  const userInfo = getUserInfoFromLocalStorage();

  const userRole = userInfo?.role;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Stack
      bgcolor={"secondary.main"}
      borderColor={"white"}
      py={2}
      zIndex={1500}
    >
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Link href={"/"}>
            <Image src={logo} alt="Website Logo" height={100} width={100} />
          </Link>
          <div>
            <ul className=" hidden gap-6 lg:gap-6 lg:inline-flex">
              {navbarItem.map((item) => (
                <li key={item?.id}>
                  <Link
                    href={item.path}
                    className={`link ${
                      item?.path === pathNameDM
                        ? "text-green-500"
                        : " hover:text-green-500"
                    }`}
                  >
                    {item?.name}{" "}
                  </Link>
                </li>
              ))}

              {!!userRole && <DashboardButton role={userRole} />}
              <AuthButton />
            </ul>
            <span
              onClick={() => setShowMenu(!showMenu)}
              className="inline-flex items-center justify-center w-10 h-10 text-xl rounded-full cursor-pointer lg:hidden text-designColor"
            >
              <MenuIcon />
            </span>
            {showMenu && (
              <div className="w-[80%] h-screen overflow-scroll z-[999] absolute top-0 left-0 bg-[#00712D] opacity-95 p-4 scrollbar-hide">
                <div className="relative flex flex-col gap-8 py-2">
                  <ul className="flex flex-col gap-4">
                    {navbarItem.map((item) => (
                      <li key={item?.id}>
                        <Link
                          className="capitalize text-white"
                          href={item?.path}
                        >
                          {item?.name}{" "}
                        </Link>
                      </li>
                    ))}

                    {!!userRole && <DashboardButton role={userRole} />}

                    <AuthButton />
                  </ul>
                  <span
                    onClick={() => setShowMenu(false)}
                    className="absolute text-2xl text-white duration-300 cursor-pointer top-4 right-4 "
                  >
                    <CloseIcon />
                  </span>
                </div>
              </div>
            )}
          </div>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Navbar;

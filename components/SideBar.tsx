"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import SideBarItem from "./SideBarItem";
import Library from "./Library";
import { Song } from "@/types";

interface SideBarProps {
  children: React.ReactNode;
  songs: Song[];
}

const SideBar = ({ children, songs }: SideBarProps) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <div className="h-full flex">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div
            className="
                flex 
                flex-col
                items-center 
                gap-y-4 
                px-4 
                py-5"
          >
            {routes.map((item) => (
              <SideBarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className=" overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className=" h-full flex-1 overflow-y-auto p-2 sm:px-0 sm:py-2">
        {children}
      </main>
    </div>
  );
};

export default SideBar;

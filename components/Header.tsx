"use client";

import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  const router = useRouter();
  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-6",
        className
      )}
    >
      <div className=" w-full mb-4 flex items-center justify-between">
        {/* non-mobile naviagtion */}
        <div className=" hidden md:flex items-center gap-x-2">
          <button
            onClick={() => router.back()}
            className=" rounded-full bg-black flex justify-center items-center hover:opacity-75 transition"
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            onClick={() => router.forward()}
            className=" rounded-full bg-black flex justify-center items-center hover:opacity-75 transition"
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>

        {/* mobile navigation */}
        <div className=" md:hidden flex gap-x-2 items-center">
          <button
            onClick={() => router.push("/")}
            className=" rounded-full p-2 bg-white flex items-center hover:opacity-75 transition"
          >
            <HiHome size={20} className="text-black" />
          </button>
          <button
            onClick={() => router.push("/search")}
            className=" rounded-full p-2 bg-white flex items-center hover:opacity-75 transition"
          >
            <BiSearch size={20} className="text-black" />
          </button>
        </div>
        <div className=" flex justify-between items-center gap-x-4">
          <>
            <div>
              <Button
                onClick={() => {}}
                className=" bg-transparent text-neutral-300 font-medium"
              >
                Sign up{" "}
              </Button>
            </div>
            <div>
              <Button onClick={() => {}} className="bg-white px-6 py-2">
                Log in
              </Button>
            </div>
          </>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;

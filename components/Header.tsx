"use client";

import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  const router = useRouter();
  const { onOpen } = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };

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
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              {/* <Button
                onClick={() => router.push("/account")}
                className="bg-white hover:bg-green-500 hover:opacity-100"
              >
                <FaUserAlt />
              </Button> */}
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={onOpen}
                  className=" bg-transparent text-neutral-300 font-medium"
                >
                  Sign up{" "}
                </Button>
              </div>
              <div>
                <Button onClick={onOpen} className="bg-white px-6 py-2">
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;

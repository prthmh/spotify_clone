"use client";

import { MyUserCOntextProvider } from "@/hooks/useUser";

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserProviderProps) => {
  return <MyUserCOntextProvider>{children}</MyUserCOntextProvider>;
};

export default UserProvider;

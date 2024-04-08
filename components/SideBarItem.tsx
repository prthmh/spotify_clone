import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SideBarProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}
const SideBarItem = ({ icon: Icon, label, active, href }: SideBarProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `
                flex
                flex-row
                h-auto
                items-center
                w-full
                text-base
                gap-x-4
                font-medium
                cursor-pointer
                hover:text-white
                transition
                text-neutral-400
                py-1`,
        active && "text-white"
      )}
    >
      <Icon size={26} />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SideBarItem;

"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";

import MediaItem from "./MediaItem";

interface LibraryProps {
  songs: Song[];
}

const Library = ({ songs }: LibraryProps) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div className=" flex items-center justify-between px-5 py-4">
        <div className=" inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className=" text-neutral-400" />
          <p className="text-neutral-400 font-medium text-base">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={26}
          className=" text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className=" flex flex-col mt-4 px-3 gap-y-2">
        {songs.map((item) => (
          <MediaItem key={item.id} onClick={() => {}} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Library;

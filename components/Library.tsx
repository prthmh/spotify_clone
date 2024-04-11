"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";

import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import Button from "./Button";

interface LibraryProps {
  songs: Song[];
}

const Library = ({ songs }: LibraryProps) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const onPlay = useOnPlay(songs);

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
      {!user && (
        <div className=" flex flex-col items-center gap-y-8 p-8">
          <div className="text-neutral-400/50">Log in to see/add songs.</div>
          <Button onClick={() => authModal.onOpen()}>Login</Button>
        </div>
      )}
      {user && songs.length === 0 ? (
        <div className=" flex flex-col items-center gap-y-8 p-8">
          <div className="text-neutral-400/50">Add your songs.</div>
          <Button onClick={() => uploadModal.onOpen()}>Add Song</Button>
        </div>
      ) : (
        <div className=" flex flex-col mt-4 px-3 gap-y-2">
          {songs.map((item) => (
            <MediaItem
              key={item.id}
              onClick={(id: string) => onPlay(id)}
              data={item}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;

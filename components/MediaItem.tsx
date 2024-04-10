"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
  onClick?: (id: string) => void;
  data: Song;
}

const MediaItem = ({ onClick, data }: MediaItemProps) => {
  const imageURL = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
  };
  return (
    <div
      onClick={handleClick}
      className=" flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className=" relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          src={imageURL || "/images/music-placehoder.png"}
          alt="media item"
          className="object-cover"
          fill
        />
      </div>
      <div className=" flec flex-col gap-y-1 overflow-hidden">
        <p className=" text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">By {data.author}</p>
      </div>
    </div>
  );
};

export default MediaItem;

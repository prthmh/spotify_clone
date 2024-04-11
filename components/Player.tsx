"use client";

import { Song } from "@/types";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongURL from "@/hooks/useLoadSongURL";
import usePlayer from "@/hooks/usePlayer";

import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activateId);
  const songURL = useLoadSongURL(song as Song);

  if (!player.activateId || !song || !songURL) {
    return null;
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent key={songURL} song={song} songURL={songURL} />
    </div>
  );
};

export default Player;

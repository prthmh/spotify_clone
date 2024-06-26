"use client";

import ReactHowler from "react-howler";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";
import { formatSecondsToMinSec } from "@/utils/formatSecondsToMinSec";

interface PlayerContentProps {
  song: Song;
  songURL: string;
}

const PlayerContent = ({ song, songURL }: PlayerContentProps) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const howlerRef = useRef<ReactHowler>(null);
  const [progress, setProgress] = useState(0);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activateId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activateId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  function handlePlay() {
    if (!isPlaying) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }

  function toggleMute() {
    if (volume === 0) {
      setVolume(0.5);
    } else {
      setVolume(0);
    }
  }

  function updateProgress(value?: number) {
    if (howlerRef.current) {
      if (typeof value === "undefined") {
        var seek = howlerRef.current.seek();
      } else {
        var seek = howlerRef.current.seek(value);
      }
      setProgress(seek);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updateProgress();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <ReactHowler
        src={songURL}
        html5={true}
        playing={isPlaying}
        volume={volume}
        onEnd={() => {
          onPlayNext();
        }}
        format={["mp3"]}
        ref={howlerRef}
      />
      {/* Desktop player */}
      <div className="hidden md:grid md:grid-cols-3 h-full">
        <div className="flex w-full justify-start">
          <div className="flex items-center gap-x-4">
            <MediaItem data={song} />
            <LikeButton songId={song.id} />
          </div>
        </div>

        {/* buttons and progress bar */}
        <div className="flex flex-col w-full">
          <div className="hidden h-full md:flex justify-center items-center w-full max-w-3xl gap-x-6">
            <AiFillStepBackward
              onClick={onPlayPrevious}
              size={30}
              className="text-neutral-400 cursor-pointer hover:text-white transition"
            />
            <div
              onClick={handlePlay}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
            >
              <Icon size={30} className="text-black" />
            </div>
            <AiFillStepForward
              onClick={onPlayNext}
              size={30}
              className="text-neutral-400 cursor-pointer hover:text-white transition"
            />
          </div>
          <div className="flex flex-row w-full items-center justify-center gap-2 text-xs sm:text-sm">
            <span>{formatSecondsToMinSec(progress)}</span>
            <Slider
              value={progress}
              onChange={(value) => {
                setIsPlaying(false);
                updateProgress(value);
              }}
              onCommit={() => {
                setIsPlaying(true);
              }}
              max={howlerRef.current?.duration()}
              step={1}
              defaultValue={0}
            />
            <span>{formatSecondsToMinSec(howlerRef.current?.duration()!)}</span>
          </div>
        </div>

        <div className="hidden md:flex w-full justify-end pr-2">
          <div className="flex items-center gap-x-2 w-[120px]">
            <VolumeIcon
              onClick={toggleMute}
              className="cursor-pointer"
              size={34}
            />
            <Slider value={volume} onChange={(value) => setVolume(value)} />
          </div>
        </div>
      </div>
      {/* Mobile player */}
      <div className="flex flex-col md:hidden h-full">
        <div className="flex w-full items-center">
          <div className="flex items-center gap-x-4">
            <MediaItem data={song} />
            <LikeButton songId={song.id} />
          </div>
          <div className="flex w-full justify-end">
            <div
              onClick={handlePlay}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
            >
              <Icon size={25} className="text-black" />
            </div>
          </div>
        </div>

        {/* Mobile Progress bar  */}
        <div className="flex flex-row items-center justify-center gap-2 text-xs sm:text-sm absolute top-[-20px] w-full left-0">
          {/* <span>{formatSecondsToMinSec(progress)}</span> */}

          <Slider
            value={progress}
            onChange={(value) => {
              setIsPlaying(false);
              updateProgress(value);
            }}
            onCommit={() => {
              setIsPlaying(true);
            }}
            max={howlerRef.current?.duration()}
            step={1}
            defaultValue={0}
          />
          {/* <span>{formatSecondsToMinSec(howlerRef.current?.duration()!)}</span> */}
        </div>
      </div>
    </>
  );
};

export default PlayerContent;

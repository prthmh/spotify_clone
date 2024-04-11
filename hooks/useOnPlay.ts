import { Song } from "@/types";
import useAuthModal from "./useAuthModal";
import usePlayer from "./usePlayer";
import { useUser } from "./useUser";

function useOnPlay(songs: Song[]) {
  const authModal = useAuthModal();
  const player = usePlayer();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
}

export default useOnPlay;

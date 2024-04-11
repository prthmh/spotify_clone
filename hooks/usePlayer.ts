import { create } from "zustand";

interface PlayerProps {
  ids: string[];
  activateId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerProps>((set) => ({
  ids: [],
  activateId: undefined,
  setId: (id: string) => set({ activateId: id }),
  setIds: (ids: string[]) => set({ ids: ids }),
  reset: () => set({ ids: [], activateId: undefined }),
}));

export default usePlayer;

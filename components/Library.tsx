import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

const Library = () => {
  const onCLick = () => {
    //handle upload
  };
  return (
    <div className="flex flex-col">
      <div className=" flex items-center justify-between px-5 py-4">
        <div className=" inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className=" text-neutral-400" />
          <p className="text-neutral-400 font-medium text-base">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onCLick}
          size={26}
          className=" text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className=" flex flex-col mt-4 px-3 gap-y-2">List of Songs!</div>
    </div>
  );
};

export default Library;

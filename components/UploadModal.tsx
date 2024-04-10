"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import uniqid from "uniqid";
import toast from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const songFile = values.song?.[0];
      const imageFile = values.image?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Empty Fields");
        return;
      }

      const uniqueID = uniqid();

      //song upload
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        setIsLoading(false);
        toast.error("Failed to upload song");
        return;
      }

      //image upload
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uniqueID}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        toast.error("Failed to upload image");
        return;
      }

      //create record
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        toast.error(supabaseError.message);
        return;
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song created!");
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Add a Song"
        description="Upload an mp3 file"
        isOpen={uploadModal.isOpen}
        onChange={onChange}
      >
        {isLoading && (
          <div className=" w-full flex justify-center">
            <div className="bg-white px-2 py-1 font-semibold text-xl text-black w-fit rounded-lg mb-2">
              Loading...
            </div>
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col gap-y-4"
        >
          <Input
            id="title"
            disabled={isLoading}
            placeholder="Song title"
            {...register("title", { required: true })}
          />
          <Input
            id="author"
            disabled={isLoading}
            placeholder="Song author"
            {...register("author", { required: true })}
          />
          <div>
            <div className=" pb-1">Select a song file</div>
            <Input
              id="song"
              type="file"
              accept=".mp3"
              disabled={isLoading}
              {...register("song", { required: true })}
            />
          </div>
          <div>
            <div className="pb-1">Select an image</div>
            <Input
              id="image"
              type="file"
              accept="image/*"
              disabled={isLoading}
              {...register("image", { required: true })}
            />
          </div>
          <Button disabled={isLoading} type="submit" className="text-white">
            Create
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default UploadModal;

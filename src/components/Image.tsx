import { Icon } from "@iconify/react";
import React from "react";



interface IImageProps {
  id: string
  url: string
  allowDelete: boolean
  onRemove: (id: string) => void;
}



export const Image = React.memo(
  ({ url, allowDelete, onRemove, id }: IImageProps) => {
    console.log("Image")

    return (
      <div className="w-full aspect-square rounded-lg border border-black relative overflow-hidden group">
        <img src={url} alt="" className="w-full h-full object-cover object-center" />

        {allowDelete &&
          <div className="absolute top-0 left-0 right-0 bottom-0 hidden group-hover:block">
            <button
              onClick={() => onRemove(id)}
              className="w-full h-full bg-gray-200/80 flex flex-col justify-center items-center cursor-pointer"
            >
              <Icon icon="ic:baseline-delete" width={24} height={24} color="red" />
            </button>
          </div>
        }
      </div>
    );
  }
)





interface IImageUploadeProps {
  onUpload: (files: FileList | null) => void
}

export function ImageUploader({ onUpload }: IImageUploadeProps) {
  return (
    <div className="w-full aspect-square rounded-lg border border-black relative overflow-hidden">
      <label className="w-full h-full bg-gray-200 flex flex-col justify-center items-center cursor-pointer">
        <Icon icon="ic:baseline-upload" width={24} height={24} color="black" />
        <input
          type="file"
          multiple
          hidden
          onChange={(e) => onUpload(e.currentTarget.files)}
        />
      </label>
    </div>
  );
}
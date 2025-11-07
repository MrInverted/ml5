import React from "react";
import { WithState } from "@mr.inverted/utils";

import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { useStore } from "@/store/zustand";
import { Image, ImageUploader } from "./Image";



interface IImage {
  id: string
  name: string
  url: string
  size: number
}

interface IProps {
  id: string
  onRemove: (id: string) => void;
}



export const ImageClass = React.memo(
  ({ id, onRemove }: IProps) => {
    const isTrained = useStore((s) => s.isTrained);
    const [images, setImages] = React.useState<IImage[]>([]);

    const onAdImages = (files: FileList | null) => {
      if (!files) return;

      const newImages: IImage[] = Array.from(files)
        .map((file) => ({
          name: file.name,
          size: file.size,
          id: window.crypto.randomUUID(),
          url: URL.createObjectURL(file)
        }))

      setImages((prev) => prev
        .concat(newImages)
        .filter(
          (item, index, array) =>
            index === array.findIndex((img) => img.name === item.name && img.size === item.size)
        )
      );
    }

    const onRemoveImage = React.useCallback((id: string) => {
      setImages((prev) => prev.filter((item) => item.id !== id));
    }, [])

    console.log("ImageClass")

    return (
      <div className="border border-black p-3 rounded-lg jsImageClass">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-5">
            <div>
              <WithState initialState={{ value: "" }}>
                {({ value }, setValue) =>
                  <Input value={value} onChange={(e) => setValue("value", e.target.value)} readOnly={isTrained} />
                }
              </WithState>
            </div>

            {!isTrained &&
              <Button variant="red" onClick={() => onRemove(id)}>
                Delete
              </Button>
            }
          </div>

          <ul className="grid grid-cols-8 gap-2">
            {images.map(({ id, url }) =>
              <li key={id}>
                <Image url={url} onRemove={onRemoveImage} id={id} allowDelete={!isTrained} />
              </li>
            )}
            {!isTrained &&
              <li>
                <ImageUploader onUpload={(files) => onAdImages(files)} />
              </li>
            }
          </ul>
        </div>
      </div>
    );
  }
)  
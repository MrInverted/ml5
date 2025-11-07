import React from "react";
import toast from "react-hot-toast";
import { useStore } from "@/store/zustand";

import { Button } from "@/ui/Button";
import { useML5 } from "@/hooks/useML5";
import { Image, ImageUploader } from "./Image";



export function Predictor() {
  const { guessResult } = useML5();
  const isTrained = useStore((s) => s.isTrained);
  const [image, setImage] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<IML5ClassificationResult>();

  if (!isTrained) return null;

  const uploadImage = (files: FileList | null) => {
    const first = files?.item(0);
    if (!first) return setImage(null);
    const url = URL.createObjectURL(first);
    setImage(url);
  }

  const tryGuess = () => {
    const image = document.querySelector<HTMLImageElement>(".jsGuesser img");
    if (!image) return toast.error("Guessing error: no image");
    guessResult(image, (err, res) => {
      if (err) {
        console.log(err);
        toast.error("Guessing error: unknown error");
        return;
      }

      setResult(res[0]);
    });
  }

  return (
    <div className="flex flex-col gap-5 max-w-md w-full mx-auto jsGuesser">
      {!image && <ImageUploader onUpload={(files) => uploadImage(files)} />}
      {image && <Image id="null" url={image} onRemove={() => setImage(null)} allowDelete />}

      <div className="flex flex-col gap-2">
        <Button variant="blue" onClick={tryGuess}>Guess</Button>
        <div>
          <p>Result: <b>{result?.label}</b></p>
          <p>Confidence: <b>{((result?.confidence ?? 0) * 100).toFixed(2)}%</b></p>
        </div>
      </div>
    </div>
  );
}
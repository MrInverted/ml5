import React from "react";

import { useStore } from "@/store/zustand";
import { Button } from "@/ui/Button";
import { ImageClass } from "./ImageClass";



export const ImageClassesList = React.memo(
  () => {
    const isTrained = useStore((s) => s.isTrained);
    const [classes, setClasses] = React.useState<string[]>([]);

    const onAdClass = () => {
      const id = window.crypto.randomUUID();
      setClasses((prev) => prev.concat(id));
    }

    const onRemoveClass = React.useCallback((id: string) => {
      setClasses((prev) => prev.filter((item) => item !== id));
    }, [])

    console.log("ImageClassesList")

    return (
      <div className="flex flex-col gap-3">
        <ul className="flex flex-col gap-3">
          {classes.map((id) =>
            <li key={id}>
              <ImageClass id={id} onRemove={onRemoveClass} />
            </li>
          )}
        </ul>

        {!isTrained &&
          <div>
            <Button variant="blue" onClick={() => onAdClass()}>
              {classes.length === 0 ? "Add first class" : "Add class"}
            </Button>
          </div>
        }
      </div>
    );
  }
)  
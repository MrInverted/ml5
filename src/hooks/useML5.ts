import React from "react";
import toast from "react-hot-toast";

import * as ml5 from "ml5";
import { useStore } from "@/store/zustand";


/*
  const singleton = {
    instance: null
  }
*/

export function useML5() {
  const { isLoading, isTrained, setData, model } = useStore();

  React.useEffect(() => {
    if (model) {
      console.log("✅ Reusing existing classifier");
      return;
    }

    const extractor = ml5.featureExtractor("mobilenet", () => {
      const classifier = extractor.classification();
      setData("model", classifier);
      setData("isLoading", false);
      console.log("✅ MobileNet ready");
    });
  }, [])

  const tryTeachML = async (data: IIncData[]) => {
    const classifier = model;
    if (!classifier) return toast.error("Model instance error...");

    const promises: Promise<unknown>[] = data.map(({ image, label }) => classifier.addImage(image, label));

    await Promise.all(promises);

    console.log({
      numClasses: classifier.numClasses,
      mapStringToIndex: classifier.mapStringToIndex,
      hasAnyTrainedClass: classifier.hasAnyTrainedClass,
    })

    setData("isLoading", true);
    classifier.train((loss) => {
      console.log('Loss:', loss);
      if (!loss) {
        setData("isLoading", false);
        setData("isTrained", true);
      }
    });
  }

  const onTryGetImages = () => {
    const imageClasses = document.querySelectorAll(".jsImageClass");

    if (imageClasses.length === 0) {
      toast.error("Add first class");
      throw new Error("Add first class")
    }

    const data: IIncData[] = [];

    try {
      imageClasses.forEach((item) => {
        const label = item.querySelector("input")?.value;
        const images = item.querySelectorAll<HTMLImageElement>("img");

        if (!label) {
          toast.error("Some classes do not have label");
          throw new Error("Some classes do not have label")
        }

        if (images.length === 0) {
          toast.error("Some classes do not have images");
          throw new Error("Some classes do not have images")
        }

        images.forEach((image) => {
          data.push({ label, image });
        })
      })

      tryTeachML(data);
    } catch (error) {
      console.warn(error);
    }
  }

  const guessResult: IML5Classifier['classify'] = (image, cb) => {
    const classifier = model;
    if (!classifier) return toast.error("Model instance error...");

    console.log({
      numClasses: classifier.numClasses,
      mapStringToIndex: classifier.mapStringToIndex,
      hasAnyTrainedClass: classifier.hasAnyTrainedClass,
    });

    classifier.classify(image, cb);
  }

  return {
    isTrained, isLoading,
    onTryGetImages, guessResult
  }
}
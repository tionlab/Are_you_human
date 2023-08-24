import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Result.module.css";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
const modelUrl = "/model/model.json";

export default function Result() {
  const router = useRouter();
  const { id, answer, selectedImage } = router.query;
  const decodedImage = decodeURIComponent(selectedImage);

  useEffect(() => {
    async function loadModelAndPredict() {
      try {
        const model = await tf.loadLayersModel(modelUrl);

        const imageElement = new Image();
        imageElement.src = `/images/${id}/${selectedImage}`;
        await imageElement.decode();

        const processedImage = preprocessImage(imageElement);
        const input = processedImage.expandDims();

        const prediction = model.predict(input);
        const predictionData = prediction.dataSync();

        const predictedClass = getPredictedClass(predictionData);
        setAnswer(predictedClass);

        input.dispose();
        prediction.dispose();
      } catch (error) {
        console.error("Error loading and predicting:", error);
      }
    }

    loadModelAndPredict();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Result</h2>
      <p>Your answer: {answer}</p>
      <img id="result-image" src={`/images/${id}/${decodedImage}`} alt="Face" />
    </div>
  );
}

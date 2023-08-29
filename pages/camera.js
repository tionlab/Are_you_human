import { useState, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

async function loadModelAndPredict() {
  // 모델을 로드하고 선택한 이미지를 예측하여 결과를 보여주는 함수
  try {
    const model = await tf.loadLayersModel(modelUrl);
    const imageElement = document.getElementById("result-image");
    const preprocessedImage = await preprocessImage(imageElement);

    const expandedImage = preprocessedImage.expandDims(0);
    const predictionData = await model.predict(expandedImage).array();

    const predictedClass = getPredictedClass(predictionData);
    const confidence = getConfidence(predictionData, predictedClass);

    setPredictionResult({ predictedClass, confidence });
    if (answer === "true") {
      var type = "실제 인간";
    } else if (answer === "false") {
      var type = "인공지능 생성 인간";
    }
    if (type === predictedClass) {
      setBackup("");
    } else {
      setBackup(
        "이런... 사진 판독 인공지능이 틀리다니, 굉장히 맞추기 힘든 사진이였나 보네요!"
      );
    }
    setIsLoading(false);
  } catch (error) {
    console.error("Error loading and predicting:", error);
  }
}

const CameraCapturePage = () => {
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backup, setBackup] = useState('');
  const cameraRef = useRef(null);

  // 사진을 촬영하고 예측하는 함수
  const captureAndPredict = async () => {
    setIsLoading(true);
    const video = cameraRef.current;

    if (video && video.readyState === 4) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const capturedImage = new Image();
      capturedImage.src = canvas.toDataURL('image/jpeg');
      capturedImage.onload = async () => {
        await loadModelAndPredict(capturedImage);
      };
    }
  };

  return (
    <div>
      <h1>Camera Capture Page</h1>
      <div>
        <button onClick={captureAndPredict}>사진 촬영</button>
      </div>
      <video ref={cameraRef} autoPlay playsInline />
      {isLoading && <p>Loading...</p>}
      {predictionResult && (
        <div>
          <p>Predicted Class: {predictionResult.predictedClass}</p>
          <p>Confidence: {predictionResult.confidence}</p>
        </div>
      )}
      {backup && <p>{backup}</p>}
    </div>
  );
};

export default CameraCapturePage;

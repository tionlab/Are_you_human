import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import confetti from "canvas-confetti";
import styles from "../styles/Result.module.css";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
const modelUrl = "/model/model.json";
const goodmp3 = "/audio/good.mp3";
const wrongmp3 = "/audio/wrong.mp3";

async function preprocessImage(imageElement) {
  // 이미지를 전처리하여 모델에 입력 가능한 형식으로 변환
  const imageTensor = tf.browser.fromPixels(imageElement).toFloat();
  const resizedImage = tf.image.resizeBilinear(imageTensor, [256, 256]);
  const normalizedImage = resizedImage.div(255.0);
  return normalizedImage;
}

export default function Result() {
  const router = useRouter();
  const { answer, selectedImage, score } = router.query;
  const startQuiz = () => {
    router.push(`/quiz`);
  };
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [correct, setCorrect] = useState("정답 확인 중 . . .");
  const [backup, setBackup] = useState("");
  const [scored, setScored] = useState(score)

  useEffect(() => {
    async function firework() {
      // 화면에 폭죽 애니메이션 효과를 보여주는 함수
      var duration = 15 * 100;
      var animationEnd = Date.now() + duration;
      var defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          })
        );
      }, 250);
    }

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
    if (answer !== undefined) {
      if (answer === "true") {
        firework();
        firework();
        setCorrect("정답입니다! 인간임이 입증되었습니다. 😎");
      } else if (answer === "false") {
        setCorrect("틀렸습니다..🤔 다시 시도 해보세요!");
      }
      playAudio(answer === "true");
      loadModelAndPredict();
    }
  }, [answer]);

  const playAudio = (isCorrect) => {
    // 정답 여부에 따라 음향 효과를 재생하는 함수
    if (isCorrect == true) {
      var sound = goodmp3;
    } else if (isCorrect == false) {
      var sound = wrongmp3;
    }
    const audio = new Audio(sound);
    audio.play();
  };

  const getPredictedClass = (predictionData) => {
    // 모델 예측 결과를 기반으로 예측된 클래스를 반환하는 함수
    return predictionData[0] < 0.5 ? "인공지능 생성 인간" : "실제 인간";
  };

  const getConfidence = (predictionData, predictedClass) => {
    // 모델 예측 결과와 예측된 클래스를 기반으로 확신도를 계산하는 함수
    const confidencePercentage = predictionData[0] * 100;
    if (predictedClass === "실제 인간") {
      return confidencePercentage.toFixed(2);
    } else if (predictedClass === "인공지능 생성 인간") {
      return (100 - confidencePercentage).toFixed(2);
    }
    return "N/A";
  };

  return (
    <div className={styles.container}>
      <p>{scored}</p>
      <div className={styles.captchaBox}>
        <div className={styles.captchaTitle}>Are You Human?</div>
        <div className={styles.captchaContent}>
          <p>{correct}</p>
          <img id="result-image" src={selectedImage} alt="Face" />
          {isLoading ? (
            <p>
              사진 판독 인공지능이 생각 중 이에요! 잠시만 기다려주세요 . . .
            </p>
          ) : predictionResult ? (
            <p>
              사진 판독 인공지능은 이 사진을 {predictionResult.confidence}%의
              확률로
              <br />
              {predictionResult.predictedClass} 이라고 생각했어요!
              <br />
              {backup}
            </p>
          ) : null}
          <div className={styles.button}>
            {!isLoading && (
              <button
                className={`${styles["btn-hover"]} ${styles["color-1"]}`}
                onClick={startQuiz}
              >
                돌아가기
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

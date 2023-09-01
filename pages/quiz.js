import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Quiz.module.css";

const NUM_IMAGES = 999;

export default function Quiz() {
  const router = useRouter();
  const goHome = () => {
    router.push(`/home`);
  };

  const [imageSrc1, setImageSrc1] = useState("");
  const [imageSrc2, setImageSrc2] = useState("");
  const [score, setScore] = useState("");

  useEffect(() => {
    setScore(4)
    // 무작위로 1 또는 2를 선택하여 이미지 카테고리를 결정
    const random = Math.floor(Math.random() * 2) + 1;
    const category = random === 1 ? "fake" : "real";
    const category2 = random === 1 ? "real" : "fake";

    // 선택된 이미지 카테고리를 로그로 출력 (디버그용 라벨링 / 정답을 노출시키므로 추후 삭제 예정)
    console.log("----------");
    console.log("Answer");
    console.log(category);
    console.log(category2);
    console.log("----------");

    // 1에서 NUM_IMAGES 사이의 무작위 숫자를 선택하여 이미지 결정
    const randomImageNumber1 = Math.floor(Math.random() * NUM_IMAGES) + 1;
    const randomImageNumber2 = Math.floor(Math.random() * NUM_IMAGES) + 1;

    // 이미지 경로를 설정
    setImageSrc1(
      `/images/${category}/${
        category === "fake" ? "fake" : "real"
      } (${randomImageNumber1}).jpg`
    );
    setImageSrc2(
      `/images/${category2}/${
        category2 === "fake" ? "fake" : "real"
      } (${randomImageNumber2}).jpg`
    );
  }, []);

  const handleImageClick = (chosenImage) => {
    // 선택한 이미지의 카테고리를 확인하고 정답 여부를 결정
    const correctImageCategory = chosenImage.includes("real") ? "real" : "fake";
    const isCorrect = correctImageCategory === "real";

    // 결과 페이지로 이동하며 선택한 이미지와 정답 여부를 전달
    router.push(
      `/result?answer=${isCorrect}&selectedImage=${encodeURIComponent(
        chosenImage
      )}&score=${score}`
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.captchaBox}>
        <div className={styles.captchaTitle}>
          <div className={styles.captchaTitleContent}>
          <div className={styles.captchaTitleContent1}>
          다음을 선택하세요<br/>
          </div>
          <div className={styles.captchaTitleContent2}>
          실제 인간의 사진<br/>
          </div>
          <div className={styles.captchaTitleContent3}>
          (인공지능 생성 인간 vs 실제 인간)
          </div>
            </div>
          </div>
        <div className={styles.captchaContent}>
          <p>
            
          </p>
          <div className={styles.quizImagesContainer}>
            <div className={styles.quizImage}>
              <img
                className={styles["quiz-image"]}
                src={imageSrc1}
                alt="Face 1"
                onClick={() => handleImageClick(imageSrc1)}
              />
            </div>
            <div className={styles.quizImage}>
              <img
                className={styles["quiz-image"]}
                src={imageSrc2}
                alt="Face 2"
                onClick={() => handleImageClick(imageSrc2)}
              />
            </div>
          </div>
        </div>
        <div className={styles.captchaBoxLow}>
        <div className={styles.captchaLowContent}>
        <img onclick={() => goHome} src="images/home.png"/>
        <p>&nbsp;&nbsp;&nbsp;</p>
        </div>
        
        </div>
      </div>
    </div>
  );
}
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const { answer, selectedImage, score } = router.query;
  const startQuiz = () => {
    router.push(`/quiz`);
  };

  return (
    <div className={styles.container}>
      {score}
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
        <button
                onClick={startQuiz}
              >
                돌아가기
              </button>
        </div>
        <div className={styles.captchaBoxLow}>
        <div className={styles.captchaLowContent}>
        <img src="images/home.png"/>
        <p>score</p>
        </div>
        
        </div>
      </div>
    </div>
  );
}

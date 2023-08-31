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
          asd
        </div>
      </div>
    </div>
  );
}

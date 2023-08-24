import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Quiz.module.css";

const NUM_IMAGES = 999;

export default function Quiz() {
  const router = useRouter();

  const [imageSrc1, setImageSrc1] = useState("");
  const [imageSrc2, setImageSrc2] = useState("");

  useEffect(() => {
    const random = Math.floor(Math.random() * 2) + 1;
    const category = random == 1 ? "fake" : "real";
    const category2 = random == 1 ? "real" : "fake";

    console.log("----------"); //디버그용 라벨링
    console.log("Answer");
    console.log(category);
    console.log(category2);
    console.log("----------");

    const randomImageNumber1 = Math.floor(Math.random() * NUM_IMAGES) + 1;
    const randomImageNumber2 = Math.floor(Math.random() * NUM_IMAGES) + 1;

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
    const correctImageCategory = id === "fake" ? "real" : "fake";
    const isCorrect = chosenImage.includes(correctImageCategory);
    router.push(
      `/result/${id}?answer=${isCorrect}&selectedImage=${encodeURIComponent(
        chosenImage
      )}`
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles["quiz-title"]}>Guess the Face</h2>
      <div className={styles["quiz-images-container"]}>
        <img
          className={styles["quiz-image"]}
          src={imageSrc1}
          alt="Face 1"
          onClick={() => handleImageClick(imageSrc1)}
        />
        <img
          className={styles["quiz-image"]}
          src={imageSrc2}
          alt="Face 2"
          onClick={() => handleImageClick(imageSrc2)}
        />
      </div>
    </div>
  );
}

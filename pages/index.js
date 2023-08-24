import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  const startQuiz = () => {
    router.push(`/quiz`);
  };

  return (
    <div className={styles.container}>
      <h1>Face Quiz</h1>
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
}

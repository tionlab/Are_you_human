import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 페이지가 로드되면 /quiz 페이지로 자동으로 이동합니다.
    router.push(`/quiz`);
  }, []);

  return (
    <div className={styles.container}>
      <h1>loading...</h1>
    </div>
  );
}

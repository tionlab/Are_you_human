import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/quiz`);
  }, []); 

  return (
    <div className={styles.container}>
      <h1>loading...</h1>
    </div>
  );
}

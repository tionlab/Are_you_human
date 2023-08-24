import styles from "../styles/404.module.css";

export default function Custom404() {
  // 404 페이지 컴포넌트
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - 페이지를 찾을 수 없습니다.</h1>
      <p className={styles.description}>
        죄송합니다, 요청하신 페이지를 찾을 수 없습니다.
      </p>
    </div>
  );
}

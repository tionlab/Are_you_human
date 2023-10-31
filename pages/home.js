import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const { history } = router.query;
  const startQuiz = () => {
    const sanitizedNickname = nickname
      .replace(/[\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g, ''); // 특수문자와 공백 제거
    const finalTranscript = sanitizedNickname.length > 7 ? sanitizedNickname.slice(0, 7) : sanitizedNickname; // 7자 초과된 문자열을 삭제
    router.push({
      pathname: '/quiz',
      query: { username: finalTranscript, history: history },
    });
  };
  const [rankings, setRankings] = useState([]);
  const [nickname, setNickname] = useState(undefined);

  useEffect(() => {
    // URL에서 history 쿼리 파싱
    const history = router.query.history;

    if (history) {
      // history를 쉼표(,)를 기준으로 분할하여 배열로 변환
      const historyArray = history.split(',');

      // 닉네임과 점수를 담을 배열
      const scores = [];

      // 각 항목을 반복하면서 닉네임과 점수를 추출하여 scores 배열에 객체로 저장
      historyArray.forEach(item => {
        const [nickname, score] = item.split('_');
        scores.push({ nickname, score: parseInt(score) || 0 });
      });

      // 점수를 기준으로 내림차순 정렬
      scores.sort((a, b) => b.score - a.score);

      // 상위 5명 추출
      const topFive = scores.slice(0, 5);

      setRankings(topFive);
    }
  }, [router.query.history]);
  
  const handleChange = useCallback((e) => {
    setNickname(e.target.value)
  }, [nickname])

  return (
    <div className={styles.container}>
      <div className={styles.captchaBox}>
        <div className={styles.captchaTitle}>
          <div className={styles.captchaTitleContent}>
            <div className={styles.captchaTitleContent1}>
              다음을 선택하세요<br />
            </div>
            <div className={styles.captchaTitleContent2}>
              실제 인간의 사진<br />
            </div>
            <div className={styles.captchaTitleContent3}>
              (인공지능 생성 인간 vs 실제 인간)
            </div>
          </div>
        </div>
        <div className={styles.captchaContent}>
          <ol>
            {rankings.map((player, index) => (
              `${index + 1}위 ${player.nickname ? player.nickname : '이름없는누군가'} / ${player.score}점\n`
            ))}
          </ol>
          <div>
          <input className={`${styles["btn-hover2"]} ${styles["color-1"]}`} value={nickname} placeholder="닉네임 입력" maxLength="7" onChange={handleChange}></input>
          </div>
          <button
            className={`${styles["btn-hover"]} ${styles["color-1"]}`}
            onClick={startQuiz}
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

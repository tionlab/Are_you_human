import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Result.module.css";


export default function Quiz() {
    const router = useRouter();
    const { username, score, history } = router.query;
    const [ranking, setRanking] = useState(1);
    const rescore = score ? score : 0
    const endmp3 = "/audio/end.mp3";

    const goHome = () => {
        const updatedHistory = history ? `${history},${username}_${rescore}` : `${username}_${rescore}`;
        router.push({
            pathname: '/home',
            query: { history: updatedHistory },
        });
    };
    useEffect(() => {
        const audio = new Audio(endmp3);
        audio.load(); // 음악 파일 로드
        audio.play().catch(error => {
            console.error("음악 파일 재생 중 오류 발생: ", error);
        });
    }, []);

    useEffect(() => {
        if (history) {
            const historyArray = history.split(',');
            const users = historyArray.map(item => {
                const [name, userScore] = item.split('_');
                return { username: name, score: parseInt(userScore) };
            });

            users.push({ username, score: parseInt(rescore) });

            users.sort((a, b) => b.score - a.score);

            const currentUserIndex = users.findIndex(user => user.score === parseInt(rescore));

            if (currentUserIndex !== -1) {
                setRanking(currentUserIndex + 1);
            }
        }
    }, []);



    return (
        <div className={styles.container}>
            <div className={styles.captchaBox}>
                <div className={styles.captchaTitle}>
                    <div className={styles.captchaTitleContent}>
                        <div className={styles.captchaTitleContent1}>
                            GAMEOVER!<br />
                        </div>
                        <div className={styles.captchaTitleContent2}>
                            점수 : {rescore}<br />
                        </div>
                        <div className={styles.captchaTitleContent3}>
                            현재 {ranking}위 입니다!
                        </div>
                    </div>
                </div>
                <div className={styles.captchaContent}>
                    <button
                    className={`${styles["btn-hover"]} ${styles["color-1"]}`}
                    onClick={goHome}
                    >
                    돌아가기
                    </button>
                </div>
                <div className={styles.captchaBoxLow}>
                </div>
            </div>
        </div>
    );
}
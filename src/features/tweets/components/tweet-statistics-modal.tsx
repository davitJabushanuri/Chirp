/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { BackArrowIcon } from "@/assets/back-arrow-icon";
import { CloseIcon } from "@/assets/close-icon";
import { useTweetStatistics } from "@/stores/use-tweet-statistics";

import styles from "./styles/tweet-statistics-modal.module.scss";

export const TweetStatisticsModal = () => {
  const closeModal = useTweetStatistics(
    (state) => state.closeTweetStatisticsModal,
  );

  const statistics = useTweetStatistics((state) => state.statistics);
  const statisticType = useTweetStatistics((state) => state.statisticType);

  return (
    <div onClick={() => closeModal()} className={styles.container}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <header>
          <button onClick={() => closeModal()} className={styles.close}>
            <span className={styles.arrow}>
              <BackArrowIcon />
            </span>

            <span className={styles.x}>
              <CloseIcon />
            </span>
          </button>

          <h2 className={styles.title}>{statisticType}</h2>
        </header>
      </div>
    </div>
  );
};

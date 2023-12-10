import styles from "./styles/text-progress-bar.module.scss";

export const TextProgressBar = ({ progress }: { progress: number }) => {
  const max = 280;
  const remainingChars = max - progress;
  const showRemainingChars = progress >= 260;

  const sqSize = 20;
  const strokeWidth = showRemainingChars ? 1 : 2;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;

  const dashArray = radius * Math.PI * 2;
  const normalizedProgress = Math.min(progress / max, 1);
  const dashOffset = dashArray - dashArray * normalizedProgress;

  const progressColor =
    remainingChars > 20
      ? "var(--clr-primary)"
      : remainingChars <= 20 && remainingChars > 0
        ? "#ffd400"
        : remainingChars <= 0 && remainingChars > -10
          ? "#F4212E"
          : `transparent`;

  const trackColor =
    remainingChars > -10 ? "var(--clr-trends-background)" : `transparent`;

  return (
    <div className={styles.container}>
      <div
        className={`${styles.progressbar} ${
          remainingChars <= 20 ? styles.warning : ""
        }`}
      >
        <svg viewBox={viewBox} role="progressbar">
          <circle
            role="presentation"
            data-testid="track-circle"
            cx={sqSize / 2}
            cy={sqSize / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={`${strokeWidth}px`}
          />
          <circle
            role="presentation"
            data-testid="progress-circle"
            className={styles.progressCircle}
            cx={sqSize / 2}
            cy={sqSize / 2}
            r={radius}
            fill="none"
            stroke={progressColor}
            strokeWidth={`${strokeWidth}px`}
            strokeDasharray={`${dashArray} ${dashArray}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
          />
        </svg>

        {showRemainingChars && (
          <span
            data-testid="remaining-chars"
            className={`${styles.text} ${
              remainingChars <= 0 ? styles.danger : ""
            }`}
          >
            {remainingChars}
          </span>
        )}
      </div>
    </div>
  );
};

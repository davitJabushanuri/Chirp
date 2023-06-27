import styles from "./styles/text-progress-bar.module.scss";

export const TextProgressBar = ({
  progress,
  radius = 10,
  strokeWidth = 2,
  trackColor = "#38444D",
  progressColor = "#1D9BF0",
}: {
  progress: number;
  radius?: number;
  strokeWidth?: number;
  trackColor?: string;
  progressColor?: string;
}) => {
  const circumference = 2 * Math.PI * radius;
  const normalizedProgress = Math.min(progress / 280, 1);
  const dashOffset = circumference - normalizedProgress * circumference;

  const remainingChars = 280 - progress;
  const showRemainingChars = progress >= 260;

  return (
    <div className={styles.container} role="progressbar">
      <svg height="100%" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
        <circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />

        {showRemainingChars && (
          <text
            x={radius}
            y={radius}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {remainingChars}
          </text>
        )}
      </svg>
    </div>
  );
};

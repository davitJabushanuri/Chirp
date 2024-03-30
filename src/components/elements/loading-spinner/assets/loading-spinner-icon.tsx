export const LoadingSpinnerIcon = () => {
  return (
    <svg className="size-6 animate-spin" viewBox="0 0 32 32">
      <circle
        cx="16"
        cy="16"
        fill="none"
        r="14"
        strokeWidth="4"
        className="stroke-primary-100/20"
      ></circle>
      <circle
        cx="16"
        cy="16"
        fill="none"
        r="14"
        strokeWidth="4"
        className="stroke-primary-100"
        style={{
          strokeDasharray: 80,
          strokeDashoffset: 60,
        }}
      ></circle>
    </svg>
  );
};

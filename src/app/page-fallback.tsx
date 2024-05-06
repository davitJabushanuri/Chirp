"use client";

export const PageFallback = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <p className="text-milli text-tertiary-100">
        Could not load the page, please try again later
      </p>
    </div>
  );
};

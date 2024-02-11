import { FontSizeSlider } from "./font-size-slider";

export const FontSizeCustomization = () => {
  return (
    <section>
      <h2
        id="font-size-heading"
        className="px-4 py-3 text-h2 font-bold text-secondary-100"
      >
        Font size
      </h2>
      <div
        aria-describedby="font-size-heading"
        className="grid grid-cols-[auto_1fr_auto] items-center gap-3 p-4"
      >
        <span className="text-micro">Aa</span>
        <FontSizeSlider />
        <span className="text-h2">Aa</span>
      </div>
    </section>
  );
};

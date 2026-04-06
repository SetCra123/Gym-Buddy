import { useState } from "react";

export default function BodyComparisonSlider({ before, after }) {
  const [value, setValue] = useState(50);

  return (
    <div className="slider-container">
      <h2>Progress Comparison</h2>

      <div className="image-wrapper">
        {/* AFTER (background) */}
        <img src={after} alt="After" className="image" />

        {/* BEFORE (overlay) */}
        <img
          src={before}
          alt="Before"
          className="image overlay"
          style={{ width: `${value}%` }}
        />
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
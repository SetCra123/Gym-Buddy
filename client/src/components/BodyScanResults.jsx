import BodyAnalysis from "./BodyAnalysis";
import BodyComparisonSlider from "./BodyComparisonSlider";

export default function BodyScanScanResults({ scan }) {
  return (
    <div className="results">

      {/* 🧠 Body Metrics */}
      <BodyAnalysis analysis={scan.analysis} />

      {/* 🖼️ Before/After Slider */}
      {scan.images?.before && (
        <BodyComparisonSlider
          before={scan.images.before}
          after={scan.images.after}
        />
      )}

      {/* 💪 Workout Plan */}
      <div className="plan">
        <h2>Workout Plan</h2>
        <ul>
          {scan.workoutPlan?.exercises?.map((ex, i) => (
            <li key={i}>{ex}</li>
          ))}
        </ul>
      </div>

      {/* 🥗 Nutrition Plan */}
      <div className="plan">
        <h2>Nutrition Plan</h2>
        <p>Calories: {scan.nutritionPlan?.calories}</p>
        <p>Protein: {scan.nutritionPlan?.protein}</p>
        <p>Carbs: {scan.nutritionPlan?.carbs}</p>
        <p>Fats: {scan.nutritionPlan?.fats}</p>
      </div>

    </div>
  );
}
export default function BodyAnalysis({ analysis }) {
    if (!analysis) return null;
  
    return (
      <div className="analysis">
        <h2>Body Metrics</h2>
  
        <p><strong>Body Fat:</strong> {analysis.bodyFat}%</p>
        <p><strong>Body Type:</strong> {analysis.bodyType}</p>
        <p><strong>Posture:</strong> {analysis.posture}</p>
  
        <h3>Muscle Distribution</h3>
  
        {analysis.muscleDistribution &&
          Object.entries(analysis.muscleDistribution).map(([key, val]) => (
            <div key={key}>
              <label>{key}</label>
              <div className="bar">
                <div
                  className="fill"
                  style={{ width: `${val * 10}%` }}
                />
              </div>
            </div>
          ))}
  
        <h3>Recommendations</h3>
        <ul>
          {analysis.recommendations?.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </div>
    );
  }
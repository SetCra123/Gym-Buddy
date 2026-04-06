import { useState } from "react";
import { createBodyScan } from "../utils/API"; 
import "../BodyAnalysisPage.css";

import BodyAnalysisUploadForm from "../components/BodyAnalysisUploadForm";
import BodyScanResults from "../components/BodyScanResults";
import LoadingSpinner from "../components/LoadingSpinner";

export default function BodyAnalysisPage() {
  const [loading, setLoading] = useState(false);
  const [scan, setScan] = useState(null);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    if (!file) return;

    try {
      setLoading(true);
      setError(null);

      const data = await createBodyScan(file);
      setScan(data);

    } catch (err) {
      console.error(err);
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>AI Body Analysis</h1>

      <BodyAnalysisUploadForm onUpload={handleUpload} />

      {loading && <LoadingSpinner />}

      {error && <p className="error">{error}</p>}

      {scan && !loading && <BodyScanResults scan={scan} />}
    </div>
  );
}
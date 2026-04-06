import { useState } from "react";

export default function BodyAnalysisUploadForm({ onUpload }) {
  const [file, setFile] = useState(null);

  return (
    <div className="upload-box">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={() => onUpload(file)}>
        Scan My Body
      </button>
    </div>
  );
}
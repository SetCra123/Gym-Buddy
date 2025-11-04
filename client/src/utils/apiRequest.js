// apiRequest.js
export default async function apiRequest(url, options, errorMessage) {
  try {
    console.log("📤 Fetching:", url, options);

    const response = await fetch(url, options);
    console.log("📥 Raw response status:", response.status);

    let data;
    try {
      data = await response.json();
    } catch (err) {
      console.warn("⚠️ No JSON in response");
      data = null;
    }

    console.log("✅ Parsed response data:", data);

    if (!response.ok) {
      throw new Error(data?.message || errorMessage || "API request failed");
    }

    // ✅ Always return parsed data
    return data;
  } catch (err) {
    console.error("❌ API request error:", err);
    throw err;
  }
}

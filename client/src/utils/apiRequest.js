
// apiRequest.js (UPDATED)
export default async function apiRequest(url, options, errorMessage) {
  try {
    const response = await fetch(url, options);

    let data = null;

    const contentType = response.headers.get("content-type");

    //for image uploads not json 
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    }

    if (!response.ok) {
      throw new Error(data?.message || errorMessage || "API request failed");
    }

    return data;
  } catch (err) {
    console.error("❌ API request error:", err);
    throw err;
  }
}
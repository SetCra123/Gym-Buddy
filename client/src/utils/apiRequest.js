export default async function apiRequest(url, options, errorMessage) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(errorMessage || `Request failed with status ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("API Error", err);
    throw err;
  }
}
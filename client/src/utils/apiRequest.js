const apiRequest = async (url, options = {}, errorMessage = "Request failed") => {
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
        throw new Error(message);
        }
        return res.json();

    } catch(err) {
      console.error("API Error", err);
      throw err;
    }
};


export default apiRequest;

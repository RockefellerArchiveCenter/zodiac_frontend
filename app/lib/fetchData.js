// Return the `results` array from a specified API endpoint
export async function fetchData(apiEndpoint) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL; // API base URL from .env file

  try {
    const res = await fetch(`${baseURL}${apiEndpoint}`);

    if (!res.ok) {
      return {
        error: `Failed to fetch data from ${apiEndpoint}. Status: ${res.status} ${res.statusText}`,
      };
    }

    const data = await res.json();
    // Return data wrapped in "results"
    if (data.results) {
      return data.results;
    }

    // Return raw data
    return data || [];
  } catch (error) {
    console.error("Error fetching data:", error);

    // Return an error object to use in UI
    return {
      error: `Error fetching data from ${apiEndpoint}: ${error.message}`,
    };
  }
}

// Return the `results` array from a specified API endpoint
export async function fetchData(apiEndpoint) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL; // specified in .env file

  try {
    const res = await fetch(`${baseURL}${apiEndpoint}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${apiEndpoint}. Status: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching data:", error);

    // Create error for a UI component to display
    throw new Error(`Error fetching data from ${apiEndpoint}: ${error.message}`);
  }
}
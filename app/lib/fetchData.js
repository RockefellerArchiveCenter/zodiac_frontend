// Return the `results` array from a specified API endpoint
export async function fetchData(apiEndpoint) {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL; //specified in .env file
  const res = await fetch(`${baseURL}${apiEndpoint}`);

  if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);
  const data = await res.json();

  return data.results;
}
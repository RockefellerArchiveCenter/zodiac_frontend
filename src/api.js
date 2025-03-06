const API_BASE = import.meta.env.API_BASE_URL;

export async function fetchPackages() {
  const response = await fetch(`${API_BASE}/packages/`);
  const data = await response.json();
  return data.results;
}

export async function fetchEvents() {
  const response = await fetch(`${API_BASE}/events/`);
  const data = await response.json();
  return data.results;
}

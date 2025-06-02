import { fetchData } from "@/lib/fetchData";

// Mock the global fetch
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

describe("fetchData", () => {
  const baseURL = "https://api.example.com";
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // clear cached env vars
    process.env = { ...OLD_ENV, NEXT_PUBLIC_API_BASE_URL: baseURL };
  });

  afterAll(() => {
    process.env = OLD_ENV; // restore old env vars
  });

  it("returns data.results if present", async () => {
    const mockResults = [{ id: 1 }, { id: 2 }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: mockResults }),
    });

    const data = await fetchData("/test-endpoint");
    expect(data).toEqual(mockResults);
    expect(fetch).toHaveBeenCalledWith(`${baseURL}/test-endpoint`);
  });

  it("returns raw data if no results field", async () => {
    const mockData = { foo: "bar" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await fetchData("/another-endpoint");
    expect(data).toEqual(mockData);
  });

  it("returns an error object if fetch fails (non-OK response)", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    const result = await fetchData("/bad-endpoint");
    expect(result).toEqual({
      error: `Failed to fetch data from https://api.example.com/bad-endpoint. Status: 404 Not Found`,
    });
  });

  it("returns an error object if fetch throws", async () => {
    fetch.mockRejectedValueOnce(new Error("Network failure"));

    const result = await fetchData("/error-endpoint");
    expect(result).toEqual({
      error: `Error fetching data from https://api.example.com/error-endpoint: Network failure`,
    });
  });
});

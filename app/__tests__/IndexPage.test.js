import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/page";

jest.mock("../components/Table"); // Mock the Table component, tested elsewhere

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders home page", async () => {
    render(await Home());

    // Check if the page title is rendered
    expect(screen.getByText("Zodiac")).toBeInTheDocument();

    // Check if the page subtitle is rendered
    expect(
      screen.getByText(
        "Track ingest of packages and fix errors for born digital and digitized content.",
      ),
    ).toBeInTheDocument();
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Errors from "@/errors/page";

jest.mock("../components/Table"); // Mock the Table component, tested elsewhere

describe("Error List Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders error page", async () => {
    render(await Errors());

    // Check if the page title is rendered
    expect(screen.getByText("Package Errors")).toBeInTheDocument();
  });
});

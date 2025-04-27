import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RerunService from "@/components/RerunService";

// Mock useRouter
pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    prefetch: jest.fn(),
  }),
}));

const mockEventData = {
  identifier: "f78742e5-6af9-4756-a94a-6cd297406d55",
  service: "test_service",
  outcome: "FAILURE",
  last_modified: "2025-02-26T15:12:29.176000Z",
  message: "BagIt Validation.",
  package_identifier: "f78742e5-6af9-4756-a94a-6cd297406d51",
};

describe("Rerun Service Component", () => {
  beforeEach(() => {
    // Create root div for modal
    const container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the button", () => {
    render(<RerunService eventData={mockEventData} />);

    expect(screen.getByText("Rerun service")).toBeInTheDocument();
    expect(screen.queryByText(`Rerun ${mockEventData.service}`)).toBeNull();
  });

  it("shows and hides the modal", () => {
    render(<RerunService eventData={mockEventData} />);

    // Click Rerun service button
    const openButton = screen.getByRole("button", { name: "Rerun service" });
    fireEvent.click(openButton);
    expect(
      screen.getByText(`Rerun ${mockEventData.service}`),
    ).toBeInTheDocument();

    // Click cancel button
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    fireEvent.click(cancelButton);
    expect(screen.queryByText(`Rerun ${mockEventData.service}`)).toBeNull();
  });

  it("triggers the rerun service function", () => {
    // Mock successful response from fetch
    global.fetch = jest.fn();
    fetch.mockResolvedValue({
      json: () => Promise.resolve({ data: "mock data" }),
      ok: true,
      status: 200,
    });

    render(<RerunService eventData={mockEventData} />);

    // Click Rerun service button
    const openButton = screen.getByRole("button", { name: "Rerun service" });
    fireEvent.click(openButton);

    // Click Run service button
    const runButton = screen.getByRole("button", { name: "Run service" });
    fireEvent.click(runButton);

    // Fetch is called with the correct arguments
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/restart-service/`,
      {
        body: `{\"service\":\"${mockEventData.service}\",\"package_id\":\"${mockEventData.package_identifier}\"}`,
        headers: { "Content-Type": "application/json" },
        method: "POST",
      },
    );
    // URL is correctly set
    expect(pushMock).toHaveBeenCalledTimes(1);
    expect(pushMock).toHaveBeenCalledWith(
      `/packages/${mockEventData.package_identifier}`,
    );
  });

  // TODO: test error response
});

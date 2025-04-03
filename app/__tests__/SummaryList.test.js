import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SummaryList from "../components/SummaryList";

describe("Summary List Component", () => {
  it("renders the summary list with title", () => {
    render(
      <SummaryList
        title="Summary List"
        items={[
          {
            label: "Package identifier",
            value: "85e5982-b111-4dea-88f0-102c3d0bbffc",
          },
          { label: "Package origin", value: "Aurora" },
          { label: "Package path", value: null },
        ]}
      />,
    );

    expect(screen.getByText("Summary List")).toBeInTheDocument();
    expect(
      screen.getByText("85e5982-b111-4dea-88f0-102c3d0bbffc"),
    ).toBeInTheDocument();
    expect(screen.getByText("Package origin")).toBeInTheDocument();
    expect(screen.getByText("None")).toBeInTheDocument();
  });
});

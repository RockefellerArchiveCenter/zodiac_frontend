import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OutcomeBadge from "../components/OutcomeBadge";

describe("OutcomeBadge Component", () => {
  it("renders the badge when no outcome is provided", () => {
    render(<OutcomeBadge />);

    const badge = screen.getByText("IN PROCESS");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toBe("badge badge--light-blue");
  });

  it("renders the badge with a success outcome", () => {
    render(<OutcomeBadge outcome="SUCCESS" />);

    const badge = screen.getByText("SUCCESS");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toBe("badge badge--blue");
  });

  it("renders the badge with a failure outcome", () => {
    render(<OutcomeBadge outcome="FAILURE" />);

    const badge = screen.getByText("FAILURE");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toBe("badge badge--orange");
  });
});

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OutcomeBadge from "../components/OutcomeBadge";

describe("OutcomeBadge Component", () => {
  it("renders the badge with an in process outcome", () => {
    render(<OutcomeBadge outcome="IN PROCESS" />);

    const badge = screen.getByText("STATUS: IN PROCESS");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toBe("badge badge--light-blue");
  });

  it("renders the badge with a complete outcome", () => {
    render(<OutcomeBadge outcome="COMPLETE" />);

    const badge = screen.getByText("STATUS: COMPLETE");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toBe("badge badge--blue");
  });

  it("renders the badge with a success outcome", () => {
    render(<OutcomeBadge outcome="SUCCESS" />);

    const badge = screen.getByText("STATUS: SUCCESS");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toBe("badge badge--blue");
  });

  it("renders the badge with an error outcome", () => {
    render(<OutcomeBadge outcome="ERROR" />);

    const badge = screen.getByText("STATUS: ERROR");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toBe("badge badge--orange");
  });

  it("renders the badge with an failure outcome", () => {
    render(<OutcomeBadge outcome="FAILURE" />);

    const badge = screen.getByText("STATUS: FAILURE");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toBe("badge badge--orange");
  });
});

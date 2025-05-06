import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Alert from "../components/Alert";

describe("Alert Component", () => {
  it("renders the alert", () => {
    render(<Alert message={"Error fetching packages"} />);

    expect(screen.getByText("Error fetching packages")).toBeInTheDocument();
    expect(screen.getByText("error_outline")).toBeInTheDocument(); // icon
    expect(screen.getByText("error_outline").parentElement).toHaveClass(
      "alert alert--orange",
    );
  });
});

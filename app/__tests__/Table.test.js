import preloadAll from "jest-next-dynamic";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "../components/Table";

beforeAll(async () => {
  await preloadAll();
});

describe("Table Component", () => {
  // Test if the table renders columns and data
  it("renders the table", () => {
    const columnsConfig = [{ title: "Package ID", data: "identifier" }];
    const data = [{ identifier: "8bf992c0-1547-403a-93d4-ac531e7ed080" }];

    render(<Table columnsConfig={columnsConfig} data={data} />);

    expect(screen.getByText("Package ID")).toBeInTheDocument();
    expect(
      screen.getByText("8bf992c0-1547-403a-93d4-ac531e7ed080"),
    ).toBeInTheDocument(); // Data cell
  });

  it("renders links in cells", () => {
    // Test if the table correctly creates links when desired.
    const columnsConfig = [
      {
        title: "Package ID",
        data: "identifier",
        type: "link",
        linkPrefix: "/objects/",
        identifierKey: "identifier",
      },
    ];
    const data = [{ identifier: "8bf992c0-1547-403a-93d4-ac531e7ed080" }];

    render(<Table columnsConfig={columnsConfig} data={data} />);

    expect(
      screen.getByText("8bf992c0-1547-403a-93d4-ac531e7ed080"),
    ).toHaveAttribute("href");
    expect(screen.getByText("8bf992c0-1547-403a-93d4-ac531e7ed080").href).toBe(
      "http://localhost/objects/8bf992c0-1547-403a-93d4-ac531e7ed080",
    );
  });
});

import { constructColumns, constructUrl } from "@/components/Table";
import "@testing-library/jest-dom";

describe("Construct columns function", () => {
  it("correctly creates basic cell", () => {
    const columnsConfig = [{ title: "Package ID", data: "identifier" }]
    const output = constructColumns(columnsConfig)
    expect(output).toStrictEqual(columnsConfig)
  });

  it("correctly creates link cell", () => {
    const columnsConfig = [{
      title: "Title",
      data: "title",
      type: "link",
      linkPrefix: "/packages/",
      identifierKey: "identifier",
    }]
    const output = constructColumns(columnsConfig);
    expect(output[0]).toEqual(
      expect.objectContaining(columnsConfig[0])
    );
    expect(output[0].render).toStrictEqual(expect.any(Function))
  });
});

describe("Construct URL function", () => {
  it("correctly creates search params", () => {
    const output = constructUrl('packages')
    expect(output).toBe(`${process.env.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "")}/packages?format=datatables`)
  });

  it("correctly adds to exisitng search params", () => {
    const output = constructUrl('packages?outcome=SUCCESS')
    expect(output).toBe(`${process.env.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "")}/packages?outcome=SUCCESS&format=datatables`)
  });
});
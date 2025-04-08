import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PackageDetail from "../packages/[identifier]/page";
import { fetchData } from "../lib/fetchData";

// Mock the fetchData function
jest.mock("../lib/fetchData");

const mockPackageData = {
  identifier: "f78742e5-6af9-4756-a94a-6cd297406d51",
  title: "Test Package",
  origin: "aurora",
  identifiers: {
    aurora_package:
      "https://aurora.dev.rockarch.org/api/transfers/1631/?format=json",
    aurora_accession: "https://aurora.dev.rockarch.org/api/accessions/237/",
    archivematica_uuid: "0a9c6171-a18d-4ff6-b9e7-bef01aaded10",
    archivesspace_accession: undefined,
    archivesspace_archival_object: "/repositories/2/archival_objects/2153",
  },
};

const mockEventsData = [
  {
    identifier: "f78742e5-6af9-4756-a94a-6cd297406d55",
    service: "test_service",
    outcome: "SUCCESS",
    last_modified: "2025-02-26T15:12:29.176000Z",
    message: "Package discovered.",
  },
];

describe("Package Detail Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders package detail page", async () => {
    fetchData.mockImplementation((url) => {
      if (url.includes("/events")) {
        return Promise.resolve(mockEventsData);
      }
      return Promise.resolve(mockPackageData);
    });

    render(
      await PackageDetail({
        params: { identifier: mockPackageData.identifier },
      }),
    );

    // Check if the title is rendered
    expect(
      screen.getByText(`Package : ${mockPackageData.title}`),
    ).toBeInTheDocument();

    // Check if package identifier and origin are rendered
    expect(screen.getByText(mockPackageData.identifier)).toBeInTheDocument();
    expect(screen.getByText(mockPackageData.origin)).toBeInTheDocument();

    // Wait for datatables to load content and check if the content is rendered
    await waitFor(() => {
      expect(screen.getByText(mockEventsData[0].service)).toBeInTheDocument();
      expect(screen.getByText(mockEventsData[0].outcome)).toBeInTheDocument();
      expect(screen.getByText(mockEventsData[0].message)).toBeInTheDocument();
    });

    // Check if external identifiers are rendered (or "None" if undefined)
    expect(
      screen.getByText(mockPackageData.identifiers.aurora_package),
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockPackageData.identifiers.archivematica_uuid),
    ).toBeInTheDocument();
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("handles fetchData errors correctly", async () => {
    // Mock fetchData to return an error
    fetchData.mockImplementation(() =>
      Promise.resolve({ error: "Test error message" }),
    );

    render(
      await PackageDetail({
        params: { identifier: mockPackageData.identifier },
      }),
    );

    // Check if alert with error message is rendered
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("renders correctly without title", async () => {
    const mockPackageDataNoTitle = {
      ...mockPackageData,
      title: undefined,
    };

    fetchData.mockImplementation((url) => {
      return Promise.resolve(mockPackageDataNoTitle);
    });

    render(
      await PackageDetail({
        params: { identifier: mockPackageData.identifier },
      }),
    );

    expect(screen.getByText("Package")).toBeInTheDocument();
    expect(screen.queryByText("Package :")).not.toBeInTheDocument();
  });
});

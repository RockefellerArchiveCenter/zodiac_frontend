// Homepage of app
import Table from "@/components/Table";

export default async function Home() {
  const columnsConfig = [
    {
      title: "Title",
      data: "title",
      type: "link",
      linkPrefix: "/packages/",
      identifierKey: "identifier",
    },
    { title: "Package ID", data: "identifier" },
    { title: "Identifiers", data: "identifiers", visible: false },
    { title: "Origin", data: "origin" },
    { title: "Status", data: "status" },
    { title: "Created", data: "created" },
  ];

  return (
    <div>
      <h1>Zodiac</h1>
      <p>
        Track ingest of packages and fix errors for born digital and digitized
        content.
      </p>
      <h2>Package Status</h2>
      <Table apiPath="/packages/" columnsConfig={columnsConfig} />
    </div>
  );
}

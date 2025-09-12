// /errors page
import Table from "@/components/Table";

export const metadata = {
  title: "Unresolved Package Errors - Zodiac",
};

export default async function Errors() {
  const columnsConfig = [
    {
      title: "Title",
      data: "title",
      type: "link",
      linkPrefix: "/packages/",
      identifierKey: "identifier",
    },
    { title: "Package ID", data: "identifier" },
    { title: "Origin", data: "origin" },
    {
      title: "Service Error",
      data: "error_message",
      type: "link",
      linkPrefix: "/events/",
      identifierKey: "error_identifier",
    },
    { title: "Date/Time", data: "created" },
  ];

  return (
    <div>
      <h1>Unresolved Package Errors</h1>
      <Table
        apiPath="/packages?status=ERROR"
        columnsConfig={columnsConfig}
        order={[[4, "desc"]]}
      />
    </div>
  );
}

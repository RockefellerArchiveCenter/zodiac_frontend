// /errors page
import Table from "@/components/Table";

export const metadata = {
  title: "Package Errors - Zodiac",
};

export default async function Errors() {
  const columnsConfig = [
    {
      title: "Title",
      data: "package_title",
      name: "package_identifier.title",
      type: "link",
      linkPrefix: "/packages/",
      identifierKey: "package_identifier",
    },
    { title: "Package ID", data: "package_identifier" },
    {
      title: "Origin",
      data: "package_origin",
      name: "package_identifier.origin",
    },
    {
      title: "Service Error",
      data: "message",
      type: "link",
      linkPrefix: "/events/",
      identifierKey: "identifier",
    },
    { title: "Date/Time", data: "last_modified" },
  ];

  return (
    <div>
      <h1>Package Errors</h1>
      <Table apiPath="/events?outcome=FAILURE" columnsConfig={columnsConfig} />
    </div>
  );
}

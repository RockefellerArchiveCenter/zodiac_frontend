"use client";

import dynamic from "next/dynamic";
import "datatables.net-dt/css/dataTables.dataTables.css";

// Dynamic import of DataTable component (see https://datatables.net/forums/discussion/79941/)
const DataTable = dynamic(
  async () => {
    const dtReact = import("datatables.net-react");
    const dtNet = import(`datatables.net-dt`);

    const [reactMod, dtNetMod] = await Promise.all([dtReact, dtNet]);

    reactMod.default.use(dtNetMod.default);
    return reactMod.default;
  },
  { ssr: false }, // Disable server-side rendering to avoid hydration issues
);

export default function Table({ data, columnsConfig }) {
  const columns = columnsConfig.map((col) => {
    if (col.type === "link") {
      // Add ability to specify link in column data
      return {
        ...col,
        render: (data, type, row) => {
          const identifier = row[col.identifierKey];
          return `<a href="${col.linkPrefix}${identifier}">${data}</a>`;
        },
      };
    }
    return col;
  });

  return (
    <DataTable
      columns={columns}
      data={data}
      className="table table-striped"
      options={{
        processing: true,
        paging: true,
        searching: true,
        ordering: true,
        lengthMenu: [10, 25, 50, 100],
      }}
    >
      <></>
    </DataTable> // datatables.net-react requires a child element
  );
}

<script>
  import DataTable from "./DataTable.vue";

  export default {
    components: { DataTable },
    setup() {
      const columns = [
        {
          title: "Title",
          data: "title",
          render: (data, type, row) => `<a href="/packages/${row.identifier}">${data}</a>`,
        },
        { title: "Package ID", data: "identifier" },
        { title: "Origin", data: "origin" },
        { title: "Status", data: "last_outcome" },
      ];

      return { columns };
    },
  };
</script>

<template>
  <div>
    <DataTable tableId="package-status" apiEndpoint="/packages" :columns="columns" />
  </div>
</template>

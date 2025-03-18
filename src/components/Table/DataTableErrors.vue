TODO: this isn't working as expected. Need to fix it.

<script>
  import { ref, onMounted } from "vue";
  import DataTable from "./DataTable.vue";

  export default {
    components: { DataTable },
    setup() {
      const columns = [
        { 
          title: "Title",
          data: "package_title",
          render: (data, type, row) => `<a href="/packages/${row.package_identifier}">${data}</a>`,
        },
        { title: "Package ID", data: "package_identifier" },
        { title: "Origin", data: "package_origin" },
        { 
          title: "Service Error",
          data: "message",
          render: (data, type, row) => `<a href="/events/${row.identifier}">${data}</a>`,
        },
        { title: "Date/Time", data: "last_modified"},
      ];

      return { columns };
    },
  };
</script>


<template>
  <div>
    <DataTable tableId="errors" :columns="columns" apiEndpoint="/events?outcome=FAILURE" />
  </div>
</template>

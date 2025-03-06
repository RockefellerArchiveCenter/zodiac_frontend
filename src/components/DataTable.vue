<script>
  import DataTable from 'datatables.net-vue3';
  import DataTablesCore from 'datatables.net-dt';
  import 'datatables.net-searchpanes-dt';

  DataTable.use(DataTablesCore);

  export default {
    components: { DataTable },
    props: ['data', 'columns'],
  };
</script>

<template>
  
</template>
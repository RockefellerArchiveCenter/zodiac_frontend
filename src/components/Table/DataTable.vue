<script setup>
import { ref, onMounted } from "vue";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-dt";
import "datatables.net-searchpanes-dt";

DataTable.use(DataTablesCore);

const props = defineProps({
  tableId: String,
  apiEndpoint: String,
  columns: Array,
});

const data = ref([]);
const errorMessage = ref("");
const BASE_URL = process.env.API_BASE_URL;

onMounted(async () => {
  try {
    const response = await fetch(`${BASE_URL}${props.apiEndpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    data.value = json.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    errorMessage.value = 'Error fetching data';
  }
});
</script>

<template>
  <!-- TODO: Add alert component with errorMessage if fetch fails -->
  <div>
    <DataTable
      :id="tableId"
      :columns="columns"
      :data="data"
      class="table table-striped"
      :options="{
        processing: true,
        paging: true,
        searching: true,
        ordering: true,
        lengthMenu: [10, 25, 50, 100]
      }"
    />
  </div>
</template>

import { createApp } from "vue";
import DataTablePackages from "./components/Table/DataTablePackages.vue";
import DataTableErrors from "./components/Table/DataTableErrors.vue";

const app = createApp({
  components: {
    "data-table-packages": DataTablePackages,
    "data-table-errors": DataTableErrors,
  },
});

app.mount("#app");


import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import DataTablePackages from "./components/Table/DataTablePackages.vue";
import DataTableErrors from "./components/Table/DataTableErrors.vue";
import EventDetails from "./components/Page/EventDetails.vue";
import PackageDetails from "./components/Page/PackageDetails.vue";

// Define routes for dynamic pages (EventDetails and PackageDetails)
const routes = [
  { path: "/events/:id", component: EventDetails, props: true },
  { path: "/packages/:id", component: PackageDetails, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp({
  components: {
    "data-table-packages": DataTablePackages,
    "data-table-errors": DataTableErrors,
    "event-details": EventDetails,
    "package-details": PackageDetails,
  },
});

app.use(router);
app.mount("#app");


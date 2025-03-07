TODO: this isn't working as expected. Need to fix it.

<script>
  import { ref, onMounted } from "vue";
  import DataTable from "./DataTable.vue";

  export default {
    components: { DataTable },
    setup() {
      const data = ref([]); // Store combined data
      const BASE_URL = process.env.API_BASE_URL;

      const columns = [
        { title: "Title", data: "title" }, //TODO: Add link to package details page
        { title: "Package ID", data: "identifier" },
        { title: "Origin", data: "origin" },
        { title: "Service Error", data: "service" }, //TODO: Add link to error details page
        { title: "Date/Time", data: "last_modified"},
      ];

      async function fetchData() {
        console.log("BASE_URL:", BASE_URL);

        try {
          // Fetch all events
          console.log(`Fetching events from: ${BASE_URL}/events`);
          const eventsRes = await fetch(`${BASE_URL}/events`);
          if (!eventsRes.ok) throw new Error("Failed to fetch events");
          const eventsData = await eventsRes.json();
          console.log("Fetched events data:", eventsData);

          // Get only events where outcome is "FAILURE"
          const failedEvents = eventsData.results.filter(evt => evt.outcome === "FAILURE");
          console.log("Filtered failed events:", failedEvents);

          if (failedEvents.length === 0) {
            return;
          }

          // Fetch associated package data for failed events
          const packageRequests = failedEvents.map(evt =>
            fetch(`${BASE_URL}/packages/${evt.package_identifier}`)
              .then(res => res.ok ? res.json() : null)
              .catch(err => {
                console.error(`Error fetching package ${evt.package_identifier}:`, err);
                return null;
              })
          );

          const packagesData = await Promise.all(packageRequests);
          console.log("Fetched package data:", packagesData);

          // Merge data
          const mergedData = failedEvents.map((event, index) => {
            const pkg = packagesData[index];

            return pkg ? {
              title: pkg.title,
              identifier: pkg.identifier,
              origin: pkg.origin,
              service: event.service || "N/A",
              last_modified: event.last_modified || "N/A",
            } : null;
          }).filter(item => item !== null);

          data.value = mergedData;
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      onMounted(fetchData);

      return { columns, data };
    },
  };
</script>


<template>
  <div>
    <DataTable tableId="errors" :columns="columns" :data="data" />
  </div>
</template>

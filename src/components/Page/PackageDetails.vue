<script setup>
import { ref, onMounted } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const packageID = ref("");
const errorMessage = ref("");
const BASE_URL = process.env.API_BASE_URL;

onMounted(async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/packages/${props.id}`);
    if (!response.ok) {
      throw new Error("Package not found");
    }
    packageID.value = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      errorMessage.value = 'Error fetching data';
    }
});
</script>

<template>
  <div>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <div v-if="packageID">
      <h1>{{ packageID.name }}</h1>
    </div>
  </div>
</template>

import { mount } from '@vue/test-utils';
import DataTable from '@/Table/DataTable.vue';
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

async function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve));
}

// Utility function to mount the component with default props
function mountDataTable(propsData = {}) {
  return mount(DataTable, {
    propsData: {
      tableId: 'test-table',
      apiEndpoint: '/test-data',
      columns: [{ title: "ID", data: "id" }, { title: "Name", data: "name" }],
      ...propsData
    }
  });
}

describe("DataTable.vue", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    process.env.API_BASE_URL = "http://localhost/api"; // Mock BASE_URL
  });

  it("renders the table", () => {
    const wrapper = mountDataTable();
    expect(wrapper.exists()).toBe(true);
  });

  it("fetches data and displays the correct number of table rows", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ results: [
        { id: 1, name: "Row 1" },
        { id: 2, name: "Row 2" }
      ] })
    );

    const wrapper = mountDataTable();
    await flushPromises();
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('tr').length).toBe(3); // 2 rows of data + 1 header row
  });

  // TODO: update to add the display of an alert in the DOM with the error message
  it('displays an error message if fetching data fails', async () => {
    fetchMock.mockRejectOnce(new Error('API error'));

    const wrapper = mountDataTable();
    await flushPromises();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.errorMessage).toBe('Error fetching data');
  });
});


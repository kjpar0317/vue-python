<template>
  <ag-grid-vue
    class="w-full h-full ag-theme-alpine"
    :columnDefs="columnDefs"
    :rowData="rowData"
    detilRowAutoHeight="true"
    rowHeight="25"
    headerHeight="25"
    pagination="true"
    paginationAutoPageSize="true"
    suppressPaginationPanel="true"
    @grid-ready="handleGridReady"
  >
  </ag-grid-vue>
</template>

<script>
import { reactive, onMounted } from "vue";
import { AgGridVue } from "ag-grid-vue3";

export default {
  components: {
    AgGridVue,
  },
  setup() {
    const gridObj = reactive({ gridApi: null, gridColumnApi: null });

    onMounted(() => {
      onSizeColumnToFit();
    });

    const handleGridReady = (params) => {
      gridObj.gridApi = params.api;
      gridObj.gridColumnApi = params.columnApi;

      onSizeColumnToFit();
    };
    const onSizeColumnToFit = () => {
      if (gridObj && gridObj.gridApi) {
        gridObj.gridApi.sizeColumnsToFit();
      }
    };

    return {
      columnDefs: [
        { headerName: "Make", field: "make" },
        { headerName: "Model", field: "model" },
        { headerName: "Price", field: "price" },
      ],
      rowData: [
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxter", price: 72000 },
        { make: "Kia", model: "Sorento", price: 12000 },
        { make: "Hyundai", model: "Canibal", price: 15000 },
        { make: "Teslar", model: "Model3", price: 34500 },
        { make: "SsangYoung", model: "Musso", price: 9000 },
      ],
      handleGridReady,
      onSizeColumnToFit,
    };
  },
};
</script>

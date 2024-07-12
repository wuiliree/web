<template>
  <div class="custom-table">
    <!-- <div class="table-row">
      <div class="header-cell" v-for="(column, colIndex) in columns" :key="colIndex">
        {{ column.label }}
      </div>
    </div> -->
    <div class="table-row" v-for="(row, rowIndex) in tableData" :key="rowIndex"  style="margin-right: 30px;">
      <div class="table-cell" v-for="(column, colIndex) in columns" :key="colIndex">
        <div style="text-align: right;min-width: 120px;">{{ column.label }}:</div>
        <div style="margin-left: 20px;text-align: center;min-width: 100px;">{{ row[column.prop] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.custom-table {
  display: flex;
  flex-direction: row;
}

.table-row {
  display: flex;
  flex-direction: column;
  border: 1px solid #cccccc;
}


.table-cell {
  padding: 10px;
  min-width: 100px;
  text-align: center;
  color: #e6e6e6;
  display: flex;

  /* border-bottom: 1px solid #e6e6e6; */
}

/* .header-cell {
  color: black;
  background-color: #f5f7fa;
  font-weight: bold;

} */
</style>
<script setup>
import { ref, computed, watch, onBeforeUnmount, onBeforeMount } from "vue";

// PROPS
const props = defineProps({
  title: {
    type: String,
    required: false,
    default: "Table",
  },
  data: {
    type: Array, // [{ id: 1, name: "John Doe", age: 20, ... }, ...]
    required: true,
  },
  columns: {
    type: Array, // [{ name: "id", title: "ID", index: 1, sortable: true }, ...]
    required: true,
  },
  actions: {
    type: Array, // [{ name: "Eliminar", icon: "img", title: "Eliminar" }, ...]
    required: false,
    default: () => [],
  },
  activeRowClickAction: {
    type: Boolean,
    required: false,
    default: false,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  showPagination: {
    type: Boolean,
    required: false,
    default: true,
  },
  allowMultipleSelection: {
    type: Boolean,
    required: false,
    default: true,
  },
  sortBy: {
    type: String,
    required: false,
    default: null,
  },
  rowTooltip: {
    type: String,
    required: false,
    default: "",
  },
});

// DATA
const tableData = ref(null);
const activeRow = ref(null);
const currentPage = ref(1);
const itemsPerPage = 10;
const checkedItems = ref([]);
const sortColumn = ref(null);
const sortDirection = ref(null);

// EMITS
const emit = defineEmits(["rowClick", "actionClick"]);

// LYFE CYCLE HOOKS
onBeforeMount(() => {
  tableData.value = props.data;
  sortColumn.value = props.sortBy;
});
onBeforeUnmount(() => {
  resetComponent();
});

// COMPUTED
const dataColumns = computed(() => {
  return props.columns.filter((column) => column.name !== "actions");
});
const totalItems = computed(() => {
  return tableData.value?.length;
});
const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return tableData.value.slice(startIndex, endIndex);
});
const totalPages = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage);
});
const pagination = computed(() => {
  const pages = [];
  const maxVisiblePages = 3;
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  const startPage =
    currentPage.value - halfVisiblePages > 1
      ? currentPage.value - halfVisiblePages
      : 1;
  const endPage =
    startPage + maxVisiblePages - 1 < totalPages.value
      ? startPage + maxVisiblePages - 1
      : totalPages.value;

  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push(null);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages.value) {
    if (endPage < totalPages.value - 1) {
      pages.push(null);
    }
    pages.push(totalPages.value);
  }

  return {
    currentPage: currentPage.value,
    pages: pages,
  };
});

// METHODS
const handleRowClick = (item) => {
  emit("rowClick", item);
};
const handleAction = (action, item) => {
  activeRow.value = item;
  emit("actionClick", { action, item });
};
const goToPage = (page) => {
  if (page === currentPage.value) return;
  currentPage.value = page;
};
const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const toggleCheckItem = (item) => {
  if (checkedItems.value.includes(item)) {
    checkedItems.value = checkedItems.value.filter((i) => i !== item);
  } else {
    checkedItems.value.push(item);
  }
};
const isColumnSortable = (column) => {
  return column?.sortable === true;
};
const sortColumnData = (column) => {
  if (!isColumnSortable(column)) return;
  if (sortColumn.value === column.name) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = column.name;
    sortDirection.value = "asc";
  }
  tableData.value.sort((a, b) => {
    const valueA = a[column.name];
    const valueB = b[column.name];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortDirection.value === "asc" ? valueA - valueB : valueB - valueA;
    } else {
      const stringA = String(valueA).toLowerCase();
      const stringB = String(valueB).toLowerCase();
      return sortDirection.value === "asc"
        ? stringA.localeCompare(stringB)
        : stringB.localeCompare(stringA);
    }
  });
};
const resetComponent = () => {
  tableData.value = null;
  activeRow.value = null;
  currentPage.value = 1;
  checkedItems.value = [];
  sortColumn.value = null;
  sortDirection.value = null;
};
const isCheckedItem = (item) => {
  return checkedItems.value.includes(item);
};
const isDisabledUser = (item) => {
  return item.roleName === "legado";
};

// EXPOSED
defineExpose({
  checkedItems,
});

// WATCHERS
watch(
  () => props.data,
  (newValue) => {
    tableData.value = newValue;
  },
);
watch(
  () => tableData.value,
  (newValue, oldValue) => {
    // if new and old are the same, return
    if (JSON.stringify(newValue) === JSON.stringify(oldValue)) return;
    const column = props.columns.find((c) => c.name === sortColumn.value);
    sortDirection.value = null;
    sortColumnData(column);
  },
);
</script>

<template>
  <div>
    <div v-if="tableData != null" class="table-container">
      <table class="table-list" aria-label="table">
        <thead class="table-list__head">
          <tr class="table-list__tr">
            <th v-if="allowMultipleSelection" class="table-list__th"></th>
            <th
              v-for="column in columns"
              :key="column"
              class="table-list__th"
              :class="{ 'table-list__th--sortable': isColumnSortable(column) }"
              @click="sortColumnData(column)"
            >
              <div class="column-title">
                <div class="column-title__text">
                  {{ column.title }}
                </div>
                <i
                  v-show="
                    isColumnSortable(column) && sortColumn !== column.name
                  "
                  class="sort-icon mdi mdi-unfold-more-horizontal"
                ></i>
                <i
                  v-show="
                    isColumnSortable(column) && sortColumn === column.name
                  "
                  :class="`sort-icon mdi ${
                    sortDirection === 'asc'
                      ? 'mdi-chevron-down'
                      : 'mdi-chevron-up'
                  }`"
                ></i>
              </div>
            </th>
          </tr>
        </thead>
        <tbody v-if="tableData.length > 0" class="table-list__body">
          <tr
            v-for="item in showPagination ? paginatedData : tableData"
            :key="item.id"
            class="table-list__tr"
          >
            <td
              v-if="allowMultipleSelection"
              class="table-list__td checkboxes-column"
            >
              <input
                :id="`checkbox-${item.id}`"
                type="checkbox"
                class="checkbox"
                :checked="checkedItems.includes(item)"
                @click.stop="toggleCheckItem(item)"
              />
            </td>
            <td
              v-for="column in dataColumns"
              :key="column.name"
              v-tooltip="rowTooltip"
              class="table-list__td"
              :class="{
                'table-list__td--clickable': activeRowClickAction,
                'table-list__td--disabledUser': isDisabledUser(item),
              }"
              @click="activeRowClickAction ? handleRowClick(item) : null"
            >
              <span
                :class="{
                  'table-list__td--bold': column.name === 'id',
                  'table-list__td--accent': isCheckedItem(item),
                }"
              >
                {{
                  item[column.name] == undefined || item[column.name] == null
                    ? "-"
                    : typeof item[column.name] === "boolean"
                      ? item[column.name]
                        ? "Si"
                        : "No"
                      : item[column.name]
                }}
              </span>
            </td>

            <td v-if="actions.length > 0" class="table-list__td">
              <div class="buttons">
                <span
                  v-for="action in actions"
                  :key="action"
                  v-tooltip="action.title"
                  @click.stop="handleAction(action, item)"
                >
                  <img
                    :src="action.icon"
                    :alt="action.title"
                    :title="action.title"
                    class="icon"
                    :class="{
                      'icon--loading': loading && activeRow === item,
                    }"
                  />
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="tableData.length === 0" class="no-data">
        No hay datos para mostrar
      </div>
    </div>
    <nav v-if="showPagination" class="pagination-nav" aria-label="pagination">
      <ul class="pagination-nav-list">
        <li>
          <a
            v-tooltip="'Anterior'"
            class="pagination-nav-link pagination-nav-previous"
            :class="{ 'is-disabled': currentPage === 1 }"
            @click="goToPreviousPage"
          >
            <em class="mdi mdi-chevron-left"></em>
          </a>
        </li>
        <li v-for="page in pagination.pages" :key="page">
          <a
            class="pagination-nav-link"
            :class="{
              'is-current': page === currentPage,
              'is-disabled': page === null,
            }"
            @click="page !== null ? goToPage(page) : null"
          >
            <template v-if="page === null">...</template>
            <template v-else>{{ page }}</template>
          </a>
        </li>
        <li>
          <a
            v-tooltip="'Siguiente'"
            class="pagination-nav-link pagination-nav-next"
            :class="{ 'is-disabled': currentPage === totalPages }"
            @click="goToNextPage"
          >
            <em class="mdi mdi-chevron-right"></em>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.table-container {
  display: flex;
  flex-direction: column;
  box-shadow: app-variables.$box-shadow;
  user-select: none;
}

// TABLE
.table-list {
  font-size: 1rem;
  color: app-variables.$font-color-primary;
  border: none;
  border-collapse: collapse;
  border-spacing: 0;
  background-color: #ffffff;
  border-radius: 4px;
  overflow: hidden;

  .column-title {
    display: flex;
    align-items: center;
    justify-content: center;
    color: app-variables.$font-color-primary;
    font-weight: 600;

    &__text {
      text-align: center;
      justify-self: center;
    }

    .sort-icon-image {
      width: 2rem;
    }
  }

  .checkboxes-column {
    box-shadow: 1px 0 #e9e9e9;
    width: "fit-content";
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    .checkbox {
      cursor: pointer;
      width: 1.3rem;
      height: 1.3rem;
      accent-color: app-variables.$accent-color;
    }
  }

  &__th,
  &__td {
    width: fit-content;
    min-width: auto;
    text-align: center;
    font-size: 1rem;
    white-space: nowrap;
    padding: 0.4rem 1rem;
  }

  &__tr {
    border-bottom: 1px solid #e9e9e9;

    &:hover {
      background-color: #fafafa;

      td {
        color: app-variables.$accent-color;
      }
    }

    &:last-child {
      border-bottom: none;
    }
  }

  &__th {
    background-color: app-variables.$secondary-color;
    font-weight: 500;
    text-align: center;
    vertical-align: bottom;

    &--sortable {
      cursor: pointer;

      .sort-icon {
        margin-left: 0.2rem;
        font-size: 1.12rem;
      }
    }
  }

  &__td {
    vertical-align: middle;
    color: app-variables.$font-color-primary;

    &--accent {
      color: app-variables.$accent-color;
    }

    &--bold {
      font-weight: 700;
    }

    &--clickable {
      cursor: pointer;
    }

    &--disabledUser {
      background-color: rgb(249 0 0 / 12.1%);
    }
  }
}

// BUTON
.buttons {
  display: flex;
  justify-content: center;

  .icon {
    cursor: pointer;
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    &:hover {
      transform: scale(1.1);
    }

    &--loading {
      cursor: progress;
      animation: loading 2s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    @keyframes loading {
      0% {
        transform: scale(1);
      }

      50% {
        transform: scale(1.2);
      }

      100% {
        transform: scale(1);
      }
    }
  }
}

// PAGINATION
.pagination-nav {
  .pagination-nav-list {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;

    .pagination-nav-link {
      border-radius: 4px;
      border: 1px solid app-variables.$accent-color;
      color: app-variables.$accent-color;
      background-color: app-variables.$color-white;
      font-size: 0.8rem;
      line-height: 1rem;
      padding: 0.35rem 0.65rem;
      cursor: pointer;
      display: flex;
      align-items: center;

      &.is-current {
        background-color: app-variables.$accent-color;
        color: app-variables.$color-white;
        transform: scale(1.1);
      }

      &.is-disabled {
        cursor: not-allowed;
        opacity: 0.5;

        &:hover {
          background-color: app-variables.$color-white;
          color: app-variables.$color-primary-dark;
        }
      }

      &:hover {
        background-color: app-variables.$accent-color;
        color: app-variables.$color-white;
      }
    }

    .pagination-nav-previous,
    .pagination-nav-next {
      border: 1px solid transparent;
      padding: 0.25rem 0.2rem;

      .mdi {
        font-size: 1.6rem;
      }
    }

    .pagination-nav-previous {
      margin-right: 0.5rem;
    }

    .pagination-nav-next {
      margin-left: 0.5rem;
    }

    .pagination-nav-previous:hover,
    .pagination-nav-next:hover {
      background-color: transparent;
      color: app-variables.$accent-color;
      transform: scale(1.3);
    }

    li {
      list-style: none;
    }
  }
}

.no-data {
  text-align: center;
  width: 100%;
  margin-bottom: 2rem;
}

@media (max-width: app-variables.$breakpoint-tablet-to-desktop) {
  .table-list {
    &__td {
      padding: 0.2rem 0.5rem;
    }
  }
}
</style>

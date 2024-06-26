<script setup>
import { ref, onMounted } from "vue";
import {
  ToastProgrammatic as Toast,
  DialogProgrammatic as Dialog,
} from "@fantage9/buefy-vue3";
import BaseTableComponent from "@/components/base/ui/BaseTableComponent.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import FormUsers from "@/components/Settings/FormUsers.vue";
import { USERS_TABLE_CONFIG } from "@/config/settings-config.js";
import { useSettingsStore } from "@/store/settingsStore.js";
import { useSettingsDataLoader } from "@/composables/useSettingsDataLoader.js";

// STORES & COMPOSABLES
const settingsStore = useSettingsStore();
const { updateAllUsers } = useSettingsDataLoader();

// COMPONENT REFS
const modalRef = ref(null);

// DATA
const isLoading = ref(false);
const tableConfig = ref(null);
const dataCopy = ref(null);
const modalAction = ref(null);
const userToUpdate = ref({
  id: null,
  name: "",
  surnames: "",
  password: "",
  passwordConfirm: "",
  email: "",
  roleName: "",
  cod: "",
});
const userNameFilter = ref("");
const filterHideDisabledUsers = ref(false);

// LIFECYCLE
onMounted(() => {
  setTableConfig();
});

// METHODS
const setTableConfig = () => {
  tableConfig.value = {
    ...USERS_TABLE_CONFIG,
    data: setData(),
  };
};
const setData = () => {
  const data = settingsStore.allUsers.map((user) => {
    return {
      id: user.id,
      name: user.name,
      surnames: user.surnames,
      roleName: user.roleName,
      cod: user.cod,
    };
  });
  dataCopy.value = JSON.parse(JSON.stringify(data));
  return data;
};
const updateData = async () => {
  await updateAllUsers();
  const updatedData = setData();
  dataCopy.value = JSON.parse(JSON.stringify(updatedData));
  tableConfig.value.data = updatedData;
  filterData();
};
const onActionClick = ({ action, item: user }) => {
  switch (action.name) {
    case "edit":
      onEditButtonClick(user);
      break;
    case "disable":
      onDisableButtonClick(user);
      break;
  }
};
const onCreateButtonClick = () => {
  modalAction.value = "create";
  modalRef.value.isModalActive = true;
};
const onEditButtonClick = (user) => {
  const userInfo = getUserInfo(user.id);
  userToUpdate.value = {
    ...userToUpdate.value,
    ...userInfo,
  };
  modalAction.value = "update";
  modalRef.value.isModalActive = true;
};
const onDisableButtonClick = async (user) => {
  try {
    Dialog.confirm({
      title: "Deshabilitar usuario",
      message:
        "¿Estas seguro que deseas deshabilitar al usuario? Se perderá el registro de todos los tramos asignados",
      cancelText: "No",
      confirmText: "Sí",
      type: "is-primary",
      onConfirm: async () => {
        await settingsStore.disableUser(user.id);
        showSuccessToast();
        updateData();
      },
      onCancel: () => {
        return false;
      },
    });
  } catch (error) {
    showErrorToast();
  }
};
const onFormCancel = () => {
  modalAction.value = null;
  resetUserToUpdate();
  modalRef.value.isModalActive = false;
};
const onFormSubmit = async (user) => {
  isLoading.value = true;
  try {
    if (modalAction.value === "create") {
      await settingsStore.registerUser(user);
    } else {
      await settingsStore.updateUser(userToUpdate.value.id, user);
    }
    showSuccessToast();
    updateData();
  } catch (error) {
    showErrorToast();
  } finally {
    modalRef.value.isModalActive = false;
    resetUserToUpdate();
    isLoading.value = false;
    modalAction.value = null;
  }
};
const resetUserToUpdate = () => {
  userToUpdate.value = {
    id: null,
    name: "",
    surnames: "",
    password: "",
    passwordConfirm: "",
    email: "",
    roleName: "",
    cod: "",
  };
};
const showSuccessToast = (messageVerb = null) => {
  let verb = "creado";
  if (messageVerb) {
    verb = messageVerb;
  } else {
    verb = modalAction.value === "create" ? "creado" : "actualizado";
  }
  Toast.open({
    message: `Usuario ${verb} con éxito`,
    type: "is-success",
  });
};
const showErrorToast = () => {
  Toast.open({
    message: "Ha ocurrido un error al procesar la solicitud",
    type: "is-danger",
  });
};
const getUserInfo = (id) => {
  return settingsStore.allUsers.find((section) => section.id === id);
};
const onNameFilterChange = (value) => {
  clearTimeout(window.timer);
  window.timer = setTimeout(() => {
    userNameFilter.value = value;
    filterData();
  }, 300);
};
const filterData = () => {
  let data = JSON.parse(JSON.stringify(dataCopy.value));
  const filterWords = userNameFilter.value.toLowerCase().split(" ");
  data = data.filter((user) => {
    const fullName = (user.name + " " + user.surnames).toLowerCase();
    const shouldHideDisabledUsers =
      filterHideDisabledUsers.value === true && user.roleName === "legado";
    return (
      filterWords.every((word) => fullName.includes(word)) &&
      !shouldHideDisabledUsers
    );
  });
  tableConfig.value.data = data;
};
</script>

<template>
  <div class="setting-users">
    <div class="controls">
      <div class="controls__filters">
        <b-field label="Filtrar por nombre y apellidos" class="filter-label">
          <b-input
            class="filter-input"
            :model-value="userNameFilter"
            type="is-primary"
            placeholder="Ej: Marcos"
            @input="onNameFilterChange($event.target.value)"
          />
        </b-field>
        <b-field label="Mostrar usuarios deshabilitados" class="filter-label">
          <b-select
            v-model="filterHideDisabledUsers"
            placeholder="Seleccione"
            @change="filterData()"
          >
            >
            <option :value="false">Sí</option>
            <option :value="true">No</option>
          </b-select>
        </b-field>
      </div>
      <div class="controls__buttons">
        <b-button
          class="button"
          type="is-primary"
          icon-left="plus"
          expanded
          @click="onCreateButtonClick()"
        >
          Registrar usuario
        </b-button>
      </div>
    </div>
    <div class="table">
      <BaseTableComponent
        v-if="tableConfig"
        v-bind="tableConfig"
        @action-click="onActionClick"
      />
    </div>
  </div>
  <base-modal
    ref="modalRef"
    :title="
      modalAction === 'create' ? 'Registrar usuario' : 'Actualizar usuario'
    "
    :close-click-outside="false"
    :show-header-close-button="false"
  >
    <template #content>
      <FormUsers
        :action="modalAction"
        :user-to-update="userToUpdate"
        :is-loading="isLoading"
        @cancel="onFormCancel"
        @submit="onFormSubmit"
      />
    </template>
  </base-modal>
</template>

<style lang="scss" scoped>
.setting-users {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  max-width: 90vw;

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
    margin: 0 1rem 1rem;
    width: 100%;

    &__filters {
      display: flex;
      gap: 1rem;
      align-items: space-between;

      .filter-label {
        text-align: start;
      }
    }

    &__buttons {
      .button {
        max-width: 200px;
      }
    }
  }

  .table {
    width: 100%;
  }
}

@media (min-width: app-variables.$breakpoint-tablet-to-desktop) {
  .setting-users {
    max-width: 90%;
  }
}
</style>

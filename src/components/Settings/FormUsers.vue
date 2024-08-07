<script setup>
import { ref, computed, defineProps, watch, onMounted } from "vue";
import Spinner from "@/components/LoadingComponent.vue";
import { useSettingsStore } from "@/store/settingsStore.js";
import { useAppStore } from "@/store/appStore.js";
import { USER_GROUP_TYPES } from "@/config/settings-config.js";

// PROPS
const props = defineProps({
  action: {
    type: String,
    required: true,
  },
  userToUpdate: {
    type: Object,
    default: () => ({
      id: null,
      name: "",
      surnames: "",
      password: "",
      passwordConfirm: "",
      email: "",
      roleName: null,
      cod: "",
    }),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

// STORES & COMPOSABLES
const settingsStore = useSettingsStore();
const appStore = useAppStore();

// DATA
const user = ref({ ...props.userToUpdate });

// COMPUTED
const nameHasErrors = computed(() => {
  return user.value.name === "";
});
const surnamesHasErrors = computed(() => {
  return user.value.surnames === "";
});
const passwordHasErrors = computed(() => {
  return (
    props.action === "create" &&
    (user.value.password === "" || user.value.password === null)
  );
});
const passwordConfirmHasErrors = computed(() => {
  return (
    props.action === "create" &&
    user.value.password !== "" &&
    user.value.password !== user.value.passwordConfirm
  );
});
const emailHasErrors = computed(() => {
  if (props.action === "update") return false;
  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return (
    user.value.email === "" ||
    user.value.email === null ||
    user.value.email === undefined ||
    !user.value.email.match(emailRegex)
  );
});
const roleNameHasErrors = computed(() => {
  return user.value.roleName === "";
});
const codHasErrors = computed(() => {
  if (props.action === "update") return false;
  return user.value.cod === "";
});
const groupNameHasErrors = computed(() => {
  return (
    user.value.isGroup &&
    (user.value.groupName === "" ||
      user.value.groupName === null ||
      user.value.groupName === undefined)
  );
});
const groupMembersHasErrors = computed(() => {
  return (
    user.value.isGroup &&
    (user.value.groupMembers === "" ||
      user.value.groupMembers === null ||
      user.value.groupMembers === undefined)
  );
});
const groupTypeHasErrors = computed(() => {
  return (
    user.value.isGroup &&
    (user.value.groupType === null || user.value.groupType === undefined)
  );
});
const isFormValid = computed(() => {
  return (
    !nameHasErrors.value &&
    !surnamesHasErrors.value &&
    !passwordHasErrors.value &&
    !passwordConfirmHasErrors.value &&
    !emailHasErrors.value &&
    !roleNameHasErrors.value &&
    !codHasErrors.value &&
    !groupNameHasErrors.value &&
    !groupMembersHasErrors.value &&
    !groupTypeHasErrors.value
  );
});
const userRole = computed({
  get: () => {
    const roleInfo = settingsStore.allUserRoles.find(
      (role) => role.name === user.value.roleName,
    );
    return roleInfo;
  },
  set: (value) => {
    return (user.value.roleName = value.name);
  },
});

// EMITS
const emit = defineEmits(["cancel", "submit"]);

// LYFECYCLE
onMounted(() => {
  if (
    Object.keys(user.value).indexOf("isGroup") === -1 ||
    user.value.isGroup === null ||
    user.value.isGroup === undefined
  ) {
    user.value.isGroup = false;
  }
});

// METHODS
const onCancel = () => {
  emit("cancel");
};
const onSubmit = () => {
  if (!isFormValid.value) return;
  const parsedUser = {
    ...user.value,
    roleId: userRole.value.id,
    groupName: user.value.groupName || null,
    groupMembers: user.value.groupMembers
      ? Number(user.value.groupMembers)
      : null,
    groupType: user.value.groupType || null,
  };
  emit("submit", parsedUser);
};

// WATCHERS
watch(
  () => props.userToUpdate,
  (newValue) => {
    user.value = { ...newValue };
  },
);
</script>

<template>
  <div class="form-create-update-section">
    <div class="inputs">
      <b-field
        label="Nombre"
        :message="{
          '*Este no puede estar vacío': nameHasErrors,
        }"
        :type="{ 'is-danger': nameHasErrors }"
      >
        <b-input
          id="alias"
          v-model="user.name"
          type="text"
          placeholder="Nombre"
        />
      </b-field>
      <b-field
        label="Apellidos"
        :message="{
          '*Este no puede estar vacío': surnamesHasErrors,
        }"
        :type="{ 'is-danger': surnamesHasErrors }"
      >
        <b-input
          id="apellidos"
          v-model="user.surnames"
          type="text"
          placeholder="Apellidos"
        />
      </b-field>
      <b-field
        label="Contraseña"
        :message="{
          '*Debe coincidir con la contraseña': passwordHasErrors,
        }"
        :type="{ 'is-danger': passwordHasErrors }"
      >
        <b-input
          id="password"
          v-model="user.password"
          type="password"
          placeholder="Contraseña"
          password-reveal
        />
      </b-field>
      <b-field
        v-if="props.action === 'create'"
        label="Confirmar Contraseña"
        :message="{
          '*Debe coincidir con la contraseña': passwordConfirmHasErrors,
        }"
        :type="{ 'is-danger': passwordConfirmHasErrors }"
      >
        <b-input
          id="passwordConfirm"
          v-model="user.passwordConfirm"
          type="password"
          :disabled="user.password === ''"
          placeholder="Confirmar Contraseña"
          password-reveal
        />
      </b-field>
      <b-field
        v-if="props.action === 'create'"
        label="Email"
        :message="{
          '*Debe ser un email válido': emailHasErrors,
        }"
        :type="{ 'is-danger': emailHasErrors }"
      >
        <b-input
          id="email"
          v-model="user.email"
          type="email"
          placeholder="Email"
        />
      </b-field>
      <b-field
        label="Rol"
        :message="{
          '*Debes seleccionar un rol': roleNameHasErrors,
        }"
        :type="{ 'is-danger': roleNameHasErrors }"
      >
        <b-select
          id="role"
          v-model="userRole"
          placeholder="Seleccione un rol"
          :disabled="props.userToUpdate.roleName === 'admin'"
          expanded
        >
          <option
            v-for="role in settingsStore.allUserRoles"
            :key="role.id"
            :value="role"
          >
            {{ role.name }}
          </option>
        </b-select>
      </b-field>
      <b-field
        v-if="props.action === 'create'"
        label="Cod"
        :message="{
          '*Este no puede estar vacío': codHasErrors,
        }"
        :type="{ 'is-danger': codHasErrors }"
      >
        <b-input id="cod" v-model="user.cod" type="text" placeholder="Cod" />
      </b-field>
      <!-- Group fields -->
      <b-field label="Es grupo">
        <b-select
          id="isGroup"
          v-model="user.isGroup"
          placeholder="Seleccione una opción"
          expanded
        >
          <option :value="true">Sí</option>
          <option :value="false">No</option>
        </b-select>
      </b-field>
      <b-field
        v-if="user.isGroup"
        label="Nombre del grupo"
        :message="{
          '*Este no puede estar vacío': groupNameHasErrors,
        }"
        :type="{ 'is-danger': groupNameHasErrors }"
      >
        <b-input
          id="groupName"
          v-model="user.groupName"
          type="text"
          placeholder="Nombre del grupo"
        />
      </b-field>
      <b-field
        v-if="user.isGroup"
        label="Nº de miembros"
        :message="{
          '*Este no puede estar vacío': groupMembersHasErrors,
        }"
        :type="{ 'is-danger': groupMembersHasErrors }"
      >
        <b-input
          id="groupName"
          v-model="user.groupMembers"
          type="number"
          placeholder="Nº de miembros"
        />
      </b-field>
      <b-field
        v-if="user.isGroup"
        label="Tipo de grupo"
        :message="{
          '*Este no puede estar vacío': groupTypeHasErrors,
        }"
        :type="{ 'is-danger': groupTypeHasErrors }"
      >
        <b-select
          id="role"
          v-model="user.groupType"
          placeholder="Seleccione un tipo"
          expanded
        >
          <option
            v-for="GType in USER_GROUP_TYPES"
            :key="GType.id"
            :value="GType.name"
          >
            {{ GType.name }}
          </option>
        </b-select>
      </b-field>
    </div>
    <div class="buttons">
      <b-button
        class="button"
        type="is-danger"
        outlined
        icon-left="close"
        :disabled="props.isLoading"
        expanded
        @click="onCancel()"
      >
        Cancelar
      </b-button>
      <b-button
        class="button"
        type="is-success"
        icon-left="check"
        expanded
        :disabled="!isFormValid || props.isLoading || !appStore.isOnline"
        @click="onSubmit()"
      >
        {{ props.action === "create" ? "Crear" : "Actualizar" }}
      </b-button>
      <Spinner :is-loading="props.isLoading" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-create-update-section {
  padding: 1rem;

  .buttons {
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;

    .button {
      width: 48%;
    }
  }
}

@media (min-width: app-variables.$breakpoint-tablet-to-desktop) {
  .form-create-update-section {
    min-width: 600px;

    .inputs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
}
</style>

<script setup>
import { ref, computed, defineProps, watch } from "vue";
import Spinner from "@/components/LoadingComponent.vue";
import { useSettingsStore } from "@/store/settingsStore.js";
import { useAppStore } from "@/store/appStore.js";

// PROPS
const props = defineProps({
  action: {
    type: String,
    required: true,
  },
  riverSectionToUpdate: {
    type: Object,
    default: () => ({
      id: null,
      alias: "",
      coordX: null,
      coordY: null,
      idMunicipality: null,
      idRiver: null,
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
const riverSection = ref({ ...props.riverSectionToUpdate });

// COMPUTED
const aliasHasErrors = computed(() => {
  return riverSection.value.alias === "";
});
const coordXHasErrors = computed(() => {
  return (
    riverSection.value.coordX === null ||
    riverSection.value.coordX === "" ||
    riverSection.value.coordX < -180 ||
    riverSection.value.coordX > 180
  );
});
const coordYHasErrors = computed(() => {
  return (
    riverSection.value.coordY === null ||
    riverSection.value.coordY === "" ||
    riverSection.value.coordY < -90 ||
    riverSection.value.coordY > 90
  );
});
const idMunicipalityHasErrors = computed(() => {
  return riverSection.value.idMunicipality === null;
});
const idRiverHasErrors = computed(() => {
  return riverSection.value.idRiver === null;
});
const isFormValid = computed(() => {
  return (
    !aliasHasErrors.value &&
    !coordXHasErrors.value &&
    !coordYHasErrors.value &&
    !idMunicipalityHasErrors.value &&
    !idRiverHasErrors.value
  );
});

// EMITS
const emit = defineEmits(["cancel", "submit"]);

// METHODS
const onCancel = () => {
  emit("cancel");
};
const onSubmit = () => {
  if (!isFormValid.value) return;
  const parsedRiverSection = {
    ...riverSection.value,
    coordX: parseFloat(riverSection.value.coordX),
    coordY: parseFloat(riverSection.value.coordY),
  };
  emit("submit", parsedRiverSection);
};

// WATCHERS
watch(
  () => props.riverSectionToUpdate,
  (newValue) => {
    riverSection.value = { ...newValue };
  },
);
</script>

<template>
  <div class="form-create-update-section">
    <div class="inputs">
      <b-field
        label="Alias"
        :message="{
          '*Este no puede estar vacío': aliasHasErrors,
        }"
        :type="{ 'is-danger': aliasHasErrors }"
      >
        <b-input
          id="alias"
          v-model="riverSection.alias"
          type="text"
          placeholder="Alias"
        />
      </b-field>
      <b-field
        label="Coordenada X"
        :message="{
          '*Es necesario un valor entre -180 y 180': coordXHasErrors,
        }"
        :type="{ 'is-danger': coordXHasErrors }"
      >
        <b-input
          id="coordX"
          v-model="riverSection.coordX"
          type="number"
          placeholder="Coordenada X"
        />
      </b-field>
      <b-field
        label="Coordenada Y"
        :message="{
          '*Es necesario un valor entre -90 y 90': coordYHasErrors,
        }"
        :type="{ 'is-danger': coordYHasErrors }"
      >
        <b-input
          id="coordY"
          v-model="riverSection.coordY"
          type="number"
          placeholder="Coordenada Y"
        />
      </b-field>
      <b-field
        label="Municipio"
        :message="{
          '*Debes seleeccionar un municipio': idMunicipalityHasErrors,
        }"
        :type="{ 'is-danger': idMunicipalityHasErrors }"
      >
        <b-select
          id="idMunicipality"
          v-model="riverSection.idMunicipality"
          placeholder="Seleccione un municipio"
          expanded
        >
          <option
            v-for="municipality in settingsStore.allMunicipalities"
            :key="municipality.id"
            :value="municipality.id"
          >
            {{ municipality.name }}
          </option>
        </b-select>
      </b-field>
      <b-field
        label="Río"
        :message="{
          '*Debes seleccionar un río': idRiverHasErrors,
        }"
        :type="{ 'is-danger': idRiverHasErrors }"
      >
        <b-select
          id="idRiver"
          v-model="riverSection.idRiver"
          placeholder="Seleccione un río"
          expanded
        >
          <option
            v-for="river in settingsStore.allRivers"
            :key="river.id"
            :value="river.id"
          >
            {{ river.name }}
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

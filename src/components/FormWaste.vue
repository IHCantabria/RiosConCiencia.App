<template>
  <div class="form-section">
    <h5 class="title is-5">3. Inspección de Residuos (100m)</h5>
    <div class="form-section__block">
      <b-field>
        <b-select
          placeholder="Seleccione tipo de residuo"
          icon="delete-variant"
          expanded=""
          v-model="selectedWaste"
        >
          <optgroup
            v-for="(group, index) in formWaste.data.wasteOptions"
            :key="index"
            :label="group.material"
          >
            <option
              v-for="(option, index) in group.options"
              :key="index"
              :value="option"
            >
              {{ option.name }}
            </option>
          </optgroup>
        </b-select>
      </b-field>
      <b-field>
        <b-numberinput v-model="units"></b-numberinput>
      </b-field>
      <b-button type="is-primary" @click="saveNewWaste">
        Guardar
      </b-button>
    </div>
    <div class="table-container" v-if="values.wasteList.length > 0">
      <b-table
        :data="values.wasteList"
        :columns="wasteTable.columns"
        :checked-rows.sync="wasteTable.selectedRows"
        :narrowed="true"
        :mobile-cards="false"
        checkable
      ></b-table>
    </div>
    <div v-else>
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="delete-variant" size="is-large"> </b-icon>
          </p>
          <p>No hay residuos</p>
        </div>
      </section>
    </div>
    <b-field v-if="wasteTable.selectedRows.length > 0">
      <b-button
        type="is-primary"
        icon-left="delete"
        outlined
        size="is-small"
        expanded
        @click="removeSelectedWaste()"
        >Eliminar residuos seleccionados</b-button
      >
    </b-field>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      formWaste: state => state.formSections.waste
    })
  },
  data() {
    return {
      values: {
        wasteList: []
      },
      selectedWaste: {},
      units: 0,
      wasteTable: {
        selectedRows: [],
        columns: [
          {
            field: "name",
            label: "Residuo"
          },
          {
            field: "units",
            label: "Unidades"
          }
        ]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions({
      updateSectionValues: "updateSectionValues"
    }),
    init() {
      this.selectedWaste = this.formWaste.data.wasteOptions[0].options[0];
    },
    saveNewWaste() {
      const newWaste = {
        ...this.selectedWaste,
        units: this.units
      };
      this.values.wasteList.push(newWaste);
      this.updateSectionValues(this.values);
    },
    removeSelectedWaste() {
      const self = this;
      for (const element of this.wasteTable.selectedRows) {
        var filtered = self.values.wasteList.filter(value => {
          return value !== element;
        });
        self.values.wasteList = filtered;
      }
      this.wasteTable.selectedRows = [];
      this.updateSectionValues(this.values);
    }
  }
};
</script>
<style lang="scss" scoped>
.table-container {
  padding: 1rem;
}
</style>

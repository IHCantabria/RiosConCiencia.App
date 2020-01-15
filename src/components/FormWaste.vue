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
            v-for="(group, index) in wasteOptions"
            :key="index"
            :label="group.material"
          >
            <option
              v-for="(option, index) in group.options"
              :key="index"
              :value="option"
            >
              {{ option }}
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
    <div class="table-container" v-if="waste.length > 0">
      <b-table
        :data="waste"
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
export default {
  data() {
    return {
      waste: [],
      selectedWaste: {},
      wasteOptions: [
        {
          material: "Plástico",
          options: ["Bidones grandes(>25litros)", "Bolsas", "Botellas"]
        },
        {
          material: "Papel/Cartón",
          options: ["Bolsas de papel", "Bricks", "Paquetes de tabaco"]
        }
      ],
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
    this.selectedWaste = this.wasteOptions[0].options[0];
  },
  methods: {
    saveNewWaste() {
      const newWaste = {
        name: this.selectedWaste,
        units: this.units
      };
      this.waste.push(newWaste);
    },
    removeSelectedWaste() {
      const self = this;
      for (const element of this.wasteTable.selectedRows) {
        var filtered = self.waste.filter(value => {
          return value !== element;
        });
        self.waste = filtered;
      }
      this.wasteTable.selectedRows = [];
    }
  }
};
</script>
<style lang="scss" scoped>
.table-container {
  padding: 1rem;
}
</style>

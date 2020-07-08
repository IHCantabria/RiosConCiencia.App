<template>
  <div class="form-section">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>3. Inspección de residuos (100 m)</span>
      </h5>
      <a :href="pdfLink" class="header-section__help" target="_blank"
        ><b-icon icon="information-outline" type="is-primary"></b-icon
      ></a>
    </div>
    <div class="form-section__block form-section__block-waste">
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
            :label="group.material | upperCase"
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
        <b-numberinput v-model="units" min="1"></b-numberinput>
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
      formWaste: state => state.formExpertSections.waste
    }),
    isSectionValid() {
      return true; //optional section
    }
  },
  created() {
    this.pdfLink = require("../../assets/pdfs/residuos.pdf");
  },
  data() {
    return {
      pdfLink: null,
      values: {
        wasteList: []
      },
      selectedWaste: {},
      units: 1,
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
  beforeUpdate() {
    this.updateSpecificExpertSectionValues({
      name: "waste",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  watch: {
    selectedWaste() {
      this.units = 1;
    }
  },
  methods: {
    ...mapActions({
      updateSpecificExpertSectionValues: "updateSpecificExpertSectionValues",
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
      const indexWaste = this.checkWasteExist(newWaste);
      this.addWaste(newWaste, indexWaste);
      this.units = 1;
      this.updateSectionValues({ values: this.values, isValid: true });
    },
    checkWasteExist(newWaste) {
      return this.values.wasteList.findIndex(waste => waste.id == newWaste.id);
    },
    addWaste(newWaste, index) {
      index == -1
        ? this.values.wasteList.push(newWaste)
        : (this.values.wasteList[index].units =
            this.values.wasteList[index].units + newWaste.units);
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
      this.updateSectionValues({ values: this.values, isValid: true });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
.table-container {
  padding: 1rem;
}
</style>

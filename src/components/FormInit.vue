<template>
  <div class="form-section">
    <h5 class="title is-5">0. Datos Iniciales</h5>
    <b-field label="Nombre del responsable">
      <label>Luis Pedraz</label>
    </b-field>
    <b-field label="Acompañantes">
      <b-input value=""></b-input>
    </b-field>
    <b-field label="Tramo">
      <b-select placeholder="Seleccione Tramo">
        <option value="tr2">Tramo 1</option>
        <option value="tr1">Tramo 2</option>
      </b-select>
    </b-field>
    <b-field label="Cuenca / Municipio">
      <label>Saja / Cabezón de la Sal</label>
    </b-field>
    <b-field label="Clima hoy">
      <b-select placeholder="Seleccione una opción">
        <option value="sol">Soleado</option>
        <option value="nubes">Nublado</option>
        <option value="lluvia">Lluvioso</option>
      </b-select>
    </b-field>
    <b-field label="Clima últimos 2 días">
      <b-select placeholder="Seleccione una opción">
        <option value="sol">Soleado</option>
        <option value="nubes">Nublado</option>
        <option value="lluvia">Lluvioso</option>
      </b-select>
    </b-field>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      activeSectionId: state => state.activeSectionId
    })
  }
};
</script>
<style lang="scss" scoped></style>

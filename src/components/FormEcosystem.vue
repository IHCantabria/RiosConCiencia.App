<template>
  <div class="form-section">
    <h5 class="title is-5">5. El ecosistema acúatico (50m)</h5>
    <b-field label="a. Descripción del punto de muestreo"> </b-field>

    <b-field label="Coordenadas (WGS84)" custom-class="is-small"></b-field>
    <div class="two-controls">
      <b-field label="Lon" custom-class="is-small">
        <b-input
          placeholder="Number"
          type="number"
          min="-180"
          max="180"
          step="any"
          custom-class="is-small"
          v-model="samplePointCoords.lon"
        >
        </b-input>
      </b-field>
      <b-field label="Lat" custom-class="is-small">
        <b-input
          placeholder="Number"
          type="number"
          min="-90"
          max="90"
          step="any"
          custom-class="is-small"
          v-model="samplePointCoords.lat"
        >
        </b-input>
      </b-field>
    </div>
    <b-field>
      <b-button
        type="is-primary"
        icon-left="map-marker"
        outlined
        size="is-small"
        expanded
        @click="getActualPosition()"
        >Obtener posición actual</b-button
      >
    </b-field>
    <b-field label="Anchura (m)" custom-class="is-small">
      <b-numberinput v-model="samplePointWidth" step="0.1"></b-numberinput>
    </b-field>
    <b-field label="Profundidad media (m)" custom-class="is-small">
      <b-numberinput v-model="samplePointDepth" step="0.1"></b-numberinput>
    </b-field>
    <b-field label="Velocidad del agua (m/s)" custom-class="is-small">
      <b-numberinput
        v-model="samplePointWaterVelocity"
        step="0.1"
      ></b-numberinput>
    </b-field>
    <b-field label="Caudal" custom-class="is-small"> </b-field>
    <label>{{ flow }}m³/s</label>
    <div class="is-divider"></div>
    <b-field label="b. Características físicas del agua"> </b-field>
    <b-field label="Temperatura (°C)" custom-class="is-small">
      <b-numberinput v-model="samplePointWaterTemp"></b-numberinput>
    </b-field>
    <b-field label="Transparencia" custom-class="is-small"> </b-field>
    <b-field
      label="(marcar solo los sectores que se ven en el disco, en el caso de no ver
        ninguno, marcar el 0)"
      custom-class="is-small"
    ></b-field>
    <div class="field">
      <b-checkbox
        v-for="(option, index) in transparencyOptions"
        :key="index"
        v-model="samplePointWaterTransparency"
        :native-value="option"
        >{{ option }}
      </b-checkbox>
    </div>
    <div class="is-divider"></div>
    <b-field label="c. La vida en el río y las riberas"> </b-field>
    <b-field
      label="1. Plantas localizadas dentro del río o en las orillas internas del cauce"
      custom-class="is-small"
    >
    </b-field>
    <div
      class="block"
      v-for="(group, index) in plantsInsideGroups"
      :key="index"
    >
      <div class="checkboxes-group">
        <label class="checkboxes-group__title">{{ group.name }}</label>
      </div>
      <div
        class="field"
        v-for="(option, indexOpt) in group.options"
        :key="indexOpt"
      >
        <b-checkbox v-model="riverEcosystem" :native-value="option">{{
          option
        }}</b-checkbox>
      </div>
    </div>
    <b-field
      label="2. Plantas localizadas fuera del río"
      custom-class="is-small"
    >
    </b-field>
    <div
      class="block"
      v-for="(group, index) in plantsOutsideGroups"
      :key="index"
    >
      <div class="checkboxes-group">
        <label class="checkboxes-group__title">{{ group.name }}</label>
      </div>
      <div
        class="field"
        v-for="(option, indexOpt) in group.options"
        :key="indexOpt"
      >
        <b-checkbox v-model="riverEcosystem" :native-value="option">{{
          option
        }}</b-checkbox>
      </div>
    </div>
    <div class="block">
      <b-field label="3. Aves" custom-class="is-small"> </b-field>
      <div class="field" v-for="(option, indexOpt) in birds" :key="indexOpt">
        <b-checkbox v-model="riverEcosystem" :native-value="option">{{
          option
        }}</b-checkbox>
      </div>
    </div>
    <b-field label="4. Cangrejos de río" custom-class="is-small"> </b-field>
    <div class="block" v-for="(group, index) in riverCrabGroups" :key="index">
      <div class="checkboxes-group">
        <label class="checkboxes-group__title">{{ group.name }}</label>
      </div>
      <div
        class="field"
        v-for="(option, indexOpt) in group.options"
        :key="indexOpt"
      >
        <b-checkbox v-model="riverEcosystem" :native-value="option">{{
          option
        }}</b-checkbox>
      </div>
    </div>
    <div class="block">
      <b-field label="5. Anfibios" custom-class="is-small"> </b-field>
      <div
        class="field"
        v-for="(option, indexOpt) in amphibians"
        :key="indexOpt"
      >
        <b-checkbox v-model="riverEcosystem" :native-value="option">{{
          option
        }}</b-checkbox>
      </div>
    </div>
    <div class="block">
      <b-field label="6. Reptiles" custom-class="is-small"> </b-field>
      <div class="field" v-for="(option, indexOpt) in reptiles" :key="indexOpt">
        <b-checkbox v-model="riverEcosystem" :native-value="option">{{
          option
        }}</b-checkbox>
      </div>
    </div>
    <div class="block">
      <b-field label="7. Peces" custom-class="is-small"> </b-field>
      <div class="block" v-for="(group, index) in fish" :key="index">
        <div class="checkboxes-group">
          <label class="checkboxes-group__title">{{ group.name }}</label>
        </div>
        <div
          class="field"
          v-for="(option, indexOpt) in group.options"
          :key="indexOpt"
        >
          <b-checkbox v-model="riverEcosystem" :native-value="option">{{
            option
          }}</b-checkbox>
        </div>
      </div>
    </div>
    <div class="block">
      <b-field label="8. Mamíferos" custom-class="is-small"> </b-field>
      <div class="block" v-for="(group, index) in mammal" :key="index">
        <div class="checkboxes-group">
          <label class="checkboxes-group__title">{{ group.name }}</label>
        </div>
        <div
          class="field"
          v-for="(option, indexOpt) in group.options"
          :key="indexOpt"
        >
          <b-checkbox v-model="riverEcosystem" :native-value="option">{{
            option
          }}</b-checkbox>
        </div>
      </div>
    </div>
    <div class="block">
      <b-field label="9. Invertebrados" custom-class="is-small"> </b-field>
      <div class="block" v-for="(group, index) in invertebrates" :key="index">
        <div class="checkboxes-group">
          <label class="checkboxes-group__title">{{ group.name }}</label>
        </div>
        <div
          class="field"
          v-for="(option, indexOpt) in group.options"
          :key="indexOpt"
        >
          <b-checkbox v-model="riverEcosystem" :native-value="option">{{
            option
          }}</b-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserGeolocation } from "@/api/geolocation.js";
export default {
  data() {
    return {
      samplePointCoords: {
        lon: 0,
        lat: 0
      },
      samplePointWidth: 0,
      samplePointDepth: 0,
      samplePointWaterVelocity: 0,
      samplePointWaterTemp: 0,
      samplePointWaterTransparency: [],
      riverEcosystem: [],
      transparencyOptions: [0, 1, 2, 3, 4],

      plantsInsideGroups: [
        {
          name: "Herbáceas con hojas flotantes",
          options: ["Espiga de agua", "Lenteja Flotante", "Milhoja acuática"]
        },
        {
          name: "Herbáceas con tallos emergentes",
          options: ["Berraza", "Berro", "Carrizo"]
        }
      ],
      plantsOutsideGroups: [
        {
          name: "Herbáceas y pequeñas leñosas",
          options: ["Dulcamara", "Epilobio", "Menta"]
        },
        {
          name: "Plantas ruderales",
          options: ["Cinco en rama", "Ortiga", "Pimienta acuática"]
        },
        {
          name: "Helechos",
          options: ["Cola de caballo", "Helecho común", "Lengua de ciervo"]
        }
      ],
      birds: ["Agachadiza común", "Alcotán europeo", "Garza real"],
      riverCrabGroups: [
        {
          name: "Autóctono",
          options: ["Cangrejo de río"]
        },
        {
          name: "Alóctonos",
          options: ["Cangrejo americano", "Cangrejo señal"]
        }
      ],
      amphibians: ["Rana bermeja", "Sapo común", "Tritón alpino"],
      reptiles: ["Culebra de collar", "Culebra viperina", "Otros"],
      fish: [
        {
          name: "Autóctono",
          options: ["Anguila", "Barbo", "Mule"]
        },
        {
          name: "Alóctonos",
          options: ["Perca americana", "Alburno"]
        }
      ],
      mammal: [
        {
          name: "Autóctono",
          options: ["Marta", "Nutria", "Turón"]
        },
        {
          name: "Alóctonos",
          options: ["Visón americano"]
        }
      ],
      invertebrates: [
        {
          name: "No insectos",
          options: ["Gasterópodos", "Crustaceos", "Turbelarios"]
        },
        {
          name: "Insectos con patas",
          options: ["Tricópteros sin estuche", "Odonatos"]
        },
        {
          name: "Insectos sin patas",
          options: ["Dípteros"]
        }
      ]
    };
  },
  computed: {
    flow() {
      return (
        this.samplePointWidth *
        this.samplePointDepth *
        this.samplePointWaterVelocity
      );
    }
  },
  methods: {
    getActualPosition() {
      getUserGeolocation()
        .then(res => {
          this.samplePointCoords.lon = parseFloat(res.coords.longitude).toFixed(
            5
          );
          this.samplePointCoords.lat = parseFloat(res.coords.latitude).toFixed(
            5
          );
        })
        .catch(err => {
          //TODO: notificar?
          console.error(`Error cargando posición. ${err}`);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
</style>

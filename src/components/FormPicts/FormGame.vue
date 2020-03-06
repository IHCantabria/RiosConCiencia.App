<template>
  <div class="form-section">
    <div>
      <div class="block" v-if="isFormPictsValid">
        <b-message
          title="Estado del Río"
          class="results-display"
          :type="values.state != 1 ? 'is-success' : 'is-warning'"
          :closable="false"
        >
          <div class="info-section">
            <div class="info-step">
              <div class="info-step__header">
                <b-field class="info-section__text" :message="stateMessage">
                </b-field>
              </div>
              <div v-if="values.state != 1" class="info-step__body">
                <img :src="$_getImgUrl(formSections.game.id, 0, 1)" />
                <img :src="$_getImgUrl(formSections.game.id, 0, 2)" />
              </div>
              <div v-else class="info-step__body">
                <img :src="$_getImgUrl(formSections.game.id, 0, 3)" />
                <img :src="$_getImgUrl(formSections.game.id, 0, 4)" />
              </div>
            </div>
          </div>
        </b-message>
      </div>
      <div v-if="values.state == 1" class="minigame">
        <div class="img-header">
          <img
            :src="$_getImgUrl(formSections.game.id, 0, 0)"
            class="img-header__pic"
          />
          <b-field
            label="11. ¿Que podemos hacer para que el río este bien?"
            class="img-header__text"
          ></b-field>
          <b-icon
            class="img-header__icon"
            icon="checkbox-marked-circle-outline"
            type="is-info"
          ></b-icon>
        </div>
        <b-field
          message="Marcamos las actividades que podemos realizar para que el río mejore. De esta manera, conseguiremos que el estado del río sea bueno."
        ></b-field>
        <b-field class="img-section">
          <div v-if="isClearAvailable" class="img-container">
            <span class="img-option-text">LIMPIAR LA BASURA DEL RÍO</span>
            <b-checkbox-button
              class="img-option"
              :native-value="false"
              v-model="cleaned"
              ><img
                :class="
                  cleaned == true
                    ? 'img-option__active'
                    : 'img-option__inactive'
                "
                :src="$_getImgUrl(formSections.game.id, 1, 1)"/>
              <div
                :class="[
                  'overlay',
                  cleaned == true ? 'overlay__active' : 'overlay__inactive'
                ]"
              ></div
            ></b-checkbox-button>
          </div>
          <div v-if="isDecontaminateAvailable" class="img-container">
            <span class="img-option-text">NO CONTAMINAR</span>
            <b-checkbox-button
              class="img-option"
              :native-value="false"
              v-model="decontaminated"
              ><img
                :class="
                  decontaminated == true
                    ? 'img-option__active'
                    : 'img-option__inactive'
                "
                :src="$_getImgUrl(formSections.game.id, 2, 1)"/>
              <div
                :class="[
                  'overlay',
                  decontaminated == true
                    ? 'overlay__active'
                    : 'overlay__inactive'
                ]"
              ></div
            ></b-checkbox-button>
          </div>
          <div v-if="isSowAvailable" class="img-container">
            <span class="img-option-text">PLANTAR PLANTAS BUENAS</span>
            <b-checkbox-button
              class="img-option"
              :native-value="false"
              v-model="sowed"
              ><img
                :class="
                  sowed == true ? 'img-option__active' : 'img-option__inactive'
                "
                :src="$_getImgUrl(formSections.game.id, 3, 1)"/>
              <div
                :class="[
                  'overlay',
                  sowed == true ? 'overlay__active' : 'overlay__inactive'
                ]"
              ></div
            ></b-checkbox-button>
          </div>
        </b-field>
      </div>
      <div class="block" v-if="!isComputedOnline">
        <b-message
          v-if="!isFormPictsValid"
          class="results-display"
          title="Estado sin conexión"
          type="is-warning"
          :closable="false"
        >
          Actualmente te encuentras sin conexión a internet, no podras enviar el
          formulario hasta que dispongas de conexión.
        </b-message>
        <b-message
          else
          class="results-display"
          title="Estado sin conexión"
          type="is-warning"
          :closable="false"
        >
          Actualmente te encuentras sin conexión a internet, mantente en esta
          pantalla y espera a tener conexión para enviar el formulario.
        </b-message>
      </div>
    </div>
    <div class="big-button">
      <b-button
        type="is-danger"
        size="is-medium"
        expanded
        :disabled="!isReadySend"
        @click="sendSampleData()"
        >Enviar Resultados</b-button
      >
    </div>
    <spinner :is-loading="isSendingData"></spinner>
  </div>
</template>
<script>
// import { saveSample } from "@/api/riosconciencia.js";
import { mapState, mapGetters, mapActions } from "vuex";
import { pictsHelperMixin } from "@/mixins/picts-helper.js";
export default {
  mixins: [pictsHelperMixin],
  components: {
    spinner: () => import("@/components/Loading")
  },
  data() {
    return {
      stateMessage:
        "El río presenta un buen estado por lo que podemos: pescar peces y comerlos, regar las huertas donde cultivamos frutas y verduras y  jugar y disfrutar en él.",
      cleaned: false,
      sowed: false,
      decontaminated: false,
      isSendingData: false,
      values: {
        state: 0 //states: 0 = Correct, 1 = Incorrect, 2 = Corrected
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      formSections: state => state.formPictsSections
    }),
    ...mapGetters({
      goodPlants: "goodPlants",
      garbageExist: "garbageExist",
      badPlants: "badPlants",
      goodAnimals: "goodAnimals",
      isSmellGood: "isSmellGood",
      isColorGood: "isColorGood",
      isFormPictsValid: "isFormPictsValid"
    }),
    isSectionValid() {
      return true; //optional section
    },
    gameStatus() {
      if (!this.isFormPictsValid) return null;
      return this.calculateStatus();
    },
    isRiverFine() {
      return (
        this.goodPlants.length > 0 &&
        this.badPlants.length == 0 &&
        !this.garbageExist &&
        this.goodAnimals.length > 0 &&
        this.isSmellGood &&
        this.isColorGood
      );
    },
    isRiverSick() {
      return (
        (!this.isClear && this.isClearAvailable) ||
        (!this.isSow && this.isSowAvailable) ||
        (!this.isDecontaminate && this.isDecontaminateAvailable)
      );
    },
    isFormPictsCorrect() {
      return this.values.state == 1 ? false : true;
    },
    isReadySend() {
      return (
        this.isFormPictsValid &&
        this.isComputedOnline &&
        this.isFormPictsCorrect
      );
    },
    isClearAvailable() {
      return this.garbageExist;
    },
    isSowAvailable() {
      return this.goodPlants.length == 0 ? true : false;
    },
    isDecontaminateAvailable() {
      return !this.isSmellGood ||
        !this.isColorGood ||
        this.goodAnimals.length == 0
        ? true
        : false;
    },
    isClear() {
      return this.cleaned;
    },
    isSow() {
      return this.sowed;
    },
    isDecontaminate() {
      return this.decontaminated;
    }
  },
  created() {
    this.imgFolder = require.context("@/assets/images/picts/game");
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    this.updateSpecificPictsSectionValues({
      name: "game",
      values: this.values,
      isValid: this.isSectionValid
    });
  },
  watch: {
    gameStatus: {
      immediate: true,
      handler(newVal) {
        if (newVal != undefined) {
          this.values.state = newVal;
          if (newVal != null) this.setNewMessage(newVal);
        }
      }
    }
  },
  methods: {
    ...mapActions({
      updateSpecificPictsSectionValues: "updateSpecificPictsSectionValues"
    }),
    init() {
      this.cleaned = false;
      this.sowed = false;
      this.decontaminated = false;
    },
    sowPlants() {
      this.sowed = true;
    },
    clearRiver() {
      this.cleaned = true;
    },
    decontaminateRiver() {
      this.decontaminated = true;
    },
    calculateStatus() {
      let state;
      if (this.isRiverFine) {
        state = 0;
      } else if (this.isRiverSick) {
        state = 1;
      } else {
        state = 2;
      }
      return state;
    },
    setNewMessage(newState) {
      if (newState == 0) {
        this.stateMessage =
          "El río presenta un buen estado por lo que podemos: pescar peces y comerlos, regar las huertas donde cultivamos frutas y verduras y  jugar y disfrutar en él.";
      } else if (newState == 1) {
        this.stateMessage =
          "El río presenta un mal estado. Sin embargo queremos que el río esté bien. ¿Qué podemos hacer?";
        // this.stateMessage =
        //   "Marcamos las actividades que podemos realizar para que el río mejore. De esta manera, conseguiremos que el estado del río sea bueno.";
      } else {
        this.stateMessage =
          "Con las actividades que hemos seleccionado para mejorar el río, conseguimos que el río esté bien y podamos: pescar peces y comerlos, regar las huertas donde cultivamos frutas y verduras y  jugar y disfrutar en él.";
      }
    },
    async sendSampleData() {
      const sampleData = this._prepareSampleObj();
      try {
        this.isSendingData = true;
        console.log(sampleData);
        // await saveSample(this.user.token, sampleData);
        const toast = this.$buefy.toast.open({
          message: "¡Enhorabuena! El formulario se ha enviado con éxito",
          type: "is-success",
          duration: 5000
        });
        toast.$on("close", () => {
          this.$root.$emit("clearPicts");
        });
      } catch (err) {
        this.$buefy.toast.open({
          message:
            "Ooops, se ha producido un error intentando enviar el formulario",
          type: "is-danger",
          duration: 4000
        });
      } finally {
        this.isSendingData = false;
      }
    },
    _prepareSampleObj() {
      //TODO hacer el objeto para mandar las respuestas a la base de datos
      return {};
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/form-controls.scss";
.img-option {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  img {
    height: 100%;
    max-width: 300px;
    width: 100%;
  }
}
.img-container {
  max-width: 300px;
}
.img-header {
  &__pic {
    max-width: 120px;
  }
}
</style>

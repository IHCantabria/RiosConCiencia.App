<script setup>
import { saveSamplePict } from "@/api/riosconciencia.js";
import spinner from "@/components/LoadingComponent.vue";
import { onMounted, ref, onBeforeUpdate, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "@/store/appStore.js";
import { ToastProgrammatic as Toast } from "@fantage9/buefy-vue3";
import titleGame from "@/assets/images/picts/game/titleGame.jpg";
import goodGame1 from "@/assets/images/picts/game/goodGame1.jpg";
import goodGame2 from "@/assets/images/picts/game/goodGame2.jpg";
import badGame1 from "@/assets/images/picts/game/badGame1.jpg";
import badGame2 from "@/assets/images/picts/game/badGame2.jpg";
import clearGame from "@/assets/images/picts/game/clearGame.jpg";
import decontaminateGame from "@/assets/images/picts/game/decontaminateGame.jpg";
import sowGame from "@/assets/images/picts/game/sowGame.jpg";

// STORES & COMPOSABLES
const router = useRouter();
const appStore = useAppStore();

// DATA
const stateMessage = ref(
  "El río presenta un buen estado por lo que podemos: pescar peces y comerlos, regar las huertas donde cultivamos frutas y verduras y  jugar y disfrutar en él.",
);
const cleaned = ref(false);
const sowed = ref(false);
const decontaminated = ref(false);
const isSendingData = ref(false);
const isSendActive = ref(false);
const values = ref({
  gameState: null, //states: 1 = Bueno, 2 = Malo, 3 = Corregido
});

// COMPUTED
const isSectionValid = computed(() => {
  return true; //optional section
});
const isFormGood = computed(() => {
  return values.value.gameState != 2 ? true : false;
});
const gameStatus = computed(() => {
  if (!appStore.isFormPictsValid) return null;
  return calculateStatus();
});
const isRiverFine = computed(() => {
  return (
    !appStore.goodPlantsAbsence &&
    appStore.badPlants.length == 0 &&
    (appStore.garbageAbsence || !appStore.garbageExist) &&
    !appStore.goodAnimalsAbsence &&
    appStore.isSmellGood &&
    appStore.isColorGood
  );
});
const isRiverSick = computed(() => {
  return (
    (!isClear.value && isClearAvailable.value) ||
    (!isSow.value && isSowAvailable.value) ||
    (!isDecontaminate.value && isDecontaminateAvailable.value)
  );
});
const isFormPictsCorrect = computed(() => {
  return values.value.gameState ==
    appStore.formPictsSections.game.data.gameStateOptions.find(
      (state) => state.value == 2,
    )
    ? false
    : true;
});
const isReadySend = computed(() => {
  return (
    appStore.isFormPictsValid && appStore.isOnline && isFormPictsCorrect.value
  );
});
const isClearAvailable = computed(() => {
  return !appStore.garbageAbsence && appStore.garbageExist ? true : false;
});
const isSowAvailable = computed(() => {
  return appStore.goodPlantsAbsence || appStore.badPlants.length > 0
    ? true
    : false;
});
const isDecontaminateAvailable = computed(() => {
  return !appStore.isSmellGood ||
    !appStore.isColorGood ||
    appStore.goodAnimalsAbsence
    ? true
    : false;
});
const isClear = computed(() => {
  return cleaned.value;
});
const isSow = computed(() => {
  return sowed.value;
});
const isDecontaminate = computed(() => {
  return decontaminated.value;
});

// LYFECYCLE
onMounted(() => {
  init();
});
onBeforeUpdate(() => {
  appStore.updateSpecificPictsSectionValues({
    name: "game",
    values: values.value,
    isValid: isSectionValid.value,
  });
});

// METHODS

const init = () => {
  cleaned.value = false;
  sowed.value = false;
  decontaminated.value = false;
};
const calculateStatus = () => {
  let gameState;
  if (isRiverFine.value) {
    gameState = appStore.formPictsSections.game.data.gameStateOptions.find(
      (state) => state.value == 1,
    );
  } else if (isRiverSick.value) {
    gameState = appStore.formPictsSections.game.data.gameStateOptions.find(
      (state) => state.value == 2,
    );
  } else {
    gameState = appStore.formPictsSections.game.data.gameStateOptions.find(
      (state) => state.value == 3,
    );
  }
  return gameState;
};
const setNewMessage = (newState) => {
  if (newState == 1) {
    stateMessage.value =
      "El río presenta un buen estado por lo que podemos: pescar peces y comerlos, regar las huertas donde cultivamos frutas y verduras y  jugar y disfrutar en él.";
  } else if (newState == 2) {
    stateMessage.value =
      "El río presenta un mal estado. Sin embargo queremos que el río esté bien. ¿Qué podemos hacer?";
  } else {
    stateMessage.value =
      "Con las actividades que hemos seleccionado para mejorar el río, conseguimos que el río esté bien y podamos: pescar peces y comerlos, regar las huertas donde cultivamos frutas y verduras y  jugar y disfrutar en él.";
  }
};
const sendSampleData = async () => {
  isSendActive.value = true;
  const sampleData = _prepareSampleObj();
  try {
    isSendingData.value = true;
    await saveSamplePict(appStore.user.token, sampleData);
    Toast.open({
      message: "¡Enhorabuena! El formulario se ha enviado con éxito",
      type: "is-success",
      duration: 6000,
    });
    setTimeout(() => {
      appStore.clearPictsFormResponses();
      isSendActive.value = false;
      appStore.pictsFormSent = true;
      router.push("/");
    }, 6000);
  } catch (err) {
    Toast.open({
      message:
        "Ooops, se ha producido un error intentando enviar el formulario",
      type: "is-danger",
      duration: 6000,
    });
    setTimeout(() => {
      isSendActive.value = false;
    }, 6000);
  } finally {
    isSendingData.value = false;
  }
};
const _prepareSampleObj = () => {
  let formResults = {};
  for (const section of Object.keys(appStore.formPictsSections)) {
    formResults = {
      ...formResults,
      ...appStore.formPictsSections[section].results,
      user: appStore.user,
    };
  }
  return formResults;
};

// WATCHERS

watch(
  () => gameStatus.value,
  (newVal, oldVal) => {
    if (newVal != undefined) {
      values.value.gameState = JSON.parse(JSON.stringify(newVal.value));
      console.log("watch game status: ", newVal);
      if (newVal != null && newVal != oldVal) {
        setNewMessage(newVal.value);
        if (appStore.activeSectionName == "game") window.scrollTo(0, 0);
      }
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="form-section">
    <div>
      <div v-if="appStore.isFormPictsValid" class="block">
        <b-message
          title="Estado del Río"
          class="results-display"
          :type="isFormGood ? 'is-success' : 'is-warning'"
          :closable="false"
        >
          <div class="info-section">
            <div class="info-step">
              <div class="info-step__header">
                <b-field class="info-section__text" :message="stateMessage">
                </b-field>
              </div>
              <div v-if="isFormGood" class="info-step__body">
                <img :src="goodGame1" alt="goodGame1" />
                <img :src="goodGame2" alt="goodGame2" />
              </div>
              <div v-else class="info-step__body">
                <img :src="badGame1" alt="badGame1" />
                <img :src="badGame2" alt="badGame2" />
              </div>
            </div>
          </div>
        </b-message>
      </div>
      <div v-if="!isFormGood" class="minigame">
        <div class="img-header">
          <img :src="titleGame" alt="titleGame" class="img-header__pic" />
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
              v-model="cleaned"
              class="img-option"
              :native-value="false"
              ><img
                :class="
                  cleaned == true
                    ? 'img-option__active'
                    : 'img-option__inactive'
                "
                :src="clearGame"
                alt="clearGame" />
              <div
                :class="[
                  'overlay',
                  cleaned == true ? 'overlay__active' : 'overlay__inactive',
                ]"
              ></div
            ></b-checkbox-button>
          </div>
          <div v-if="isDecontaminateAvailable" class="img-container">
            <span class="img-option-text">NO CONTAMINAR</span>
            <b-checkbox-button
              v-model="decontaminated"
              class="img-option"
              :native-value="false"
              ><img
                :class="
                  decontaminated == true
                    ? 'img-option__active'
                    : 'img-option__inactive'
                "
                :src="decontaminateGame"
                alt="decontaminateGame" />
              <div
                :class="[
                  'overlay',
                  decontaminated == true
                    ? 'overlay__active'
                    : 'overlay__inactive',
                ]"
              ></div
            ></b-checkbox-button>
          </div>
          <div v-if="isSowAvailable" class="img-container">
            <span class="img-option-text">PLANTAR PLANTAS BUENAS</span>
            <b-checkbox-button
              v-model="sowed"
              class="img-option"
              :native-value="false"
              ><img
                :class="
                  sowed == true ? 'img-option__active' : 'img-option__inactive'
                "
                :src="sowGame"
                alt="sowGame" />
              <div
                :class="[
                  'overlay',
                  sowed == true ? 'overlay__active' : 'overlay__inactive',
                ]"
              ></div
            ></b-checkbox-button>
          </div>
        </b-field>
      </div>
      <div v-if="!appStore.isOnline" class="block">
        <b-message
          v-if="!appStore.isFormPictsValid"
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
    <div v-show="isReadySend" class="big-button">
      <b-button
        type="is-danger"
        size="is-medium"
        expanded
        :disabled="isSendActive"
        @click="sendSampleData()"
        >Enviar Resultados</b-button
      >
    </div>
    <spinner :is-loading="isSendingData"></spinner>
  </div>
</template>

<style lang="scss" scoped>
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
  margin-left: auto;
  margin-right: auto;
  max-width: 300px;
}

.img-header {
  &__pic {
    max-width: 200px;
  }
}
</style>

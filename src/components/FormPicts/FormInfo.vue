<script setup>
import { ref, computed, onMounted, onBeforeUpdate } from "vue";
import { useAppStore } from "@/store/appStore.js";
import { usePictsHelper } from "@/composables/usePictsHelper.js";
import { downloadPDF } from "@/utils/download-pdf";
import helpInfo1 from "@/assets/images/picts/info/helpInfo1.jpg";
import helpInfo2 from "@/assets/images/picts/info/helpInfo2.jpg";
import helpInfo4 from "@/assets/images/picts/info/helpInfo4.jpg";
import helpInfo6 from "@/assets/images/picts/info/helpInfo6.jpg";
import helpInfo7 from "@/assets/images/picts/info/helpInfo7.jpg";
import ProyectoRiosPDF from "@/assets/pdfs/0_1_Proyecto_Rios.pdf";
import ElRioPDF from "@/assets/pdfs/0_2_El rio.pdf";
import ElRioEstaBienPDF from "@/assets/pdfs/0_3_Rio_bien.pdf";
import ElRioEstaMalPDF from "@/assets/pdfs/0_4_Rio_mal.pdf";
import ComenzamosPDF from "@/assets/pdfs/0_5_Comenzamos.pdf";

// STORES & COMPOSABLES
const appStore = useAppStore();
const { isHelpActive, toggleHelp } = usePictsHelper();

// DATA
const helpRiverActive = ref(false);
const helpRiverGoodActive = ref(false);
const helpRiverBadActive = ref(false);
const helpRiverBeginActive = ref(false);
const values = ref({});

// COMPUTED
const isSectionValid = computed(() => {
  return true; //optional section
});
const isHelpRiverActive = computed(() => {
  return helpRiverActive.value;
});
const isHelpRiverGoodActive = computed(() => {
  return helpRiverGoodActive.value;
});
const isHelpRiverBadActive = computed(() => {
  return helpRiverBadActive.value;
});
const isHelpRiverBeginActive = computed(() => {
  return helpRiverBeginActive.value;
});

// LYFECYCLE
onMounted(() => {
  init();
});

onBeforeUpdate(() => {
  if (appStore.pictsFormSent) return;
  appStore.updateSpecificPictsSectionValues({
    name: "info",
    values: values.value,
    isValid: isSectionValid.value,
  });
});

// METHODS
const init = () => {
  appStore.updateSpecificPictsSectionValues({
    name: "info",
    values: values.value,
    isValid: isSectionValid.value,
  });
};
const toggleHelpRiver = () => {
  helpRiverActive.value = !helpRiverActive.value;
};
const toggleHelpRiverGood = () => {
  helpRiverGoodActive.value = !helpRiverGoodActive.value;
};
const toggleHelpRiverBad = () => {
  helpRiverBadActive.value = !helpRiverBadActive.value;
};
const toggleHelpRiverBegin = () => {
  helpRiverBeginActive.value = !helpRiverBeginActive.value;
};
</script>

<template>
  <div class="form-section form-section-picts">
    <div class="header-section">
      <h5 class="title is-5 header-section__text">
        <span>PROYECTO RÍOS</span>
      </h5>
      <div class="header-section__help">
        <div @click="toggleHelp()">
          <b-icon
            icon="information-outline"
            class="header-section__help-item"
            type="is-info"
          ></b-icon>
        </div>
        <a @click="downloadPDF(ProyectoRiosPDF, '0_1_Proyecto_Rios')"
          ><b-icon
            icon="book-information-variant"
            class="header-section__help-item"
            type="is-primary"
          ></b-icon
        ></a>
      </div>
    </div>
    <div class="info-section">
      <div class="info-step">
        <div class="info-step__header">
          <b-field
            v-show="isHelpActive"
            class="info-section__text"
            message="El Proyecto Ríos trata de averiguar el estado de los ríos. Para ello, realizaremos unas actividades en el río para conocer su estado."
          >
          </b-field>
        </div>
        <div class="info-step__body">
          <img :src="helpInfo1" alt="helpInfo1" />
        </div>
      </div>
      <div class="info-step">
        <div class="info-step__header">
          <b-field class="info-section__text" label="EL RÍO"> </b-field>
          <div class="header-section__help">
            <div @click="toggleHelpRiver()">
              <b-icon
                icon="information-outline"
                class="header-section__help-item"
                type="is-info"
              ></b-icon>
            </div>
            <a @click="downloadPDF(ElRioPDF, '0_2_El Rio')"
              ><b-icon
                icon="book-information-variant"
                class="header-section__help-item"
                type="is-primary"
              ></b-icon
            ></a>
          </div>
        </div>
        <b-field
          v-show="isHelpRiverActive"
          message="El río sirve para, por ejemplo: pescar peces y comerlos, regar las huertas donde cultivamos frutas y verduras y jugar y disfrutar en él."
        ></b-field>
        <div class="info-step__body">
          <img :src="helpInfo2" alt="helpInfo2" />
        </div>
      </div>
      <div class="info-step">
        <div class="info-step__header">
          <b-field
            class="info-section__text"
            label="EL RÍO ESTÁ BIEN CUANDO..."
          >
          </b-field>
          <div class="header-section__help">
            <div @click="toggleHelpRiverGood()">
              <b-icon
                icon="information-outline"
                class="header-section__help-item"
                type="is-info"
              ></b-icon>
            </div>
            <a @click="downloadPDF(ElRioEstaBienPDF, '0_3_Rio_bien')"
              ><b-icon
                icon="book-information-variant"
                class="header-section__help-item"
                type="is-primary"
              ></b-icon
            ></a>
          </div>
        </div>
        <b-field
          v-show="isHelpRiverGoodActive"
          message="Se puede considerar que el río está bien cuando: 1) el agua está limpia; 2) no encontramos basura en las márgenes y; 3) existen invertebrados que indican que la calidad del agua es buena."
        ></b-field>
        <div class="info-step__body">
          <img :src="helpInfo4" alt="helpInfo4" />
        </div>
      </div>
      <div class="info-step">
        <div class="info-step__header">
          <b-field class="info-section__text" label="EL RÍO ESTÁ MAL CUANDO...">
          </b-field>
          <div class="header-section__help">
            <div @click="toggleHelpRiverBad()">
              <b-icon
                icon="information-outline"
                class="header-section__help-item"
                type="is-info"
              ></b-icon>
            </div>
            <a @click="downloadPDF(ElRioEstaMalPDF, '0_4_Rio_mal')"
              ><b-icon
                icon="book-information-variant"
                class="header-section__help-item"
                type="is-primary"
              ></b-icon
            ></a>
          </div>
        </div>
        <b-field
          v-show="isHelpRiverBadActive"
          message="Se puede considerar que el río está mal cuando: 1) el agua está sucia; 2) encontramos basura en las márgenes y; 3) no hay invertebrados que indican que la calidad del agua es buena, viviendo en su lugar otro tipo de invertebrados menos exigentes."
        ></b-field>
        <div class="info-step__body">
          <img :src="helpInfo6" alt="helpInfo6" />
        </div>
      </div>
      <div class="info-step">
        <div class="info-step__header">
          <b-field class="info-section__text" label="COMENZAMOS..."> </b-field>
          <div class="header-section__help">
            <div @click="toggleHelpRiverBegin()">
              <b-icon
                icon="information-outline"
                class="header-section__help-item"
                type="is-info"
              ></b-icon>
            </div>
            <a @click="downloadPDF(ComenzamosPDF, '0_5_Comenzamos')"
              ><b-icon
                icon="book-information-variant"
                class="header-section__help-item"
                type="is-primary"
              ></b-icon
            ></a>
          </div>
        </div>
        <b-field
          v-show="isHelpRiverBeginActive"
          message="Comenzamos a realizar unas actividades para conocer el estado del río."
        ></b-field>
        <div class="info-step__body">
          <img :src="helpInfo7" alt="helpInfo7" />
        </div>
      </div>
    </div>
  </div>
</template>

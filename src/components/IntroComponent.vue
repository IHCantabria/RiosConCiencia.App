<script setup>
import { useRouter } from "vue-router";
import { useAppStore } from "@/store/appStore.js";
import { downloadPDF } from "@/utils/download-pdf";
import ManualPDF from "@/assets/pdfs/manual2019.pdf";

const router = useRouter();
const appStore = useAppStore();

const expertUser = () => {
  router.push({ name: "formexpert" });
};
const challengeUser = () => {
  router.push({ name: "formpicts" });
};
</script>

<template>
  <div class="intro">
    <div class="intro__title-logo">
      <img
        src="@/assets/logos/RiosConCiencia.png"
        title="Ríos Con Ciencia"
        alt="Ríos con ciencia img"
      />
    </div>
    <div class="intro__main">
      <div v-if="appStore.userCanDoExpertForm" class="option">
        <h2 class="subtitle">Entrar</h2>
        <b-button
          v-tooltip="
            appStore.userRiverSections.length == 0
              ? 'No tienes tramos expert asignados'
              : ''
          "
          :disabled="appStore.userRiverSections.length == 0"
          size="is-large"
          type="is-primary"
          @click="expertUser()"
        >
          Empezar
        </b-button>
      </div>
      <div v-if="appStore.userCanDoPictsForm" class="option">
        <h2 class="subtitle">Entrar con Pictos</h2>
        <b-button
          v-tooltip="
            appStore.userRiverSectionsPicts.length == 0
              ? 'No tienes tramos pictos asignados'
              : ''
          "
          :disabled="appStore.userRiverSectionsPicts.length == 0"
          size="is-large"
          type="is-primary"
          @click="challengeUser()"
        >
          Empezar
        </b-button>
      </div>
    </div>
    <div class="intro__help">
      <div class="guide-link">
        <a @click="downloadPDF(ManualPDF, 'manual')">
          <b-icon
            class="guide-link__icon"
            icon="cloud-download"
            type="is-info"
          ></b-icon>
          <span>Manual de Inspección</span></a
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a,
a:link,
a:visited,
a:focus,
a:hover,
a:active {
  color: app-variables.$color-primary;
  text-decoration: none;
  cursor: pointer;
}

.intro {
  display: flex;
  flex-grow: 1;
  flex-direction: column;

  &__main {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin: 1rem;
    align-items: center;
  }

  &__title-logo {
    margin: 1.5rem;
    align-items: center;

    & img {
      max-height: 10vh;
    }
  }

  &__help {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin: 1rem;
    align-items: flex-end;
    align-content: flex-end;
  }
}

.guide-link {
  &__icon {
    padding-right: 1rem;
  }
}

.option {
  padding: 1rem;
}

.nodata {
  padding: 5rem;
  height: 100%;
  font-size: 1.2rem;
}
</style>

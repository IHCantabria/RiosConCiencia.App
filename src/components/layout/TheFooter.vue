<script setup>
import { computed } from "vue";
import FormStepsNavigation from "@/components/FormStepsNavigation.vue";
import { useRouter } from "vue-router";
import { useAppStore } from "@/store/appStore.js";

const router = useRouter();
const appStore = useAppStore();

const isFormPage = computed(() => {
  return (
    router.currentRoute.value.path === "/formexpert" ||
    router.currentRoute.value.path === "/formpicts"
  );
});
</script>

<template>
  <div class="footer-container">
    <div v-show="!isFormPage" class="footer-container__logos">
      <div class="logo">
        <div class="claim-container">
          <span>Con la colaboración de:</span>
        </div>
        <img
          src="@/assets/logos/LogoMinisterio-FECYT.png"
          title="Gobierno de España y Fundación Española para la Ciencia y la Tecnología"
          alt="Logo Ministerio de Ciencia e Innovación y FECYT"
        />
      </div>
      <div class="logo">
        <div class="claim-container">
          <span>Un proyecto de:</span>
        </div>
        <img
          src="@/assets/logos/RedCambera.png"
          title="Red Cambera"
          alt="Logo Red Cambera"
        />
      </div>
      <div class="logo-without-claim">
        <img
          src="@/assets/logos/ProyectoRios.png"
          title="Proyecto Ríos"
          alt="Logo Proyecto Ríos"
        />
        />
      </div>
    </div>
    <div v-show="isFormPage" class="footer-container__form-nav">
      <FormStepsNavigation
        v-if="appStore.isExpertDataLoaded || appStore.isPictsDataLoaded"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-container {
  flex-grow: 1;
  background-color: #fafafa;

  &__logos {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    height: 100%;
  }

  &__form-nav {
    margin: 1rem;
  }
}

.logo {
  padding: 0.5rem 1rem;
  max-height: 10vh;

  & img {
    max-height: 6vh;
    height: 100%;
  }
}

.logo-without-claim {
  padding: 0.5rem 1rem;
  max-height: 10vh;

  & img {
    max-height: 8vh;
    height: 100%;
  }
}

.claim-container {
  display: flex;
  text-align: left;
  font-style: italic;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
  font-size: 0.7rem;
}
</style>

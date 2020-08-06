<template>
  <div class="footer-container">
    <div class="footer-container__logos" v-show="!isFormPage">
      <div class="logo">
        <div class="claim-container">
          <span>Con la colaboración de:</span>
        </div>
        <img
          src="@/assets/logos/LogoMinisterio-FECYT.png"
          title="Gobierno de España y Fundación Española para la Ciencia y la Tecnología"
        />
      </div>
      <div class="logo">
        <div class="claim-container">
          <span>Un proyecto de:</span>
        </div>
        <img src="@/assets/logos/RedCambera.png" title="Red Cambera" />
      </div>
      <div class="logo-without-claim">
        <img src="@/assets/logos/ProyectoRios.png" title="Proyecto Ríos" />
      </div>
    </div>
    <div class="footer-container__form-nav" v-show="isFormPage">
      <form-fields-nav></form-fields-nav>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    "form-fields-nav": () => import("@/components/FormStepsNavigation")
  },
  computed: {
    isFormPage() {
      return (
        this.$route.path === "/formexpert" || this.$route.path === "/formpicts"
      );
    }
  },
  data() {
    return {};
  }
};
</script>
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
  padding: 0.5rem 1rem 0.5rem 1rem;
  max-height: 10vh;
  & img {
    max-height: 6vh;
    height: 100%;
  }
}
.logo-without-claim {
  padding: 0.5rem 1rem 0.5rem 1rem;
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

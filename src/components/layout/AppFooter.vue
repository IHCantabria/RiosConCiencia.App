<template>
  <div class="footer-container">
    <div class="footer-container__logos" v-show="!isFormPage">
      <img
        src="@/assets/logos/LogoMinisterio-FECYT.png"
        title="Gobierno de España y Fundación Española para la Ciencia y la Tecnología"
      />
      <img src="@/assets/logos/RedCambera.png" title="Red Cambera" />
      <img src="@/assets/logos/ProyectoRios.png" title="Proyecto Ríos" />
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
    height: 100%;
    & img {
      max-height: 10vh;
      padding: 0.5rem 1rem;
    }
  }
  &__form-nav {
    margin: 1rem;
  }
}
</style>

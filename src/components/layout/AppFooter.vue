<template>
  <div class="footer-container">
    <div class="footer-container__logos" v-show="!isFormPage">
      <img
        src="@/assets/logos/LogoMinisterio-FECYT.jpg"
        title="Gobierno de España y Fundación Española para la Ciencia y la Tecnología"
      />
      <img src="@/assets/logos/RedCambera.jpg" title="Red Cambera" />
      <img src="@/assets/logos/ProyectoRios.jpg" title="Proyecto Ríos" />
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
        this.$route.path === "/formfields" || this.$route.path === "/formpictos"
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
    & img {
      max-height: 10vh;
      padding: 1rem;
    }
  }
  &__form-nav {
    margin: 1rem;
  }
}
</style>

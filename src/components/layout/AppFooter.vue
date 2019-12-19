<template>
  <div>
    <div class="footer__logos" v-show="!isFormPage">
      <img
        src="@/assets/logos/LogoMinisterio-FECYT.jpg"
        title="Gobierno de España y Fundación Española para la Ciencia y la Tecnología"
      />
      <img src="@/assets/logos/RedCambera.jpg" title="Red Cambera" />
      <img src="@/assets/logos/ProyectoRios.jpg" title="Proyecto Ríos" />
    </div>
    <div class="footer__form-nav" v-show="isFormPage">
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
.footer__logos {
  & img {
    max-height: 10vh;
    padding: 1rem;
  }
}

.footer__form-nav {
  margin: 1rem;
}
</style>

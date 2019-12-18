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
    <div v-show="isFormPage">
      <form-navigation></form-navigation>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    "form-navigation": () => import("@/components/FormNavigation")
  },
  computed: {
    isFormPage() {
      return this.$route.path === "/form";
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.footer__logos {
  padding: 1rem;
  background-color: #ffffff;
  & img {
    max-height: 10vh;
    padding: 1rem;
  }
}
</style>

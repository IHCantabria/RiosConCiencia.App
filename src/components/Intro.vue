<template>
  <div class="intro">
    <div class="intro__title-logo">
      <img src="@/assets/logos/riosconciencia.png" title="Ríos Con Ciencia" />
    </div>
    <div class="intro__main">
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <h2 class="subtitle">Usuario Experto</h2>
            <b-button size="is-large" type="is-primary">Empezar</b-button>

            <h2 class="subtitle">Usuario con Desafíos</h2>
            <b-button size="is-large" type="is-primary">Empezar</b-button>
          </div>
        </div>
      </section>
    </div>
    <div class="intro__footer-logos">
      <img
        src="@/assets/logos/LogoMinisterio-FECYT.jpg"
        title="Gobierno de España y Fundación Española para la Ciencia y la Tecnología"
      />
      <img src="@/assets/logos/RedCambera.jpg" title="Red Cambera" />
      <img src="@/assets/logos/ProyectoRios.jpg" title="Proyecto Ríos" />
      <img src="@/assets/logos/ProyectoRios.jpg" title="Proyecto Ríos" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Intro"
};
</script>
<style lang="scss" scoped>
.intro {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  &__main {
    display: flex;
    flex-grow: 1;
    height: 50%;
  }
  &__title-logo {
    padding: 1rem;
    & img {
      max-height: 10vh;
    }
  }
  &__footer-logos {
    padding: 1rem;
    & img {
      max-height: 10vh;
      padding: 1rem;
    }
  }
}
</style>

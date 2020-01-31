<template>
  <div class="section">
    <div class="form-section">
      <div class="about-msg">
        <p class="about-msg__section">
          RiosConCiencia tiene como objetivo principal el diseño, arquitectura,
          validación e implementación de un sistema inclusivo para la ciencia
          ciudadana fluvial en el marco del Proyecto Ríos.
        </p>
        <p class="about-msg__section">
          Este proyecto cuenta con la colaboración de la Fundación Española para
          la Ciencia y la Tecnología del Ministerio de Ciencia e Innovación.
        </p>
        <p class="about-msg__section">
          Proyecto Ríos es una iniciativa de voluntariado ambiental que se
          desarrolla en Cantabria desde el año 2008, capacitando a la ciudadanía
          en el conocimiento, puesta en valor y mejora de los ecosistemas
          fluviales.
        </p>
        <p class="about-msg__section">
          <a
            href="https://redcambera.org/proyectos/riosconciencia/"
            target="_blank"
            >Pulse para más información</a
          >
        </p>
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
  color: $color-primary;
  text-decoration: none;
  cursor: pointer;
}

.about-msg {
  &__section {
    padding: 1rem;
  }
}
</style>

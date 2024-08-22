<script setup></script>

<template>
  <div class="about">
    <div class="about__title-logo">
      <img src="@/assets/logos/RiosConCiencia.png" title="Ríos Con Ciencia" />
    </div>
    <div class="about__msg">
      <p class="about__msg-section">
        RíosConCienciApp es una herramienta digital que facilita la toma de
        datos en el río a las personas voluntarias en el marco del Proyecto
        Ríos. Además, está diseñada para que, por medio de pictogramas, personas
        con desafíos en su desarrollo puedan disfrutar también del río y su
        entorno.
      </p>
      <p class="about__msg-section">
        Proyecto Ríos es una iniciativa de voluntariado ambiental que se
        desarrolla en Cantabria desde el año 2008, capacitando a la ciudadanía
        en el conocimiento, puesta en valor y mejora de los ecosistemas
        fluviales.
      </p>
      <p class="about__msg-section">
        Este proyecto cuenta con la colaboración de la Fundación Española para
        la Ciencia y la Tecnología del Ministerio de Ciencia, Innovación y
        Universidades.
      </p>
      <p class="about__msg-section">
        <a
          href="https://redcambera.org/proyectorios/?ModPagespeed=off#contenidos"
          target="_blank"
          >Pulse para más información</a
        >
      </p>
      <p class="about__msg-section">
        Se puede acceder a los resultados de este proyecto en el siguiente
        enlace.
      </p>
      <p class="about__msg-section">
        <a href="https://riosconcienciavisor.ihcantabria.com/" target="_blank"
          >Pulse para ir al geovisor de los datos del proyecto</a
        >
      </p>
      <p class="about__msg-section disclaim">
        Pictogramas ARASAAC: Todos los pictogramas usados en esta aplicación,
        exceptuando aquellos que se han creado por los autores de esta
        aplicación, forman parte de la colección ARASAAC, son propiedad del
        Gobierno de Aragón y han sido creados por Sergio Palao, se publican bajo
        licencia Creative Commons ( BY- NC- SA), autorizándose su uso para fines
        sin ánimo lucrativo siempre que se cite la fuente, autor y se comparta
        bajo la misma licencia.
      </p>
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

.about {
  display: flex;
  flex-grow: 1;
  flex-direction: column;

  &__title-logo {
    margin: 1.5rem;
    align-items: center;

    & img {
      max-height: 10vh;
    }
  }

  &__msg-section {
    text-align: left;
    padding: 1rem;
  }
}

.disclaim {
  font-size: 0.6rem;
}
</style>

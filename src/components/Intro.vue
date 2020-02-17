<template>
  <div class="intro">
    <div class="intro__title-logo">
      <img src="@/assets/logos/RiosConCiencia.png" title="Ríos Con Ciencia" />
    </div>
    <div class="intro__main">
      <div class="option">
        <a :href="pdfLink" target="_blank"
          ><b-icon icon="file-pdf" size="is-large" type="is-primary"></b-icon
        ></a>
      </div>
      <div class="option">
        <h2 class="subtitle">Usuario Experto</h2>
        <b-button size="is-large" type="is-primary" @click="expertUser()"
          >Empezar</b-button
        >
      </div>
      <div class="option">
        <h2 class="subtitle">Usuario con Desafíos</h2>
        <b-button size="is-large" type="is-primary" @click="challengeUser()"
          >Empezar</b-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Intro",
  data() {
    return {
      pdfLink: require("../assets/pdfs/manual2019.pdf")
    };
  },

  methods: {
    expertUser() {
      this.$router.push("formfields");
    },
    challengeUser() {
      this.$router.push("formpictos");
    }
  }
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
    flex-direction: column;
    margin: 1rem;
  }
  &__title-logo {
    margin: 1.5rem;
    & img {
      max-height: 10vh;
    }
  }
}

.option {
  padding: 1rem;
}
</style>

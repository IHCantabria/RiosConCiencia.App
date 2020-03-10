<template>
  <div class="intro">
    <div class="intro__title-logo">
      <img src="@/assets/logos/RiosConCiencia.png" title="Ríos Con Ciencia" />
    </div>
    <div class="intro__main">
      <div v-if="userCanDoExpertForm" class="option">
        <h2 class="subtitle">Entrar</h2>
        <b-button size="is-large" type="is-primary" @click="expertUser()"
          >Empezar</b-button
        >
      </div>
      <div v-if="userCanDoPictsForm" class="option">
        <h2 class="subtitle">Entrar con Pictos</h2>
        <b-button size="is-large" type="is-primary" @click="challengeUser()"
          >Empezar</b-button
        >
      </div>
    </div>
    <div class="intro__help">
      <div class="guide-link">
        <a :href="pdfLink" target="_blank">
          <b-icon
            class="guide-link__icon"
            icon="cloud-download"
            type="is-info"
          ></b-icon>
          <span>Manual de Inspección</span></a
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Intro",
  data() {
    return {
      pdfLink: null
    };
  },
  computed: {
    ...mapGetters({
      userCanDoExpertForm: "userCanDoExpertForm",
      userCanDoPictsForm: "userCanDoPictsForm"
    })
  },
  created() {
    this.pdfLink = require("../assets/pdfs/manual2019.pdf");
  },
  methods: {
    expertUser() {
      this.$router.push("formexpert");
    },
    challengeUser() {
      this.$router.push("formpicts");
    }
  }
};
</script>
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
.intro {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  &__main {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin: 1rem;
    align-items: center;
  }
  &__title-logo {
    margin: 1.5rem;
    align-items: center;
    & img {
      max-height: 10vh;
    }
  }
  &__help {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    margin: 1rem;
    align-items: flex-end;
    align-content: flex-end;
  }
}

.guide-link {
  &__icon {
    padding-right: 1rem;
  }
}

.option {
  padding: 1rem;
}
</style>

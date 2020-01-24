<template>
  <div class="intro">
    <div class="intro__title-logo">
      <img src="@/assets/logos/RiosConCiencia.png" title="Ríos Con Ciencia" />
    </div>
    <div class="intro__main">
      <div class="option">
        <h2 class="subtitle">Usuario Experto</h2>
        <b-button size="is-large" type="is-primary" @click="loginExpertUser()"
          >Empezar</b-button
        >
      </div>
      <div class="option">
        <h2 class="subtitle">Usuario con Desafíos</h2>
        <b-button
          size="is-large"
          type="is-primary"
          @click="loginChallengeUser()"
          >Empezar</b-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/riosconciencia.js";
import { mapActions } from "vuex";

export default {
  name: "Intro",
  methods: {
    ...mapActions({
      setActiveUser: "setActiveUser"
    }),
    async loginExpertUser() {
      try {
        const authenticatedUser = await login();
        if (authenticatedUser) {
          this.setActiveUser(authenticatedUser);
          this.$router.push("formfields");
        } else {
          //TODO: mensaje
          console.error("Error intentando autenticar");
        }
      } catch (err) {
        //TODO: notificar
        console.error("Error intentando autenticar");
      }
    },
    loginChallengeUser() {
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

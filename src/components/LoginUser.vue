<template>
  <div class="login">
    <div class="login__title-logo">
      <img src="@/assets/logos/RiosConCiencia.png" title="Ríos Con Ciencia" />
    </div>
    <div class="login__main">
      <b-field label="Email">
        <b-input type="email" v-model="userEmail"> </b-input>
      </b-field>
      <b-field label="Password" password-reveal>
        <b-input v-model="userPassword" type="password"></b-input>
      </b-field>
      <b-button size="is-large" type="is-primary" @click="loginUser()"
        >Inicio de sesión</b-button
      >
    </div>
  </div>
</template>
<script>
import { login } from "@/api/riosconciencia.js";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      userEmail: "",
      userPassword: ""
    };
  },
  methods: {
    ...mapActions({
      setActiveUser: "setActiveUser"
    }),
    async loginUser() {
      try {
        const authenticatedUser = await login(
          this.userEmail,
          this.userPassword
        );
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
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
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

<template>
  <div class="login">
    <div class="login__title-logo">
      <img src="@/assets/logos/RiosConCiencia.png" title="Ríos Con Ciencia" />
    </div>
    <div class="login__main">
      <b-field label="Email">
        <b-input
          placeholder="Email"
          type="email"
          v-model="userEmail"
          icon="email"
          >>
        </b-input>
      </b-field>
      <b-field label="Contraseña">
        <b-input
          placeholder="Contraseña"
          v-model="userPassword"
          type="password"
          icon="lock"
          password-reveal
        ></b-input>
      </b-field>
      <b-button size="is-large" type="is-primary" @click="loginUser()"
        >Inicio de sesión</b-button
      >
      <spinner :is-loading="isLoading"></spinner>
    </div>
  </div>
</template>
<script>
import { login } from "@/api/riosconciencia.js";
import { mapActions } from "vuex";

export default {
  components: {
    spinner: () => import("@/components/Loading")
  },
  data() {
    return {
      userEmail: "",
      userPassword: "",
      isLoading: false
    };
  },
  methods: {
    ...mapActions({
      setActiveUser: "setActiveUser"
    }),
    async loginUser() {
      try {
        this.isLoading = true;
        const authenticatedUser = await login(
          this.userEmail,
          this.userPassword
        );
        if (authenticatedUser) {
          this.setActiveUser(authenticatedUser);
          this.$router.push("/");
        } else {
          this.$buefy.toast.open({
            message:
              "los datos que ha introducido no son correctos o su usuario no tiene permiso para usar la aplicación",
            type: "is-danger"
          });
        }
      } catch (err) {
        let error = this.isComputedOnline
          ? "No ha sido posible conectarse, el servidor esta caido"
          : " No es posible conectarse si no dispones de conexión a internet";
        this.$buefy.toast.open({
          message: error,
          type: "is-danger"
        });
      } finally {
        this.isLoading = false;
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

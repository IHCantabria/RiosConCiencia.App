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
        >
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
import { login, getUserRiverSections } from "@/api/riosconciencia.js";
import { mapGetters, mapActions } from "vuex";

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
  computed: {
    ...mapGetters({
      userCanDoExpertForm: "userCanDoExpertForm",
      userCanDoPictsForm: "userCanDoPictsForm"
    })
  },
  methods: {
    ...mapActions({
      setActiveUser: "setActiveUser",
      loadRiverSections: "loadRiverSections"
    }),
    async loginUser() {
      try {
        this.isLoading = true;
        const authenticatedUser = await login(
          this.userEmail,
          this.userPassword
        );
        this.setActiveUser(authenticatedUser);
        this.getRiverSections(authenticatedUser);
        this.$router.push("/");
      } catch (err) {
        if (!err.response) {
          let error = this.isComputedOnline
            ? "No ha sido posible conectarse, el servidor esta caido"
            : " No es posible conectarse si no dispones de conexión a internet";
          this.$buefy.toast.open({
            message: error,
            type: "is-danger",
            duration: 4000
          });
        }
        if (err.response.status == 403)
          this.$buefy.toast.open({
            message:
              "Los datos que has introducido no son correctos o tu usuario no tiene permiso para usar la aplicación",
            type: "is-danger",
            duration: 4000
          });
        if (err.response.status == 400) {
          this.$buefy.toast.open({
            message:
              "Debes rellenar los campos email y contraseña para poder conectarte",
            type: "is-danger",
            duration: 4000
          });
        }
      } finally {
        this.isLoading = false;
      }
    },
    async getRiverSections(authenticatedUser) {
      try {
        const userRiverSections = await getUserRiverSections(
          authenticatedUser.token,
          authenticatedUser.id
        );
        this.loadRiverSections(userRiverSections);
        if (userRiverSections == "" && this.userCanDoExpertForm) {
          this.$buefy.toast.open({
            message:
              "¡Atención! no tienes asignados tramos de río, no podras completar ni enviar ningun formulario",
            type: "is-danger",
            duration: 8000
          });
        }
      } catch (err) {
        this.$buefy.toast.open({
          message: "Fallo al recuperar tus tramos de río, prueba mas tarde",
          type: "is-danger",
          duration: 5000
        });
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

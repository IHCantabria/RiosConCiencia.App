<template>
  <div class="toolbar">
    <div id="nav" class="nav">
      <div v-show="userIsLogged" class="nav__link" @click="confirmLogout">
        <router-link to=""
          ><b-icon icon="close-circle" size="is-medium"> </b-icon
        ></router-link>
      </div>
      <div class="nav__link">
        <router-link to="/"
          ><b-icon icon="home-circle" size="is-medium"> </b-icon
        ></router-link>
      </div>
      <div class="nav__link">
        <router-link to="/about"
          ><b-icon icon="help-circle" size="is-medium"> </b-icon
        ></router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userIsLogged: "userIsLogged"
    })
  },
  methods: {
    confirmLogout() {
      this.$buefy.dialog.confirm({
        title: "Desconectar Usuario",
        message:
          "¿Seguro que quieres cerrar la sesión? Se perderán los datos de cualquier formulario no enviado.",
        confirmText: "Cerrar sesión",
        cancelText: "Volver atrás",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.$root.$emit("logout")
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  &__link {
    padding-right: 1rem;
  }
}
</style>

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
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userIsLogged: "userIsLogged"
    })
  },
  mounted() {},
  methods: {
    ...mapActions({
      setActiveUser: "setActiveUser"
    }),
    logout() {
      this.setActiveUser({});
      this.$router.push("login");
    },
    confirmLogout() {
      this.$buefy.dialog.confirm({
        title: "Desconectar Usuario",
        message:
          "¿Seguro que quiere cerrar sesión? Se perderán los datos de cualquier formulario no enviado.",
        confirmText: "Cerrar sesión",
        cancelText: "Volver atras",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.logout()
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

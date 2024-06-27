<script setup>
import { useRouter } from "vue-router";
import { useAppStore } from "@/store/appStore.js";
import { DialogProgrammatic as Dialog } from "@fantage9/buefy-vue3";

const router = useRouter();
const appStore = useAppStore();

const confirmLogout = () => {
  Dialog.confirm({
    title: "Desconectar Usuario",
    message:
      "¿Seguro que quieres cerrar la sesión? Se perderán los datos de cualquier formulario no enviado.",
    confirmText: "Cerrar sesión",
    cancelText: "Volver atrás",
    type: "is-danger",
    hasIcon: true,
    onConfirm: () => {
      appStore.logout();
      router.push({ name: "login" });
    },
  });
};
</script>

<template>
  <div class="toolbar">
    <div id="nav" class="nav">
      <div
        v-show="appStore.userIsLogged"
        class="nav__link"
        @click="confirmLogout"
      >
        <router-link to="">
          <b-icon icon="close-circle" size="is-medium"></b-icon>
        </router-link>
      </div>
      <div class="nav__link">
        <router-link to="/">
          <b-icon icon="home-circle" size="is-medium"></b-icon>
        </router-link>
      </div>
      <div class="nav__link">
        <router-link to="/about">
          <b-icon icon="help-circle" size="is-medium"></b-icon>
        </router-link>
      </div>
      <div
        v-if="appStore.userHasSettingsAccess"
        class="nav__link settings-icon"
      >
        <router-link to="/settings">
          <b-icon icon="cog" size="is-medium"></b-icon>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  &__link {
    padding-right: 1rem;
  }
}

@media only screen and (max-width: app-variables.$breakpoint-tablet-to-desktop) {
  .settings-icon {
    display: none;
  }
}
</style>

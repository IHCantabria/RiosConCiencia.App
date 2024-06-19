<script setup>
import { ref } from "vue";
import { login } from "@/api/riosconciencia.js";
import Spinner from "@/components/LoadingComponent.vue";
import { useAppStore } from "@/store/appStore.js";
import { useRouter } from "vue-router";
import { useDataLoader } from "@/composables/useDataLoader.js";
import { ToastProgrammatic as Toast } from "@fantage9/buefy-vue3";

// STORES & COMPOSABLES
const router = useRouter();
const appStore = useAppStore();
const { initDataLoader } = useDataLoader();

// DATA
const userEmail = ref("");
const userPassword = ref("");
const isLoading = ref(false);

// METHODS
const loginUser = async () => {
  try {
    isLoading.value = true;
    const authenticatedUser = await login(userEmail.value, userPassword.value);
    appStore.setActiveUser(authenticatedUser);
    await initDataLoader();
    router.push("/");
  } catch (err) {
    if (!err.response) {
      const error = appStore.isOnline
        ? "No ha sido posible conectarse, el servidor esta caido"
        : " No es posible conectarse si no dispones de conexión a internet";
      Toast.open({
        message: error,
        type: "is-danger",
        duration: 4000,
      });
    }
    if (err.response.status == 403) {
      Toast.open({
        message:
          "Los datos que has introducido no son correctos o tu usuario no tiene permiso para usar la aplicación",
        type: "is-danger",
        duration: 4000,
      });
    }
    if (err.response.status == 400) {
      Toast.open({
        message:
          "Debes rellenar los campos email y contraseña para poder conectarte",
        type: "is-danger",
        duration: 4000,
      });
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="login">
    <div class="login__title-logo">
      <img
        src="@/assets/logos/RiosConCiencia.png"
        title="Ríos Con Ciencia"
        alt="rios con ciencia logo"
      />
    </div>
    <div class="login__main">
      <b-field label="Email">
        <b-input
          v-model="userEmail"
          placeholder="Email"
          type="email"
          icon="email"
        >
        </b-input>
      </b-field>
      <b-field label="Contraseña">
        <b-input
          v-model="userPassword"
          placeholder="Contraseña"
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

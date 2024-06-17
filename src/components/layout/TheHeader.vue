<script setup>
import TheHeaderToolbar from "@/components/layout/TheHeaderToolbar.vue";
import TheHeaderQuickView from "@/components/layout/TheHeaderQuickView.vue";

const version = __APP_VERSION__;
</script>

<template>
  <div class="main-header">
    <div class="main-header__intro-wrapper">
      <div class="main-header__welcome">
        <div class="main-header__toolbar-wrapper">
          <div>
            <span class="main-header__welcome-title">Ríos</span>
            <span class="main-header__welcome-subtitle">ConCiencia</span>
            <label class="version text-light"> v{{ version }}</label>
          </div>
          <TheHeaderToolbar />
        </div>
      </div>
    </div>
    <div class="break"></div>
    <div class="main-header__quickview_wrapper">
      <TheHeaderQuickView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-header {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  color: #fff;
  background: url("@/assets/images/riosconciencia_header.jpg") no-repeat center;
  background-size: 100%;
  box-shadow:
    0 4px 8px 0 rgb(0 0 0 / 20%),
    0 6px 20px 0 rgb(0 0 0 / 19%);

  &__intro-wrapper {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-between;
    height: 40%;
    padding: 0.7rem;
    background: rgb(44 62 80 / 40%);
    letter-spacing: 1px;
  }

  &__quickview_wrapper {
    flex-grow: 1;
  }

  &__welcome {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &__welcome-title {
    margin-bottom: 0.5rem;
    font-size: app-variables.$headers-font-size;
    font-weight: 600;
    color: app-variables.$color-primary;
  }

  &__welcome-subtitle {
    color: #fff;
    font-size: app-variables.$subheader-font-size;
  }

  &__toolbar-wrapper {
    display: flex;
    justify-content: space-between;
  }
}

.version {
  font-size: 0.5rem;
  color: white;
}

.text-light {
  font-weight: 300;
}

.break {
  flex-basis: 100%;
  height: 0;
}

/* Non-mobile styles, 750px breakpoint */
@media only screen and (min-width: app-variables.$breakpoint-movil-to-tablet) {
  /* Header quickview items in one row */
  .main-header {
    &__intro-wrapper {
      flex-direction: row;
      padding: 0.8rem 1.9rem;
    }
  }
}
</style>

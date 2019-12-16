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
          <toolbar></toolbar>
        </div>
      </div>
    </div>
    <div class="break"></div>
    <div class="main-header__quickview_wrapper">
      <quick-view></quick-view>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    toolbar: () => import("@/components/layout/AppHeaderToolbar"),
    "quick-view": () => import("@/components/layout/AppHeaderQuickView")
  },
  data() {
    return {
      version: process.env.VERSION
    };
  }
};
</script>
<style lang="scss" scoped>
.main-header {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 100%;
  color: #fff;
  background: url("~@/assets/images/riosconciencia_header.jpg") no-repeat center;
  background-size: 100%;

  &__intro-wrapper {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: space-between;
    height: 40%;
    padding: 0.7rem;
    background: rgba(44, 62, 80, 0.4);
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
    font-size: $headers-font-size;
    font-weight: 600;
    color: $color-primary;
  }

  &__welcome-subtitle {
    color: #fff;
    font-size: $subheader-font-size;
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
@media only screen and (min-width: $breakpoint-movilToTablet) {
  /* Header quickview items in one row */
  .main-header__intro-wrapper {
    flex-direction: row;
    padding: 0.8rem 1.9rem;
  }
}
</style>

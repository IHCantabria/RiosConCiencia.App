<template>
  <div class="intro">
    <div class="intro__main">
      <button>Usuario Experto</button>
      <button>Usuario con Desafíos</button>
    </div>
    <div class="intro_logos">
      Logos
    </div>
  </div>
</template>
<script>
export default {
  name: "Intro"
};
</script>
<style lang="scss" scoped>
.intro {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  &__main {
    display: flex;
    flex-grow: 1;
    height: 50%;
  }
  &__logos {
  }
}
</style>

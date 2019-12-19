<template>
  <div class="section">
    <section>
      <b-dropdown aria-role="list">
        <button class="button is-primary" slot="trigger">
          <span>Click me!</span>
          <b-icon icon="menu-down"></b-icon>
        </button>

        <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
        <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
        <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
      </b-dropdown>
    </section>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped></style>

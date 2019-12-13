<template>
  <div>
    <b-steps
      v-model="activeStep"
      :animated="isAnimated"
      :has-navigation="hasNavigation"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
    >
      <b-step-item label="Account" :clickable="isStepsClickable">
        <h1 class="title has-text-centered">Account</h1>
        Lorem ipsum dolor sit amet.
      </b-step-item>

      <b-step-item
        label="Profile"
        :clickable="isStepsClickable"
        :type="{ 'is-success': isProfileSuccess }"
      >
        <h1 class="title has-text-centered">Profile</h1>
        Lorem ipsum dolor sit amet.
      </b-step-item>

      <b-step-item
        :visible="showSocial"
        label="Social"
        :clickable="isStepsClickable"
      >
        <h1 class="title has-text-centered">Social</h1>
        Lorem ipsum dolor sit amet.
      </b-step-item>

      <b-step-item label="Finish" :clickable="isStepsClickable" disabled>
        <h1 class="title has-text-centered">Finish</h1>
        Lorem ipsum dolor sit amet.
      </b-step-item>

      <template
        v-if="customNavigation"
        slot="navigation"
        slot-scope="{ previous, next }"
      >
        <b-button
          outlined
          type="is-danger"
          icon-pack="fas"
          icon-left="backward"
          :disabled="previous.disabled"
          @click.prevent="previous.action"
        >
          Previous
        </b-button>
        <b-button
          outlined
          type="is-success"
          icon-pack="fas"
          icon-right="forward"
          :disabled="next.disabled"
          @click.prevent="next.action"
        >
          Next
        </b-button>
      </template>
    </b-steps>
    <div class="footer__buttons">
      <b-button type="is-primary" size="is-medium">Previous</b-button>
      <b-button type="is-primary" size="is-medium">Next</b-button>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.footer__buttons {
  display: flex;
  justify-content: space-between;
}
</style>

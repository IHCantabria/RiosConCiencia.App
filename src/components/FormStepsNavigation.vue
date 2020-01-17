<template>
  <!--TODO: Hacer componente Base reutilizable -->
  <b-steps
    size="is-small"
    v-model="activeStep"
    :animated="stepItemCfg.isAnimated"
    :has-navigation="stepItemCfg.hasNavigation"
  >
    <b-step-item
      v-for="(section, index) in Object.keys(sections)"
      :key="index"
      :label="index.toString()"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': section.isSuccess }"
    >
    </b-step-item>

    <template
      v-if="stepItemCfg.customNavigation"
      slot="navigation"
      slot-scope="{ previous, next }"
    >
      <div class="customNavButtons">
        <b-button
          type="is-primary"
          icon-pack="mdi"
          icon-left="less-than"
          :disabled="isFirstSection"
          @click.prevent="previous.action"
          >Anterior
        </b-button>
        <b-button
          type="is-primary"
          icon-pack="mdi"
          icon-right="greater-than"
          :disabled="isLastSection"
          @click.prevent="next.action"
        >
          Siguiente
        </b-button>
      </div>
    </template>
  </b-steps>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      activeStep: 0,
      stepItemCfg: {
        isStepsClickable: true,
        isAnimated: true,
        hasNavigation: true,
        customNavigation: true,
        prevIcon: "chevron-left",
        nextIcon: "chevron-right",
        isProfileSuccess: true
      }
    };
  },
  watch: {
    activeStep(newStep, oldStep) {
      if (newStep !== oldStep) {
        this.setActiveSection(newStep);
      }
    }
  },
  computed: {
    ...mapState({
      sections: state => state.formSections
    }),
    ...mapGetters({
      isFirstSection: "isFirstSection",
      isLastSection: "isLastSection"
    })
  },
  methods: {
    ...mapActions({
      setActiveSection: "setActiveSection"
    })
  }
};
</script>
<style lang="scss" scoped>
.customNavButtons {
  display: flex;
  justify-content: space-between;
}
</style>

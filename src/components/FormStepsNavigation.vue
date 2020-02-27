<template>
  <!--TODO: Hacer componente Base reutilizable -->
  <b-steps
    size="is-small"
    v-model="stepControl"
    :animated="stepItemCfg.isAnimated"
    :has-navigation="stepItemCfg.hasNavigation"
  >
    <b-step-item
      v-for="(section, index) in Object.keys(sections)"
      :key="index"
      :label="index.toString()"
      :clickable="stepItemCfg.isStepsClickable"
      :type="sections[section].isValid ? 'is-success' : 'is-danger'"
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
          :disabled="isLastSection(sections)"
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
  computed: {
    stepControl: {
      get() {
        return this.activeStep;
      },
      set(value) {
        this.setActiveSection(value);
      }
    },
    ...mapState({
      sectionsExpert: state => state.formExpertSections,
      sectionsPicts: state => state.formPictsSections,
      activeStep: state => state.activeSectionId,
      activeForm: state => state.activeFormId
    }),
    ...mapGetters({
      isFirstSection: "isFirstSection",
      isLastSection: "isLastSection"
    }),
    sections() {
      return this.activeForm == 0 ? this.sectionsExpert : this.sectionsPicts;
    }
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

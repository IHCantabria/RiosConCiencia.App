<template>
  <!--TODO: Hacer componente Base reutilizable -->
  <b-steps
    size="is-small"
    v-model="activeStep"
    :animated="stepItemCfg.isAnimated"
    :has-navigation="stepItemCfg.hasNavigation"
  >
    <b-step-item
      label="0"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': formSections.init.isSuccess }"
    >
      <h5 class="title has-text-centered is-5">
        Datos Iniciales
      </h5>
    </b-step-item>

    <b-step-item
      label="1"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': formSections.basic.isSuccess }"
    >
      <h5 class="title has-text-centered is-5">
        Inspección Básica del Tramo
      </h5>
    </b-step-item>

    <b-step-item
      label="2"
      :visible="stepItemCfg.isAnimated"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': formSections.spills.isSuccess }"
    >
      <h5 class="title has-text-centered is-5">
        Inspección de Vertidos
      </h5>
    </b-step-item>

    <b-step-item
      label="3"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': formSections.waste.isSuccess }"
    >
      <h5 class="title has-text-centered is-5">
        Inspección de Residuos
      </h5>
    </b-step-item>

    <b-step-item
      label="4"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': formSections.habitat.isSuccess }"
    >
      <h5 class="title has-text-centered is-5">
        El Habitat Fluvial
      </h5>
    </b-step-item>

    <b-step-item
      label="5"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': formSections.ecosystem.isSuccess }"
    >
      <h5 class="title has-text-centered is-5">
        El Ecosistema Acuático
      </h5>
    </b-step-item>

    <b-step-item
      label="6"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': formSections.bioQuality.isSuccess }"
    >
      <h5 class="title has-text-centered is-5">
        Calidad Biológica del Agua
      </h5>
    </b-step-item>
    <b-step-item
      label="7"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': formSections.riverQuality.isSuccess }"
    >
      <h5 class="title has-text-centered is-5">
        Calidad del Bosque de Ribera
      </h5>
    </b-step-item>

    <b-step-item
      label="8"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': formSections.ecoResult.isSuccess }"
    >
      <h5 class="title has-text-centered is-5">
        Estado Ecológico
      </h5>
    </b-step-item>

    <template
      v-if="stepItemCfg.customNavigation"
      slot="navigation"
      slot-scope="{ previous, next }"
    >
      <div class="customNavButtons">
        <b-button
          type="is-primary"
          size="is-small"
          icon-pack="mdi"
          icon-left="less-than"
          :disabled="isFirstSection"
          @click.prevent="previous.action"
          >Anterior
        </b-button>
        <b-button
          type="is-primary"
          size="is-small"
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
      },
      formSections: {
        init: { isSuccess: false },
        basic: { isSuccess: false },
        spills: { isSuccess: false },
        waste: { isSuccess: false },
        habitat: { isSuccess: false },
        ecosystem: { isSuccess: false },
        bioQuality: { isSuccess: false },
        riverQuality: { isSuccess: false },
        ecoResult: { isSuccess: false }
      }
    };
  },
  computed: {
    isFirstSection() {
      return this.activeStep === 0;
    },
    isLastSection() {
      return this.activeStep === Object.keys(this.formSections).length - 1;
    }
  }
};
</script>
<style lang="scss" scoped>
.customNavButtons {
  display: flex;
  justify-content: space-between;
}
</style>

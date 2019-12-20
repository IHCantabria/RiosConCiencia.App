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
      :type="{ 'is-success': sections.init.isSuccess }"
    >
      <h5 class="title has-text-centered is-5">
        Datos Iniciales
      </h5>
    </b-step-item>

    <b-step-item
      label="1"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': sections.basic.isSuccess }"
    >
      <h5 class="title has-text-centered is-5">
        Inspección Básica del Tramo
      </h5>
    </b-step-item>

    <b-step-item
      label="2"
      :visible="stepItemCfg.isAnimated"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': sections.spills.isSuccess }"
    >
      <h5 class="title has-text-centered is-5">
        Inspección de Vertidos
      </h5>
    </b-step-item>

    <b-step-item
      label="3"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': sections.waste.isSuccess }"
    >
      <h5 class="title has-text-centered is-5">
        Inspección de Residuos
      </h5>
    </b-step-item>

    <b-step-item
      label="4"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': sections.habitat.isSuccess }"
    >
      <h5 class="title has-text-centered is-5">
        El Habitat Fluvial
      </h5>
    </b-step-item>

    <b-step-item
      label="5"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': sections.ecosystem.isSuccess }"
    >
      <h5 class="title has-text-centered is-5">
        El Ecosistema Acuático
      </h5>
    </b-step-item>

    <b-step-item
      label="6"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': sections.bioQuality.isSuccess }"
    >
      <h5 class="title has-text-centered is-5">
        Calidad Biológica del Agua
      </h5>
    </b-step-item>
    <b-step-item
      label="7"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': sections.riverQuality.isSuccess }"
    >
      <h5 class="title has-text-centered is-5">
        Calidad del Bosque de Ribera
      </h5>
    </b-step-item>

    <b-step-item
      label="8"
      :clickable="stepItemCfg.isStepsClickable"
      :type="{ 'is-success': sections.ecoResult.isSuccess }"
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
import { mapState } from "vuex";
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
  computed: {
    ...mapState({
      sections: state => state.formFields.sections
    }),
    isFirstSection() {
      return this.activeStep === 0;
    },
    isLastSection() {
      return this.activeStep === Object.keys(this.sections).length - 1;
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

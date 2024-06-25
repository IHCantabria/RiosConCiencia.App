<script setup>
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: "",
  },
  disabled: {
    type: Boolean,
    required: false,
    default() {
      return false;
    },
  },
  useInternalAccess: {
    type: Boolean,
    required: false,
    default: true,
  },
  useButton: {
    type: Boolean,
    required: false,
    default: true,
  },
  buttonConfig: {
    type: Object, //{buttonText: String, buttonClass: String(bulma button classes)}
    required: false,
    default() {
      return null;
    },
  },
  libraryIcon: {
    type: String,
    required: false,
    default() {
      return null;
    },
  },
  libraryIconSize: {
    type: String,
    required: false,
    default: "is-medium", // is-small, is-medium, is-large
  },
  pngUrl: {
    type: String,
    required: false,
    default: null,
  },
  pngConfig: {
    type: Object,
    required: false,
    default() {
      return {
        alt: "Info",
        title: "Info",
      };
    },
  },
  closeClickOutside: {
    type: Boolean,
    required: false,
    default: true,
  },
  hasHeader: {
    type: Boolean,
    required: false,
    default() {
      return true;
    },
  },
  hasFooter: {
    type: Boolean,
    required: false,
    default() {
      return false;
    },
  },
  showHeaderCloseButton: {
    type: Boolean,
    required: false,
    default() {
      return true;
    },
  },
});

const emit = defineEmits(["changeModalState"]);

const isModalActive = ref(false);

const changeModalState = (modalActive) => {
  if (!props.disabled) isModalActive.value = modalActive;
  emit("changeModalState", modalActive);
};

defineExpose({
  changeModalState,
  isModalActive,
});
</script>

<template>
  <a
    v-if="useInternalAccess"
    class="modal-button"
    :class="[disabled ? 'modal-button--disabled' : '']"
    @click.prevent="changeModalState(true)"
  >
    <span v-if="libraryIcon">
      <span class="icon" :class="libraryIconSize">
        <em :class="libraryIcon" />
      </span>
    </span>
    <span v-if="pngUrl" class="icon-image">
      <img :src="pngUrl" :alt="pngConfig.alt" :title="pngConfig.title" />
    </span>
    <button
      v-if="buttonConfig && useButton"
      class="button"
      :class="buttonConfig.buttonClass"
      :disabled="disabled"
    >
      {{ buttonConfig.buttonText }}
    </button>
    <span v-if="buttonConfig && !useButton">{{ buttonConfig.buttonText }}</span>
  </a>
  <Teleport to="body">
    <div v-if="isModalActive" class="modal">
      <div
        class="modal-background"
        @click.prevent="
          closeClickOutside == true ? changeModalState(false) : null
        "
      />
      <div class="modal-card">
        <header v-if="hasHeader" class="modal-card-head">
          <p class="modal-card-title">
            {{ title }}
          </p>
          <em
            v-if="props.showHeaderCloseButton"
            class="mdi mdi-close"
            @click.prevent="changeModalState(false)"
          />
        </header>
        <section
          class="modal-card-body"
          :class="{
            'modal-card-body--no-header': !hasHeader,
            'modal-card-body--no-footer': !hasFooter,
            'modal-card-body--no-header-no-footer': !hasHeader && !hasFooter,
          }"
        >
          <slot name="content" />
        </section>
        <footer v-if="hasFooter" class="modal-card-foot">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
// BUTTONS
.modal-button {
  cursor: pointer;
}

.icon {
  &:hover {
    color: app-variables.$color-primary;
  }
}

.is-small {
  font-size: 0.75rem;
}

.is-medium {
  font-size: 1rem;
}

.is-large {
  font-size: 1.25rem;
}

.icon-image {
  height: 28px;
}

.mdi-close {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;

  &:hover {
    border-radius: 50%;
    background-color: app-variables.$color-primary;
    color: app-variables.$color-white;
  }
}

// MODAL
.modal {
  z-index: 1002;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: app-variables.$secondary-color;
    border-radius: 2px;
  }
}

.modal-background {
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(77 77 77 / 26.7%);
  z-index: 1001;
}

.modal-card {
  width: auto;
  max-width: 80vw;
  max-height: 90vh;
  z-index: 1002;
  overflow: hidden;

  .modal-card-head {
    background-color: app-variables.$color-white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-radius: 15px 15px 0 0;
    border-bottom: 1px solid rgb(172 172 172 / 40.4%);

    .modal-card-title {
      color: app-variables.$font-color-primary;
      margin: 0;
      text-transform: uppercase;
    }
  }

  .modal-card-body {
    border-radius: 0;
    background-color: app-variables.$color-white;
    padding: 1rem;
    max-height: 700px;
    overflow-y: auto;

    &--no-header {
      border-radius: 15px 15px 0 0;
    }

    &--no-footer {
      border-radius: 0 0 15px 15px;
    }

    &--no-header-no-footer {
      border-radius: 15px;
    }
  }

  .modal-card-foot {
    border-top: 1px solid rgb(172 172 172 / 40.4%);
    background-color: app-variables.$color-white;
    border-radius: 0 0 15px 15px;
    padding: 1rem;
  }
}
</style>

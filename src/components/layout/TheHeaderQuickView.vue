<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { roundValue } from "@/utils/utils.js";
import { getWeather } from "@/api/open-weather/open-weather.js";
import { useDateHelpers } from "@/composables/useDateHelpers.js";
import { useAppStore } from "@/store/appStore.js";

// STORES & COMPOSABLES
const appStore = useAppStore();
const { getLocalDate } = useDateHelpers();

// DATA
const weather = ref({});

// COMPUTED
const computedPosition = computed(() => {
  if (!appStore.userPosition) return null;
  return `${roundValue(appStore.userPosition.lon, 3)} / ${roundValue(
    appStore.userPosition.lat,
    3,
  )}`;
});
const computedDate = computed(() => {
  return getLocalDate();
});
const computedTemp = computed(() => {
  return weather.value.temp != null
    ? `${roundValue(weather.value.temp, 1)} ºC`
    : "";
});

// LIFECYCLE
onMounted(() => {
  if (appStore.userPosition) {
    //if default point is defined
    loadWeather(appStore.userPosition);
  }
});

// METHODS
const loadWeather = async (point) => {
  weather.value = await getWeather(point);
};

// WATCHERS
watch(
  () => appStore.userPosition,
  (newPosition, oldPosition) => {
    if (newPosition !== oldPosition) {
      loadWeather({
        lon: newPosition.lon,
        lat: newPosition.lat,
      });
    }
  },
);
</script>

<template>
  <div class="quickview">
    <div class="quickview__item">
      <div class="quickview__item-value">
        <i :class="['wi', weather.conditionIcon]"></i>
        {{ computedTemp }}
      </div>
      <div class="quickview__item-description">
        <img src="@/assets/icons/place.png" alt="place img" />
        <span class="text-light">{{ computedPosition }}</span>
      </div>
    </div>
    <div class="quickview__item">
      <div class="quickview__item-description">
        <img src="@/assets/icons/calendar.png" alt="calendar img" />
        <span class="text-light">{{ computedDate }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css";

.quickview {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(2, minmax(150px, 1fr));

  &__item {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  &__item-value {
    display: inline-block;
    padding: 0.5rem;
    font-size: 1rem;
  }

  &__item-description {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    text-align: center;
  }

  & img {
    width: 15%;
    padding: 0.1rem;
  }
}
</style>

<template>
  <div class="quickview">
    <div class="quickview__item">
      <div class="quickview__item-value">
        <i :class="['wi', weather.conditionIcon]"></i>
        {{ computedTemp }}
      </div>
      <div class="quickview__item-description">
        <img src="@/assets/icons/place.png" />
        <span class="text-light">??</span>
      </div>
    </div>
    <div class="quickview__item">
      <div class="quickview__item-value">{{ computedTime }}</div>
      <div class="quickview__item-description">
        <img src="@/assets/icons/calendar.png" />
        <span class="text-light">{{ computedDate }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { roundValue } from "@/utils/utils.js";
import { getWeather } from "@/api/open-weather/open-weather.js";
import { mapState } from "vuex";

export default {
  name: "QuickView",
  data() {
    return {
      weather: {},
      time: {}
    };
  },
  computed: {
    ...mapState({
      userPosition: state => state.userPosition
    }),
    computedDate() {
      return this.$_getLocalDate();
    },
    computedTime() {
      return this.$_getLocalTime();
    },
    computedTemp() {
      return this.weather.temp != null
        ? `${roundValue(this.weather.temp, 1)} ºC`
        : "";
    }
  },
  watch: {
    userPosition(newPosition, oldPosition) {
      if (newPosition !== oldPosition) {
        this.loadWeather({
          lon: newPosition.lon,
          lat: newPosition.lat
        });
      }
    }
  },
  mounted() {
    if (this.userPosition) {
      //if default point is defined
      this.loadWeather(this.userPosition);
    }
  },
  methods: {
    async loadWeather(point) {
      this.weather = await getWeather(point);
    }
  }
};
</script>
<style lang="scss" scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css");

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

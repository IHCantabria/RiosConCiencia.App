<script>
import { getUserGeolocation } from "@/api/geolocation.js";
import { mapActions } from "vuex";

export default {
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    ...mapActions({
      setUserPosition: "setUserPosition"
    }),
    async init() {
      try {
        this.geolocateUser();
        this.$emit("geo-data-ready");
      } catch (e) {
        this.$emit(
          "data-load-error",
          `Error getting geolocation. Detail: ${e}`
        );
      }
    },
    geolocateUser() {
      getUserGeolocation()
        .then(res => {
          const position = {
            lon: parseFloat(res.coords.longitude).toFixed(7),
            lat: parseFloat(res.coords.latitude).toFixed(7)
          };
          this.setUserPosition(position);
        })
        .catch(() => {});
    }
  },
  render: () => null
};
</script>

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
        //TODO: loading
        this.geolocateUser();
        this.$emit("data-load-ready");
      } catch (e) {
        this.$emit("data-load-error", `Error loading data. Detail: ${e}`);
      } finally {
        //TODO: close loading
      }
    },
    geolocateUser() {
      getUserGeolocation()
        .then(res => {
          const position = {
            lon: res.coords.longitude,
            lat: res.coords.latitude
          };
          this.setUserPosition(position);
        })
        .catch(err => {
          //TODO: notificar?
          console.error(`Error cargando posición. ${err}`);
        });
    }
  },
  render: () => null
};
</script>

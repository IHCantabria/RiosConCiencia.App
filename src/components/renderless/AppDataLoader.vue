<script>
import { geolocation } from "@/api/geolocation.js";
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
        const userPosition = await geolocation();
        this.setUserPosition(userPosition);
        this.$emit("data-load-ready");
      } catch (e) {
        this.$emit("data-load-error", `Error loading data. Detail: ${e}`);
      } finally {
        //TODO: close loading
      }
    }
  },
  render: () => null
};
</script>

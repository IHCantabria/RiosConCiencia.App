<script>
import { mapActions } from "vuex";

export default {
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    ...mapActions({
      setActiveUser: "setActiveUser",
      clearFormResponses: "clearFormResponses",
      clearRiverSections: "clearRiverSections"
    }),
    init() {
      this.$root.$on("logout", () => {
        this.logout();
      });
      this.$root.$on("clear", () => {
        this.finishedForm();
      });
    },
    logout() {
      this.setActiveUser({});
      this.clearRiverSections({});
      this.clearFormResponses();
      this.$router.push("login");
    },
    finishedForm() {
      this.clearFormResponses();
      this.$router.push("/");
    }
  },
  render: () => null
};
</script>

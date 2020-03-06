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
      clearExpertFormResponses: "clearExpertFormResponses",
      clearPictsFormResponses: "clearPictsFormResponses",
      clearRiverSections: "clearRiverSections"
    }),
    init() {
      this.$root.$on("logout", () => {
        this.logout();
      });
      this.$root.$on("clearExpert", () => {
        this.finishedExpertForm();
      });
      this.$root.$on("clearPicts", () => {
        this.finishedPictsForm();
      });
    },
    logout() {
      this.setActiveUser({});
      this.clearRiverSections({});
      this.clearPictsFormResponses();
      this.clearExpertFormResponses();
      this.$router.push("login");
    },
    finishedExpertForm() {
      this.clearExpertFormResponses();
      this.$router.push("/");
    },
    finishedPictsForm() {
      this.clearPictsFormResponses();
      this.$router.push("/");
    }
  },
  render: () => null
};
</script>

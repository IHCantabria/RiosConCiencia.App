<script>
import { mapActions } from "vuex";
import EventBus from "../../utils/event-bus";
export default {
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    ...mapActions({
      clearIndexDB: "clearIndexDB",
      setDefaultStateStore: "setDefaultStateStore",
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
      EventBus.$on("clear_store", () => {
        //Clear vuex-persistence and indexdb
        this.resetState();
      });
    },
    resetState() {
      this.$router.push("login");
      this.clearIndexDB();
      this.setDefaultStateStore();
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

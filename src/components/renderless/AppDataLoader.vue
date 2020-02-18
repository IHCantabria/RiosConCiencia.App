<script>
import { getMasterData, getUserRiverSections } from "@/api/riosconciencia.js";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    ...mapActions({
      loadFormData: "loadFormData",
      loadRiverSections: "loadRiverSections"
    }),
    async init() {
      try {
        await this.initForm();
        this.$emit("data-load-ready");
      } catch (e) {
        this.$emit("data-load-error", `Error loading data. Detail: ${e}`);
      }
    },
    async initForm() {
      try {
        const masterData = await getMasterData(this.user.token);
        // prepare form data
        for (const name of Object.keys(masterData)) {
          masterData[name].isValid = false;
        }
        this.loadFormData(masterData);
        const userRiverSections = await getUserRiverSections(
          this.user.token,
          this.user.id
        );
        this.loadRiverSections(userRiverSections);
      } catch (err) {
        console.error(err);
      }
    }
  },
  render: () => null
};
</script>

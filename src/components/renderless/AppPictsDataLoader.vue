<script>
import { getPictsMasterData } from "@/api/riosconciencia.js";
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
      loadPictsFormData: "loadPictsFormData"
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
      const masterData = await getPictsMasterData(this.user.token);
      // prepare form data
      for (const name of Object.keys(masterData)) {
        masterData[name].isValid = false;
      }
      this.loadPictsFormData(masterData);
    }
  },
  render: () => null
};
</script>

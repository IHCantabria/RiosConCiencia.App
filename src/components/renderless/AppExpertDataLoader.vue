<script>
import { getExpertMasterData } from "@/api/riosconciencia.js";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  mounted() {
    this.$nextTick(() => {
      if (this.user.token) this.init();
    });
  },
  methods: {
    ...mapActions({
      loadExpertFormData: "loadExpertFormData"
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
      const masterData = await getExpertMasterData(this.user.token);
      // prepare form data
      for (const name of Object.keys(masterData)) {
        masterData[name].isValid = false;
      }
      this.loadExpertFormData(masterData);
    }
  },
  render: () => null
};
</script>

<script>
import { getMasterData } from "@/api/riosconciencia.js";
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
      loadFormData: "loadFormData"
    }),
    async init() {
      try {
        //TODO: loading
        await this.initForm();
        this.$emit("data-load-ready");
      } catch (e) {
        this.$emit("data-load-error", `Error loading data. Detail: ${e}`);
      } finally {
        //TODO: close loading
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
      } catch (err) {
        console.error(err);
      }
    }
  },
  render: () => null
};
</script>

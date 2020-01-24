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
        console.log(this.user.token);
        const masterData = await getMasterData(this.user.token);
        this.loadFormData(masterData);
        console.log(masterData);
      } catch (err) {
        console.error(err);
      }
    }
  },
  render: () => null
};
</script>

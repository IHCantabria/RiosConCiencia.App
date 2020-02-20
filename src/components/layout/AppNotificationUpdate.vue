<script>
import EventBus from "./utils/event-bus";
export default {
  mounted() {
    EventBus.$on("update_available", this.update());
  },
  methods: {
    update() {
      const notif = this.$buefy.notification.open({
        message: `Hay una versión de la aplicación, cierra esta notificación para instalarla`,
        position: "is-top",
        type: "is-warning",
        hasIcon: true,
        closable: true,
        indefinite: true
      });
      notif.$on("close", () => {
        EventBus.$emit("launch_update");
      });
    }
  },
  render: () => null
};
</script>

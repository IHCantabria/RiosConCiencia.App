<script>
import EventBus from "./utils/event-bus";
export default {
  mounted() {
    console.log(EventBus);
    EventBus.$on("update_available", this.update());
  },
  methods: {
    update() {
      console.log("me llama update");
      const notif = this.$buefy.notification.open({
        message: `Hay una versión de la aplicación, cierra esta notificación para instalarla`,
        position: "is-top",
        type: "is-warning",
        hasIcon: true,
        closable: true,
        indefinite: true
      });
      console.log(notif);
      notif.$on("close", () => {
        EventBus.$emit("launch_update");
      });
    }
  },
  render: () => null
};
</script>

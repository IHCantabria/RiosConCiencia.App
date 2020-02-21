<script>
import EventBus from "../../utils/event-bus";
export default {
  mounted() {
    EventBus.$on("update_available", () => {
      this.update();
    });
  },
  methods: {
    update() {
      console.log("me llama update");
      const notif = this.$buefy.notification.open({
        message: `Hay una versión mas reciente de la aplicación, cierra esta notificación para instalarla`,
        position: "is-top",
        type: "is-warning",
        hasIcon: true,
        closable: true,
        indefinite: true
      });
      const EventBusInstance = EventBus;
      notif.$on("close", () => {
        console.log("cierro notificación");
        console.log(EventBus);
        EventBusInstance.$emit("launch_update");
      });
    }
  },
  render: () => null
};
</script>

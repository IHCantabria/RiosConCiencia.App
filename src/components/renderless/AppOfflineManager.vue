<script>
export default {
  created() {
    this.$on("online", () => {
      this.isOnline = true;
      this.$buefy.toast.open({
        message: "Has recuperado la conexión ¡Ya puedes enviar formularios!",
        type: "is-success"
      });
    });

    this.$on("offline", () => {
      this.isOnline = false;
      this.$buefy.toast.open({
        message:
          "¡Cuidado estas sin conexión! No podras enviar formularios hasta tener conexión",
        type: "is-danger"
      });
    });
  },
  render: () => null
};
</script>

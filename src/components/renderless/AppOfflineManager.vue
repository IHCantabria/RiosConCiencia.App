<script>
export default {
  created() {
    this.$on("online", () => {
      this.isOnline = true;
      this.$buefy.toast.open({
        message: "Has recuperado la conexión ¡Ya puedes enviar los datos!",
        type: "is-success"
      });
    });

    this.$on("offline", () => {
      this.isOnline = false;
      this.$buefy.toast.open({
        message:
          "¡Cuidado estas sin conexión! Puedes seguir trabajando en el formulario pero no podras enviarlo hasta tener conexión",
        type: "is-danger"
      });
    });
  },
  render: () => null
};
</script>

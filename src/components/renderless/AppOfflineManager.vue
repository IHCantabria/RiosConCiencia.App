<script>
export default {
  created() {
    this.$on("online", () => {
      this.isOnline = true;
      this.$buefy.toast.open({
        message: "Has recuperado la conexión ¡Ya puedes enviar los datos!",
        type: "is-success",
        duration: 6000
      });
    });

    this.$on("offline", () => {
      this.isOnline = false;
      this.$buefy.toast.open({
        message:
          "¡Cuidado, estás sin conexión! Puedes seguir trabajando en el formulario, pero no podrás enviarlo hasta tener conexión.",
        type: "is-danger",
        duration: 6000
      });
    });
  },
  render: () => null
};
</script>

<script>
export default {
  created() {
    this.$on("online", () => {
      this.isOnline = true;
    });

    this.$on("offline", () => {
      this.isOnline = false;
    });
  },
  render: () => null
};
</script>

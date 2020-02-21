export const androidBackButtonMixin = {
  mounted() {
    console.log("voy a montar el evento deviceready");
    const self = this;
    document.addEventListener(
      "deviceready",
      () => {
        console.log("llama al onDeviceReady");
        self.onDeviceReady();
      },
      false
    );
  },
  beforeDestroy() {
    document.removeEventListener("backbutton", () => {}, false);
  },
  methods: {
    onDeviceReady() {
      console.log("He llamado al onDeviceReady");
      document.addEventListener(
        "backbutton",
        function(e) {
          console.log("voy a bloquear el boton");
          e.preventDefault();
        },
        false
      );
    }
  }
};

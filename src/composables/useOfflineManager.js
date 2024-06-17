import { useAppStore } from "@/store/appStore";
import { useNetwork } from "@vueuse/core";
import { watch } from "vue";
import { ToastProgrammatic as Toast } from "@fantage9/buefy-vue3";

export function useOfflineManager() {
  const appStore = useAppStore();
  const { isOnline } = useNetwork();

  const showOfflineToast = () => {
    Toast.open({
      message:
        "¡Cuidado, estás sin conexión! Puedes seguir trabajando en el formulario, pero no podrás enviarlo hasta tener conexión.",
      type: "is-danger",
      duration: 6000,
    });
  };
  const showOnlineToast = () => {
    Toast.open({
      message: "Has recuperado la conexión ¡Ya puedes enviar los datos!",
      type: "is-success",
      duration: 6000,
    });
  };

  watch(isOnline, (value) => {
    appStore.isOnline = value;
    if (!value) {
      showOfflineToast();
    } else {
      showOnlineToast();
    }
  });

  return {};
}

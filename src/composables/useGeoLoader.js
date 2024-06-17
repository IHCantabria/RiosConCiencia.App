import { getUserGeolocation } from "@/api/geolocation.js";
import { useAppStore } from "@/store/appStore";
import { onMounted, ref } from "vue";

export function useGeoLoader() {
  const appStore = useAppStore();
  const isGeoDataReady = ref(false);
  const geoDataError = ref(null);

  const setUserPosition = (position) => {
    appStore.setUserPosition(position);
  };

  const geolocateUser = async () => {
    try {
      const res = await getUserGeolocation();
      const position = {
        lon: parseFloat(res.coords.longitude).toFixed(7),
        lat: parseFloat(res.coords.latitude).toFixed(7),
      };
      setUserPosition(position);
      isGeoDataReady.value = true;
    } catch (error) {
      geoDataError.value = `Error getting geolocation. Detail: ${error}`;
      isGeoDataReady.value = false;
    }
  };

  onMounted(() => {
    geolocateUser();
  });

  return { useGeoLoader, isGeoDataReady, geoDataError };
}

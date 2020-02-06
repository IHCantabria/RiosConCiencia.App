import LocalForage from "localforage";
import VuexPersistence from "vuex-persist";

export default function createPersistedState(options = {}) {
  return store => {
    const VuexForage = new VuexPersistence({
      ...options,

      storage: LocalForage,
      asyncStorage: true,

      // Used to trigger `storageReady` event as soon as the state is loaded
      // from LocalForage:
      restoreState: (key, storage) =>
        new Promise(resolve => {
          storage.getItem(key).then(data => {
            resolve(data);

            store._vm.$root.$emit("storageReady");
          });
        })
    });

    return VuexForage.plugin(store);
  };
}

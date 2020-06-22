import LocalForage from "localforage";

LocalForage.config({
  name: "riosconciencia-app",
  storeName: "riosconciencia_app_store",
  version: process.env.VERSION
});

export default LocalForage;
export const formStore = LocalForage.createInstance({ name: "store" });

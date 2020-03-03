import { getImg } from "@/utils/utils.js";
export const pictsHelperMixin = {
  data() {
    return {
      imgFolder: null
    };
  },
  methods: {
    $_getImgUrl(idSection, iOption) {
      return this.imgFolder
        ? this.imgFolder(`./${getImg(idSection, iOption)}`)
        : "";
    }
  }
};

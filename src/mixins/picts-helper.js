import { getImg } from "@/utils/utils.js";
export const pictsHelperMixin = {
  data() {
    return {
      imgFolder: null,
      helpActive: false
    };
  },
  computed: {
    isHelpActive() {
      return this.helpActive;
    }
  },
  methods: {
    $_getImgUrl(idSection, iOption = 0, idAlt = 0) {
      return this.imgFolder
        ? this.imgFolder(`./${getImg(idSection, iOption, idAlt)}`)
        : "";
    },
    $_toggleHelp() {
      this.helpActive = !this.helpActive;
    }
  }
};

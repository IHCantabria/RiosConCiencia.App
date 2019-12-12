import { formatToTimeZone } from "date-fns-timezone";
import { addHours, format } from "date-fns";
import { es } from "date-fns/locale";

export const datesHelperMixin = {
  data() {
    return {
      currentDateTime: new Date().getTime(),
      spainLocaleObj: es
    };
  },
  methods: {
    $_calculeGraphOffset(date) {
      const DateOffset = (-1 * new Date(date).getTimezoneOffset()) / 60;
      return DateOffset;
    },
    $_calculeDatesToNowCast() {
      const auxDateTime = new Date(this.currentDateTime);
      const nextdateTime = addHours(auxDateTime, 1);
      return {
        ini: this._formatDateRequestData(auxDateTime),
        end: this._formatDateRequestData(nextdateTime)
      };
    },
    $_getDateNowtoRequest() {
      return this._formatDateRequestData(this.currentDateTime);
    },
    $_getLocalDate() {
      const LocalDate = format(this.currentDateTime, "dd/MM/yyyy");
      return LocalDate;
    },
    $_getLocalTime() {
      const LocalTime = format(this.currentDateTime, "HH:mm");
      return LocalTime;
    },
    _formatDateRequestData(date) {
      //format the current date to ISO format (ISO 8601), Threeds format
      const dateISO =
        formatToTimeZone(date, "YYYY-MM-DD[T]HH:mm:ss.S", {
          timeZone: "Etc/UTC"
        }) + "Z";
      return dateISO;
    }
  }
};

// useDateHelpers.js
import { ref } from "vue";
import { formatToTimeZone } from "date-fns-timezone";
import { addHours, format } from "date-fns";
import { es } from "date-fns/locale";

export function useDateHelpers() {
  const currentDateTime = ref(new Date().getTime());
  const spainLocaleObj = es;

  const calculeGraphOffset = (date) => {
    const DateOffset = (-1 * new Date(date).getTimezoneOffset()) / 60;
    return DateOffset;
  };

  const calculeDatesToNowCast = () => {
    const auxDateTime = new Date(currentDateTime.value);
    const nextdateTime = addHours(auxDateTime, 1);
    return {
      ini: formatDateRequestData(auxDateTime),
      end: formatDateRequestData(nextdateTime),
    };
  };

  const getDateNowtoRequest = () => {
    return formatDateRequestData(currentDateTime.value);
  };

  const getLocalDate = () => {
    const LocalDate = format(currentDateTime.value, "dd/MM/yyyy");
    return LocalDate;
  };

  const getLocalTime = () => {
    const LocalTime = format(currentDateTime.value, "HH:mm");
    return LocalTime;
  };

  const formatDateRequestData = (date) => {
    const dateISO =
      formatToTimeZone(date, "YYYY-MM-DD[T]HH:mm:ss.S", {
        timeZone: "Etc/UTC",
      }) + "Z";
    return dateISO;
  };

  return {
    currentDateTime,
    spainLocaleObj,
    calculeGraphOffset,
    calculeDatesToNowCast,
    getDateNowtoRequest,
    getLocalDate,
    getLocalTime,
    formatDateRequestData,
  };
}

class Utils {
    endOfDate(date) {
        if(!date) return null;
        date.setHours(date.getHours() + 23);
        date.setMinutes(date.getMinutes() + 59);
        date.setSeconds(date.getSeconds() + 59);
        return date;
    }
}
export const utils = new Utils();
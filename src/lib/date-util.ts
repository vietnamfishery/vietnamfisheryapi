/**
 * @description :: Custom library to process date time format
 * like get date, month, year or concat time together
 */

/**
 * Module dependencies.
 */
// import 'moment-timezone'
import * as moment from 'moment-timezone';

/**
 * Define a DateUtil that supports some functions to work with date time
 */
export class DateUtil {
    /**
    * Get current datetime using moment
    * @return {Date} The current date
    */
    static getNow() {
        return moment().toDate();
    }

    /**
    * Get current datetime for specify time zone
    * @param {String} timeZone  The time zone name
    * @param {String} format    The format pattern to be used
    * @return {Date}            The current date in specify time zone
    */
    static getNowByTimeZone(timeZone, format) {
        return moment().tz(timeZone).format(format);
    }

    /**
     * Get current UTC datetime using moment
     * @return {String} A string that represent curent UTC datetime (i.e. 2016-11-13T04:40:08Z)
     */
    static getUTCDateTime() {
        return moment.utc().format();
    }

    /**
     * Converts the given date with the format pattern
     * @param {String} date             The date to be converted
     * @param {String} format           The format pattern to be used
     * @param {boolean} isUTC           The boolean value to specific the date is UTC or not
     * @param {boolean} ignoreConvert   The flag to specific the date is convert to server time or not
     * @return {String}                 The formatted date
     */
    static formatDate(date, format, isUTC?, ignoreConvert = false) {
        if (!date) {
            return null;
        }

        if (isUTC) {
            return moment.utc(date).format(format);
        }

        // Remove Z character from the date value to ignore convert to local time
        if (ignoreConvert && typeof date === 'string') {
            date = date.replace(new RegExp('Z', 'g'), '');
        }

        return moment(date).format(format);
    }

    /**
     * Gets the date from the formatted date string
     * @param {String} str The formatted date to be converted
     * @param {String} format The format pattern is using
     * @return {String} Return the date from the formatted date string
     */
    static parse(str, format) {
        if (str === null || str === '') {
            return null;
        }

        return moment(str, format).toDate();
    }

    /**
     * Converts the formatted date to the new format
     * @param {String} str          The formatted date to be converted
     * @param {String} format       The format pattern is using
     * @param {String} newFormat    The new format pattern to be used
     * @return {String} Return the new formatted date
     */
    static reformatDate(str, format, newFormat) {
        let date = this.parse(str, format);

        return DateUtil.formatDate(date, newFormat);
    }

    /**
     * To get the difference in another unit of measurement, pass that measurement as the second argument.
     * @param {Date} date           The date to difference
     * @param {Date} diffDate       The date to be diff
     * @param {String} unitOfTime   The unit of time (months, years, days, etc... )
     * @return {String} The difference in another unit of measurement
     */
    static diffDate(date, diffDate, unitOfTime) {
        return moment(date).diff(diffDate, unitOfTime);
    }

    /**
     * To add amount unit of time to specified date
     * @param {Date} date           The input date
     * @param {Date} amount         The amount unit that the input date will add
     * @param {String} unitOfTime   The unit of time (months, years, days, etc... )
     * @return {Date} The date after added amount of unit of time.
     */
    static add(date, amount, unitOfTime) {
        return moment(date).add(amount, unitOfTime).toDate();
    }

    /**
     * To subtract amount unit of time to specified date
     * @param {Date} date           The input date
     * @param {Date} amount         The amount unit that the input date will substract
     * @param {String} unitOfTime   The unit of time (months, years, days, etc... )
     * @return {Date} The date after subtracted amount of unit of time.
     */
    static subtract(date, amount, unitOfTime) {
        return moment(date).subtract(amount, unitOfTime).toDate();
    }

    /**
     * Calculate the date end of unit of time to specified date
     * @param {Date} date           The input date
     * @param {String} unitOfTime   The unit of time (months, years, days, etc... )
     * @return {Date} The date end of unit of time.
     */
    static endOf(date, unitOfTime) {
        return moment(date).endOf(unitOfTime).toDate();
    }
}

module.exports = DateUtil;

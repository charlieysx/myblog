import dayjs from 'dayjs'

/**
 * 判断当前日期是否小于等于传入的日期
 */
dayjs.prototype.isSameOrBefore = function (date?: string | number | dayjs.Dayjs | Date | undefined) {
    return this.isSame(date) || this.isBefore(date)
}
/**
 * 判断当前日期是否大于等于传入的日期
 */
dayjs.prototype.isSameOrAfter = function (date?: string | number | dayjs.Dayjs | Date | undefined) {
    return this.isSame(date) || this.isAfter(date)
}

function useDayjs(
    date?: dayjs.ConfigType | undefined,
    option?: dayjs.OptionType | undefined,
    locale?: string | undefined
) {
    return {
        dayjs,
        current: dayjs(date, option, locale)
    }
}

VV.install('useDayjs', useDayjs)

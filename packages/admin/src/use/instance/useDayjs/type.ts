import * as dayjs from 'dayjs'

export namespace UseDayjs {
    export interface DayjsExtends {
        isSameOrBefore: (date?: string | number | dayjs.Dayjs | Date | undefined) => boolean
        isSameOrAfter: (date?: string | number | dayjs.Dayjs | Date | undefined) => boolean
    }
    export interface ReturnValue {
        dayjs: UseDayjs.dayjs
        current: dayjs.Dayjs & DayjsExtends
    }
    export type dayjs = (
        date?: string | number | dayjs.Dayjs | Date | undefined,
        option?: dayjs.OptionType,
        locale?: string | undefined
    ) => dayjs.Dayjs & DayjsExtends
}

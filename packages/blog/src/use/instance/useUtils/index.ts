import Clipboard from 'clipboard'
import QRCode from './qrcode'
import { md5 } from 'md5js'

function copyText(text: string) {
    const dom = document.createElement('div')
    const clipboard = new Clipboard(dom, {
        text: () => text,
        action: () => 'copy'
    })
    dom.click()
}

function strToUnit(value: string, isRem = false) {
    const numberValue = Number(value)
    if (!isNaN(numberValue)) {
        value = numberValue * (isRem ? 1 : 0.01) + 'rem'
    }
    return value
}

function strAddUnit(value: string, unit = 'px') {
    const numberValue = Number(value)
    if (!isNaN(numberValue)) {
        value = numberValue + unit
    }
    return value
}

function isArray(value: any): value is any[] {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(value)
    }
    return Object.prototype.toString.call(value) === '[object Array]'
}
/**
 * 深度合并对象
 * @param firstObj  被合并的对象
 * @param secondObj 合并进来的对象
 */
function deepObjectMerge(firstObj, secondObj) {
    const merge = (first, second) => {
        for (let key in second) {
            if (first[key] && first[key].toString() === '[object Object]') {
                first[key] = deepObjectMerge(first[key], second[key])
            } else {
                first[key] = second[key]
            }
        }
        return first
    }
    // 目的是为了避免传进来的firstObj被污染
    return merge(JSON.parse(JSON.stringify(firstObj)), secondObj)
}

function compareVersion(v1: string, v2: string) {
    let v1Arr = v1.split('.')
    let v2Arr = v2.split('.')
    const len = Math.max(v1Arr.length, v2Arr.length)

    while (v1Arr.length < len) {
        v1Arr.push('0')
    }
    while (v2Arr.length < len) {
        v2Arr.push('0')
    }

    for (let i = 0; i < len; i++) {
        const num1 = Number(v1Arr[i])
        const num2 = Number(v2Arr[i])

        if (num1 > num2) {
            return 1
        } else if (num1 < num2) {
            return -1
        }
    }

    return 0
}

function useUtils() {
    return {
        copyText,
        strToUnit,
        strAddUnit,
        isArray,
        deepObjectMerge,
        compareVersion,
        QRCode,
        md5
    }
}

export type UseUtilsReturnValue = ReturnType<typeof useUtils>

VV.install('useUtils', useUtils)

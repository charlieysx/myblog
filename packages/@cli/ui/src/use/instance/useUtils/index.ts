import * as Clipboard from 'clipboard'
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

function loadUrlQuery(url?: string): { query: Record<string, any>; hashQuery: Record<string, any> } {
    function getObjFromStr(str: string) {
        return str
            .split('&')
            .map((item) => item.split('='))
            .reduce((pre, cur) => {
                pre[cur[0]] = unescape(decodeURIComponent(cur[1]))
                return pre
            }, {})
    }
    url = url || ''
    const query = {
        query: {},
        hashQuery: {}
    }
    let queryStr = url.split('#')[0].split('?')[1] || ''
    if (queryStr) {
        query.query = getObjFromStr(queryStr)
    }
    queryStr = (url.split('#')[1] || '').split('?')[1] || ''
    if (queryStr) {
        query.hashQuery = getObjFromStr(queryStr)
    }
    return query
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
        loadUrlQuery,
        deepObjectMerge,
        compareVersion,
        QRCode,
        md5
    }
}

export type UseUtilsReturnValue = ReturnType<typeof useUtils>
;(window as any).useUtils = useUtils

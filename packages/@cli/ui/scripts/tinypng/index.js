const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const md5 = require('md5')
const https = require('https')
const { URL } = require('url')

const lockFilePath = 'scripts/tinypng/lock.json'
let lockFileJson = {}
if (fs.existsSync(lockFilePath)) {
    lockFileJson = fs.readFileSync(lockFilePath)
    lockFileJson = JSON.parse(lockFileJson.toString())
}

let filePathList = [] // 待压缩图片路径列表
const imgRootPath = 'src' // 图片根目录
const compressMaxLen = 15 // 压缩并发量(同时压缩图片数量)
const reg = /\.(jpeg|jpg|png)$/ // 只能压缩jpg或png格式图片

function findImg(root) {
    const files = fs.readdirSync(root)
    let list = []
    for (let file of files) {
        const filePath = path.join(root, file)
        const stats = fs.statSync(filePath)
        if (stats.isDirectory()) {
            list = list.concat(findImg(filePath))
        } else if (reg.test(file)) {
            list.push(filePath)
        } else {
            // console.log(chalk.red(`${filePath}不能压缩`));
        }
    }
    return list
}

function compress() {
    return new Promise((resolve, reject) => {
        if (filePathList.length <= 0) {
            resolve(0)
            return
        } else {
            const filePath = filePathList.pop()
            const content = fs.readFileSync(filePath)
            const hash = md5(content)
            if (lockFileJson[filePath] != hash) {
                console.log(chalk.green(`开始压缩图片：${filePath}`))
                fileUpload(filePath).then((res) => {
                    const resultData = fs.readFileSync(filePath)
                    lockFileJson[filePath] = md5(resultData)
                    resolve(1)
                })
            } else {
                // console.log(chalk.green(`图片：${filePath}已压缩过`));
                resolve(1)
            }
        }
    })
}

function filter() {
    console.log(chalk.green('开始筛选图片'))
    filePathList = findImg(imgRootPath)
    console.log(chalk.green(`筛选图片完成，开始压缩图片，并发：${compressMaxLen}`))
    const total = filePathList.length
    let current = 0
    let left = Math.max(total - compressMaxLen, 0)
    const len = Math.min(left + compressMaxLen, compressMaxLen)
    if (len === 0) {
        console.log(chalk.green('没有图片，不需要压缩'))
        return
    }
    function start() {
        compress().then((loadCount) => {
            current += loadCount
            if (current == total) {
                fs.writeFileSync(lockFilePath, JSON.stringify(lockFileJson, null, 4))
                console.log(chalk.green('图片压缩完成'))
                return
            }
            if (loadCount === 1) {
                start()
            }
        })
    }
    for (let i = 0; i < len; ++i) {
        start()
    }
}

function getRandomIP() {
    return Array.from(Array(4))
        .map(() => parseInt(Math.random() * 255))
        .join('.')
}

const cwd = process.cwd()

const options = {
    method: 'POST',
    hostname: 'tinypng.com',
    path: '/web/shrink',
    headers: {
        rejectUnauthorized: false,
        'Postman-Token': Date.now(),
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent':
            'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
    }
}

function fileUpload(img) {
    return new Promise((resolve) => {
        options.headers['X-Forwarded-For'] = getRandomIP()
        var req = https.request(options, function (res) {
            res.on('data', (buf) => {
                let obj = JSON.parse(buf.toString())
                if (obj.error) {
                    console.log(chalk.red(`[${img}]：压缩失败！报错：${obj.message}`))
                } else {
                    fileUpdate(img, obj).then(resolve)
                }
            })
        })

        req.write(fs.readFileSync(img), 'binary')
        req.on('error', (e) => {
            console.error(e)
        })
        req.end()
    })
}

function fileUpdate(img, obj) {
    return new Promise((resolve) => {
        const imgpath = path.join(cwd, img.replace(cwd, ''))

        let options = new URL(obj.output.url)
        let req = https.request(options, (res) => {
            let body = ''
            res.setEncoding('binary')
            res.on('data', function (data) {
                body += data
            })

            res.on('end', function () {
                fs.writeFile(imgpath, body, 'binary', (err) => {
                    if (err) return console.error(err)
                    resolve()
                    console.log(
                        chalk.green(
                            `[${img}] 压缩成功，原始大小[${obj.input.size}]，压缩后大小[${obj.output.size}]，优化比例[${
                                obj.output.ratio * 100
                            }%]`
                        )
                    )
                })
            })
        })
        req.on('error', (e) => {
            console.error(e)
        })
        req.end()
    })
}

filter()

<template>
    <div id="blog-footer">
        <div class="footer-wrap">
            <p>
                本博客已萌萌哒运行
                <span>{{ runningTime }}</span>
                <span class="time-jump">(●'◡'●)ﾉ♥</span>
            </p>
            <p>@{{ $store.common.state.blogInfo?.blogName || '博客' }} ———— {{ $store.common.state.blogInfo?.sign }}</p>
            <p>
                本站点采用
                <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh" target="_blank">
                    知识共享 署名-非商业性使用-禁止演绎 4.0 国际 许可协议
                </a>
            </p>
            <p>本站由 @{{ $store.common.state.blogInfo?.blogName || '博客' }} 创建 - © 2018. 粤ICP备17139665号-1</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const runningTime = ref('')

const { dayjs } = CC.useDayjs()
const startTime = dayjs('2018/08/01 00:00:00')
setInterval(() => {
    const time = dayjs().diff(startTime)
    const day = Math.floor(time / 1000 / 60 / 60 / 24)
    const hour = Math.floor((time / 1000 / 60 / 60) % 24)
    const minute = Math.floor((time / 1000 / 60) % 60)
    const second = Math.floor((time / 1000) % 60)
    runningTime.value = `${day}天${hour}小时${minute}分${second}秒`
}, 1000)
</script>

<style lang="less" scoped>
#blog-footer {
    position: relative;
    height: 120px;
    width: 100%;
    background-color: var(--blog-footer-bg);
    .footer-wrap {
        position: relative;
        max-width: 1000px;
        padding: 0 20px;
        margin: 0 auto;
        height: 120px;
        font-size: 13px;
        @media (max-width: 768px) {
            font-size: 12px;
        }
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #999999;
        > p {
            margin: 4px 0;
            a {
                color: rgba(59, 116, 241, 0.8);
                text-decoration: underline;
            }
        }
    }
}
</style>

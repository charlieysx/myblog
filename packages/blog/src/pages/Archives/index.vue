<template>
    <div class="archives">
        <div class="archives-wrap">
            <div class="time-line"></div>
            <div class="list-content">
                <p class="normal-node">目前共计 {{ total }} 篇文章~</p>
                <div class="bold-node" v-for="(year, key, index) in list" :key="index">
                    <p>{{ key }}</p>
                    <div class="bold-node month" v-for="(month, key, index) in year" :key="index">
                        <p>{{ key }}</p>
                        <article-card v-for="(info, index) in month" :key="index" :info="info" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import articleCard from './articleCard.vue'
export default defineComponent({
    name: 'Archives',
    components: { articleCard },
    setup() {
        const articleStore = CC.useStore('article')
        const list = ref<Record<string, Record<string, Array<{ article: any; category: any; tags: Array<any> }>>>>({})
        const total = ref(0)
        articleStore.getArchives({}).then((res) => {
            total.value = res.count
            list.value = res.list
        })
        return {
            total,
            list
        }
    }
})
</script>

<style lang="less" scoped>
.archives {
    position: relative;
    padding: 30px 10px;
    z-index: 10;
    .pagination {
        width: 100%;
        padding: 10px 0;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        justify-content: center;
        background-color: var(--blog-color-white-1);
    }
    .archives-wrap {
        position: relative;
        width: 100%;
        padding: 10px 30px;
        animation: show 0.8s;
        @media (max-width: 768px) {
            padding: 5px;
        }
        .time-line {
            position: absolute;
            left: 30px;
            @media (max-width: 768px) {
                left: 5px;
            }
            top: 15px;
            bottom: 0;
            width: 2px;
            background-color: var(--blog-color-black-4);
        }
        .list-content {
            .normal-node {
                position: relative;
                color: var(--blog-color-black-2);
                padding: 0 15px;
                font-size: 16px;
                margin-bottom: 20px;
                @media (max-width: 768px) {
                    font-size: 14px;
                }
                &:before {
                    position: absolute;
                    left: -4px;
                    top: 5px;
                    content: '';
                    width: 10px;
                    height: 10px;
                    border-radius: 10px;
                    background-color: var(--blog-color-black-3);
                    @media (max-width: 768px) {
                        left: -3px;
                        top: 4px;
                        width: 8px;
                        height: 8px;
                        border-radius: 8px;
                    }
                }
            }
            .bold-node {
                position: relative;
                color: var(--blog-color-black-2);
                padding: 0 15px;
                font-size: 28px;
                margin-bottom: 20px;
                @media (max-width: 768px) {
                    font-size: 22px;
                }
                &:before {
                    position: absolute;
                    left: -4px;
                    top: 10px;
                    content: '';
                    width: 10px;
                    height: 10px;
                    border-radius: 10px;
                    background-color: var(--blog-color-black-3);
                    @media (max-width: 768px) {
                        left: -3px;
                        top: 8px;
                        width: 8px;
                        height: 8px;
                        border-radius: 8px;
                    }
                }
                > p {
                    margin-bottom: 20px;
                }
                .month {
                    color: var(--blog-color-black-2);
                    font-size: 26px;
                    @media (max-width: 768px) {
                        font-size: 20px;
                    }
                    &:before {
                        left: -19px;
                        @media (max-width: 768px) {
                            left: -18px;
                        }
                    }
                }
            }
        }
    }
}

@keyframes show {
    from {
        margin-top: -10px;
        opacity: 0;
    }
    to {
        margin-top: 0px;
        opacity: 1;
    }
}
</style>

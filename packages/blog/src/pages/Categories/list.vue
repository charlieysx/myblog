<template>
    <div class="categories-list">
        <div class="list-wrap">
            <article-card v-for="(info, index) in state.list" :key="index" :info="info" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import articleCard from '../Archives/articleCard.vue'
export default defineComponent({
    components: { articleCard },
    name: 'List',
    setup() {
        const { routes } = CC.useRouter()
        const state = reactive<{
            type: string
            id: string
            list: any[]
        }>({
            type: '',
            id: '',
            list: []
        })
        const articleStore = CC.useStore('article')
        function initData() {
            if (!routes) {
                return
            }
            state.type = routes.query.type as string
            if (state.type !== 'category' && state.type !== 'tag') {
                state.type = 'category'
            }
            state.id = routes.query.id as string
            state.list = []
            getList()
        }
        watch(() => routes?.query, initData, { immediate: true })

        function getList() {
            articleStore
                .getArticleList({
                    by: state.type,
                    categoryId: state.id,
                    tagId: state.id
                })
                .then((res) => {
                    console.log(res)
                    state.list = res.list
                })
        }

        return {
            state
        }
    }
})
</script>

<style lang="less" scoped>
.categories-list {
    position: relative;
    padding: 30px 10px;
    .list-wrap {
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
            background-color: #eeeeee;
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

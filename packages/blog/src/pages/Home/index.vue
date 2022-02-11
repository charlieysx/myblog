<template>
    <div class="home">
        <article-card v-for="(info, index) in list" :key="index" :info="info" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import articleCard from './articleCard.vue'
export default defineComponent({
    components: { articleCard },
    name: 'Home',
    setup() {
        const articleStore = VV.useStore('article')
        const list = ref<any[]>([])
        articleStore.getArticleList({}).then((res) => {
            console.log(res)
            list.value = res.list
        })
        return {
            list
        }
    }
})
</script>

<style lang="less" scoped>
.home {
    position: relative;
    padding: 30px 10px;
    padding-top: 0;
    min-height: 100px;
}
</style>

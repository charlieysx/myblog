<template>
    <div class="page-layout-container">
        <a-spin :loading="loading" :style="{ width: isDialog ? '80vw' : '100%' }">
            <a-card :bordered="false">
                <a-typography-title :heading="6" style="margin-bottom: 20px">活动模板</a-typography-title>
                <a-row :gutter="24" :class="isDialog ? 'scroll-card' : ''">
                    <a-col
                        v-for="item in $store.template.state.list"
                        :key="item.activityId"
                        style="margin-bottom: 20px"
                        :xs="12"
                        :sm="12"
                        :md="12"
                        :lg="8"
                        :xl="6"
                        :xxl="4"
                    >
                        <a-card hoverable>
                            <template #actions>
                                <a-button
                                    size="small"
                                    type="primary"
                                    shape="round"
                                    @click="createActivity(item.activityId)"
                                >
                                    立即创建
                                </a-button>
                            </template>
                            <template #cover>
                                <div
                                    :style="{
                                        width: '100%;',
                                        paddingTop: '60.86956522%',
                                        backgroundImage: `url(${item.themeBanner})`,
                                        backgroundSize: 'cover'
                                    }"
                                ></div>
                            </template>
                            <a-card-meta :title="item.themeTitle" :description="item.themeDescription"></a-card-meta>
                        </a-card>
                    </a-col>
                </a-row>
            </a-card>
        </a-spin>
    </div>
</template>

<script lang="ts">
import { Message } from '@arco-design/web-vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: 'ActivityTemplate',
    props: {
        isDialog: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const loading = ref(true)
        const templateStore = VV.useStore('template')
        templateStore
            .loadAllTheme()
            .then((res) => {
                loading.value = false
            })
            .catch((err) => {
                Message.error(err.msg || '加载失败')
            })

        function createActivity(activityId: string) {
            loading.value = true
            templateStore
                .createActivity(activityId)
                .catch((err) => {
                    Message.error(err.msg || '创建失败')
                })
                .finally(() => {
                    loading.value = false
                })
        }

        return {
            loading,
            createActivity
        }
    }
})
</script>

<style lang="less">
.scroll-card {
    height: 80vh;
    overflow: scroll;
}
</style>

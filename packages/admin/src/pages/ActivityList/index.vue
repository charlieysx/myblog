<template>
    <div class="page-layout-container">
        <a-spin :loading="$store.activity.state.activityList.loading" style="width: 100%">
            <a-card :bordered="false">
                <a-typography-title :heading="6" style="margin-bottom: 20px">活动列表</a-typography-title>
                <a-space style="margin-bottom: 12px">
                    <a-button type="primary" @click="createActivity">
                        <template #icon>
                            <icon-plus />
                        </template>
                        创建活动
                    </a-button>
                    <a-button @click="refresh">
                        <template #icon>
                            <icon-refresh />
                        </template>
                        刷新
                    </a-button>
                </a-space>
                <a-table
                    :data="$store.activity.state.activityList.list"
                    stripe
                    :scroll="{ x: 1350 }"
                    :pagination="{
                        total: $store.activity.state.activityList.total,
                        current: $store.activity.state.activityList.pageOrder,
                        pageSize: $store.activity.state.activityList.pageNum,
                        showTotal: true,
                        hideOnSinglePage: true
                    }"
                    @pageChange="changePage"
                >
                    <template #columns>
                        <a-table-column fixed="left" title="id" :width="80" data-index="id"></a-table-column>
                        <a-table-column title="活动名称" data-index="name"></a-table-column>
                        <a-table-column title="活动类型" :width="100">
                            <template #cell="{ record }">
                                {{ urlKeyMap[record.urlKey] || record.urlKey }}
                            </template>
                        </a-table-column>
                        <a-table-column title="活动时间" :width="330">
                            <template #cell="{ record }">
                                {{ record.startTime }}
                                -
                                {{ record.endTime }}
                            </template>
                        </a-table-column>
                        <a-table-column title="更新时间" data-index="updateAt" :width="170"></a-table-column>
                        <a-table-column title="创建者" data-index="adminUserName" :width="120"></a-table-column>
                        <a-table-column title="状态" :width="110">
                            <template #cell="{ record }">
                                <a-tag :color="statusColorMap[record.status]">
                                    {{ statusMap[record.status] || record.status }}
                                </a-tag>
                            </template>
                        </a-table-column>
                        <a-table-column title="操作" fixed="right" :width="180" align="center">
                            <template #cell="{ record }">
                                <a-space wrap>
                                    <a-link
                                        size="mini"
                                        status="normal"
                                        v-if="roles.includes('0004')"
                                        @click="toWorkbench(record)"
                                    >
                                        查看
                                    </a-link>
                                    <a-link
                                        size="mini"
                                        status="normal"
                                        v-if="roles.includes('0002')"
                                        @click="toWorkbench(record)"
                                    >
                                        发布
                                    </a-link>
                                    <a-link
                                        size="mini"
                                        status="normal"
                                        v-if="roles.includes('0001')"
                                        @click="toWorkbench(record)"
                                    >
                                        编辑
                                    </a-link>
                                    <a-link size="mini" status="normal" @click="preview(record)">预览</a-link>
                                    <a-link size="mini" status="normal" @click="copyUrl(record)">复制地址</a-link>
                                    <a-link
                                        size="mini"
                                        status="normal"
                                        v-if="roles.includes('0001')"
                                        @click="copyActivity(record)"
                                    >
                                        复制活动
                                    </a-link>
                                    <a-link
                                        size="mini"
                                        status="danger"
                                        v-if="roles.includes('0001')"
                                        @click="deleteActivity(record)"
                                    >
                                        删除
                                    </a-link>
                                    <a-link
                                        size="mini"
                                        status="danger"
                                        v-if="roles.includes('0001') && record.status === 'publish'"
                                        @click="underActivity(record)"
                                    >
                                        下架
                                    </a-link>
                                </a-space>
                            </template>
                        </a-table-column>
                    </template>
                </a-table>
            </a-card>
        </a-spin>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { ActivityStore } from '/@store/instance/activity/type'
import ActivityTemplate from '/@pages/ActivityTemplate/index.vue'
import PreviewH5 from './PreviewH5/index.vue'
import { Message, Modal } from '@arco-design/web-vue'

export default defineComponent({
    name: 'ActivityList',
    useDialogs: {
        ActivityTemplate,
        PreviewH5
    },
    setup() {
        const Dialog = VV.useDialog()
        const commonStore = VV.useStore('common')
        const templateStore = VV.useStore('template')
        const activityStore = VV.useStore('activity')
        activityStore.loadList()

        function changePage(current: number) {
            activityStore.state.activityList.pageOrder = current
            activityStore.loadList()
        }

        function refresh() {
            activityStore.state.activityList.pageOrder = 1
            activityStore.loadList()
        }

        return {
            changePage,
            urlKeyMap: ActivityStore.urlKey,
            statusMap: ActivityStore.status,
            statusColorMap: ActivityStore.statusColor,
            roles: computed(() => commonStore.state.userInfo?.role || []),
            refresh,
            createActivity() {
                Dialog.get('ActivityTemplate').show({
                    isDialog: true
                })
            },
            preview(activity: ActivityStore.Activity) {
                Dialog.get('PreviewH5').show({
                    url: activity.url,
                    title: activity.name
                })
            },
            copyUrl(activity: ActivityStore.Activity) {
                const { copyText } = VV.useUtils()
                copyText(activity.url)
                Message.success('已复制')
            },
            toWorkbench(activity: ActivityStore.Activity) {
                activityStore.toWorkbench(activity.id)
            },
            copyActivity(activity: ActivityStore.Activity) {
                activityStore.state.activityList.loading = true
                templateStore
                    .createActivity(activity.id)
                    .then((res) => {
                        Message.success('创建成功')
                        refresh()
                    })
                    .catch((err) => {
                        Message.error(err?.msg || '复制失败')
                        activityStore.state.activityList.loading = false
                    })
            },
            deleteActivity(activity: ActivityStore.Activity) {
                if (activity.status === 'publish') {
                    Message.error('很抱歉，已发布的活动暂不支持删除，请先下架活动。')
                    return
                }
                Modal.warning({
                    title: '提示',
                    content: '是否删除活动？此操作将永久删除该活动, 删除后不可恢复。',
                    onOk: async () => {
                        activityStore.state.activityList.loading = true
                        activityStore
                            .deleteActivity(activity.id)
                            .then((res) => {
                                Message.success('删除成功')
                                refresh()
                            })
                            .catch((err) => {
                                Message.error(err?.msg || '删除失败')
                                activityStore.state.activityList.loading = false
                            })
                    }
                })
            },
            underActivity(activity: ActivityStore.Activity) {
                Modal.warning({
                    title: '提示',
                    content: '是否下架活动？下架后用户将无法继续体验活动，需要重新提交发布。',
                    onOk: async () => {
                        activityStore.state.activityList.loading = true
                        activityStore
                            .underActivity(activity.id)
                            .then((res) => {
                                Message.success('下架成功')
                                refresh()
                            })
                            .catch((err) => {
                                Message.error(err?.msg || '下架失败')
                                activityStore.state.activityList.loading = false
                            })
                    }
                })
            }
        }
    }
})
</script>

<style lang="less"></style>

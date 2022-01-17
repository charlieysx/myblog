<template>
    <router-view v-if="state.isLogin" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: '',
    setup() {
        const commonStore = VV.useStore('common')
        const { router } = VV.useRouter()

        commonStore.checkLogin().catch((err) => {
            router.replace({
                path: '/user/login',
                query: {
                    redirect: router.currentRoute.value.path || '/',
                    ...router.currentRoute.value.query
                }
            })
        })

        return {
            state: commonStore.state
        }
    }
})
</script>

<style lang="less"></style>

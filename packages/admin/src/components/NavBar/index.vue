<template>
    <div class="navbar">
        <div class="left">
            <a-space class="logo" :size="8" @click="toHome">
                <img src="/@imgs/logo.png" />
                <a-typography-title :style="{ margin: 0, fontSize: 18 }" :heading="5">营销平台</a-typography-title>
            </a-space>
        </div>
        <ul class="right">
            <li>
                <a-tooltip :content="theme === 'light' ? '点击切换为暗黑模式' : '点击切换为亮色模式'">
                    <a-button type="text" @click="change" style="font-size: 20px">
                        <template #icon>
                            <icon-moon-fill v-if="theme === 'light'" />
                            <icon-sun-fill v-else />
                        </template>
                    </a-button>
                </a-tooltip>
            </li>
            <li v-if="$store.common.state.userInfo">
                <a-dropdown>
                    <a-typography class="navbar-username">{{ $store.common.state.userInfo.name }}</a-typography>
                    <template #content>
                        <a-doption @click="logout">退出</a-doption>
                    </template>
                </a-dropdown>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'NavBar',
    setup() {
        const { load, save } = VV.useStorage()
        const defaultTheme = load('theme', 'light')
        const theme = ref(defaultTheme)
        function changeTheme() {
            if (theme.value === 'dark') {
                document.body.setAttribute('arco-theme', 'dark')
            } else {
                document.body.removeAttribute('arco-theme')
            }
        }
        changeTheme()

        const { router } = VV.useRouter()

        return {
            theme,
            change() {
                theme.value = theme.value === 'light' ? 'dark' : 'light'
                save('theme', theme.value)
                changeTheme()
            },
            toHome() {
                router.push('/')
            },
            logout() {
                const commonStore = VV.useStore('common')
                commonStore.logout()
            }
        }
    }
})
</script>

<style lang="less" scoped>
.logo {
    cursor: pointer;
    img {
        width: 50px;
    }
}
.navbar-username {
    cursor: pointer;
}

.navbar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-border);
    box-sizing: border-box;
    background-color: var(--color-bg-2);
    height: 100%;
}

.left {
    display: flex;
    align-items: center;
    padding-left: 20px;
}

.right {
    display: flex;
    list-style: none;
    padding-right: 20px;

    li {
        padding: 0 10px;
        display: flex;
        align-items: center;
    }

    a {
        text-decoration: none;
        color: var(--color-text-1);
    }
}
</style>

<template>
    <div class="friends">
        <div class="type-wrap" v-for="(item, index) in list" :key="index">
            <p>{{ item.name }}</p>
            <div class="friends-wrap">
                <a v-for="(friend, index) in item.list" :key="index" :href="friend.url" target="_blank">
                    {{ friend.name }}
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name: 'Friends',
    setup() {
        const friendStore = VV.useStore('friend')
        const list = ref<
            Array<
                Record<string, any> & {
                    list: any[]
                }
            >
        >([])
        friendStore.getFriendList({}).then((res) => {
            console.log(res)
            list.value = res
        })
        return {
            list
        }
    }
})
</script>

<style lang="less" scoped>
@import '/@styles/less/g-mixin.less';

.friends {
    position: relative;
    padding: 30px 10px;
    max-width: 940px;
    margin: 0 auto;
    animation: show 0.8s;
    .type-wrap {
        > p {
            border-left: 4px solid var(--color-text-3);
            color: var(--color-text-1);
            padding: 5px 10px;
            font-weight: bold;
            font-size: 16px;
        }
        .friends-wrap {
            padding: 10px;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            font-size: 14px;
            a {
                color: var(--color-bg-1);
                padding: 5px 10px;
                background-color: var(--color-text-1);
                border-radius: 5px;
                margin: 5px;
                transition: background-color 0.3s;
                text-decoration: none;
                &:hover {
                    background-color: var(--color-text-3);
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

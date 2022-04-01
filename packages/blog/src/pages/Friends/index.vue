<template>
    <div class="friends">
        <div v-for="(item, index) in list" :key="index" class="type-wrap">
            <p>{{ item.name }}</p>
            <div class="friends-wrap">
                <a v-for="friend in item.list" :key="friend.name" :href="friend.url" target="_blank">
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
        const friendStore = CC.useStore('friend')
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
.friends {
    position: relative;
    padding: 30px 10px;
    max-width: 940px;
    margin: 0 auto;
    animation: show 0.8s;
    .type-wrap {
        > p {
            border-left: 4px solid var(--blog-color-black-3);
            color: var(--blog-color-black-1);
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
                color: var(--blog-color-white-1);
                padding: 5px 10px;
                background-color: var(--blog-color-black-1);
                border-radius: 5px;
                margin: 5px;
                transition: background-color 0.3s;
                text-decoration: none;
                &:hover {
                    background-color: var(--blog-color-black-3);
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

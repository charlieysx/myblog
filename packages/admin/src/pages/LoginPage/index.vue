<template>
    <div class="auth-container">
        <a-card :bordered="false">
            <div class="login-form-wrapper">
                <div class="login-form-title">登录营销平台</div>
                <a-form
                    :model="formData"
                    style="width: 320px"
                    class="login-form"
                    layout="vertical"
                    ref="formRef"
                    @submit-success="handleSubmit"
                >
                    <a-form-item field="name" :rules="[{ required: true, message: '用户名不能为空' }]" hide-label>
                        <a-input v-model="formData.name" placeholder="用户名">
                            <template #prefix>
                                <icon-user />
                            </template>
                        </a-input>
                    </a-form-item>
                    <a-form-item field="password" :rules="[{ required: true, message: '密码不能为空' }]" hide-label>
                        <a-input-password v-model="formData.password" allow-clear placeholder="密码">
                            <template #prefix>
                                <icon-lock />
                            </template>
                        </a-input-password>
                    </a-form-item>
                    <a-space :size="16" direction="vertical">
                        <!-- <div class="login-form-password-actions">
                            <a-checkbox v-model="rememberPassword" @change="setRememberPassword">记住密码</a-checkbox>
                        </div> -->
                        <a-button long type="primary" :loading="loading" html-type="submit">登录</a-button>
                    </a-space>
                </a-form>
            </div>
        </a-card>
    </div>
</template>

<script lang="ts">
import { Message } from '@arco-design/web-vue'
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
    name: 'LoginPage',
    setup() {
        const loading = ref(false)
        const rememberPassword = ref(VV.useStorage().load('rememberPassword', false))
        const formData = reactive({
            name: '',
            password: ''
        })
        const { router } = VV.useRouter()
        function handleSubmit() {
            loading.value = true
            VV.useStore('common')
                .login(formData.name, formData.password)
                .then((res) => {
                    Message.success('登录成功')
                    const { redirect, ...query } = router.currentRoute.value.query
                    router.replace({
                        path: (redirect as string) || '/',
                        query: {
                            ...query
                        }
                    })
                })
                .catch((err) => {
                    Message.error('登录失败')
                })
                .finally(() => {
                    loading.value = false
                })
        }

        return {
            rememberPassword,
            loading,
            formData,
            handleSubmit,
            setRememberPassword() {
                VV.useStorage().save('rememberPassword', rememberPassword.value)
            }
        }
    }
})
</script>

<style lang="less" scoped>
@import '/@styles/less/g-mixin.less';
.auth-container {
    position: relative;
    background-color: var(--color-bg-1);
    height: 100vh;
    width: 100vw;
    .flex();
}

.login-form {
    &-wrapper {
        width: 320px;
    }

    &-title {
        font-size: 24px;
        font-weight: 500;
        color: var(--color-text-1);
        line-height: 32px;
        margin-bottom: 16px;
    }

    &-sub-title {
        font-size: 16px;
        line-height: 24px;
        color: var(--color-text-3);
    }

    &-error-msg {
        height: 32px;
        line-height: 32px;
        color: rgb(var(--red-6));
    }

    &-password-actions {
        display: flex;
        justify-content: flex-end;
    }
}
</style>

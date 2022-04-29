<template>
    <div class="page-more">
        <div class="search-input-wrap">
            <input
                v-model="searchValue"
                placeholder="输入关键字搜索..."
                class="search-real-input"
                @keydown="toSearch"
            />
        </div>
        <div v-show="showEditor" class="tinymce-editor">
            <textarea id="mytextarea">Hello, World!</textarea>
        </div>
    </div>
</template>

<script lang="ts">
import Jwt from './jwt.vue'

export default {
    useDialogs: {
        Jwt: {
            component: Jwt,
            opts: {
                maskClose: false
            }
        }
    }
}
</script>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const searchValue = ref('')
const showEditor = ref(false)

const editors: any = []

onMounted(async () => {
    const store = CC.useStore('common')
    const useDarkMode = store.state.theme === 'dark'
    const [editor] = await tinymce.init({
        selector: '#mytextarea',
        plugins:
            'preview code importcss autolink image link table advlist lists imagetools charmap quickbars emoticons',
        menubar: 'view insert format table',
        toolbar:
            'undo redo | blocks | fontsizeselect formatselect | bold italic underline strikethrough forecolor backcolor casechange permanentpe | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist checklist| image',
        language: 'zh_CN',
        quickbars_insert_toolbar: 'quicktable image',
        quickbars_selection_toolbar: 'bold italic underline | blocks | bullist numlist | blockquote quicklink',
        contextmenu: 'undo redo | inserttable | cell row column deletetable',
        content_style: '* {padding: 0;margin: 0;} table {width: 100% !important;margin: 0 !important;}',
        table_default_styles: {
            width: '100%'
        },
        // table_border_styles: [
        //     { title: 'Solid', value: 'solid' },
        //     { title: 'Dotted', value: 'dotted' },
        //     { title: 'Dashed', value: 'dashed' }
        // ],
        // table_class_list: [
        //     { title: 'None', value: '' },
        //     { title: 'No Borders', value: 'table_no_borders' },
        //     {
        //         title: 'Borders',
        //         menu: [
        //             { title: 'Red borders', value: 'table_red_borders' },
        //             { title: 'Blue borders', value: 'table_blue_borders' },
        //             { title: 'Green borders', value: 'table_green_borders' }
        //         ]
        //     }
        // ],
        image_title: false,
        file_picker_types: 'image',
        // width: 375,
        height: 603,
        toolbar_mode: 'sliding',
        skin: useDarkMode ? 'oxide-dark' : 'oxide',
        content_css: useDarkMode ? 'dark' : 'default',
        images_upload_handler: async function (blobInfo, progress) {
            return 'http://blogimg.codebear.cn/FtLTVIWy0JwnwVEGPTvLkkRGcVPA'
        }
    })
    editors.push(editor)
})

onUnmounted(() => {
    editors.forEach((editor) => {
        editor.destroy()
    })
})

const Dialog = CC.useDialog()

function toSearch(event) {
    if (event.keyCode !== 13) {
        return
    }
    showEditor.value = false
    switch (searchValue.value) {
        case '富文本':
            showEditor.value = true
            break
        case 'jwt':
            Dialog.get('Jwt').show()
            break
        default:
            break
    }
}
toSearch({ keyCode: 13 })
</script>

<style lang="less" scoped>
.page-more {
    position: relative;
    padding: 30px 10px;
    padding-top: 0;
    z-index: 10;
    > .search-input-wrap {
        width: 100%;
        max-width: 900px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid var(--blog-more-input-border);
        .search-real-input {
            width: 100%;
            height: 28px;
            padding: 5px 10px;
            border-radius: 5px;
            border: none;
            font-size: 14px;
            color: var(--blog-more-input-color);
            background-color: var(--blog-more-input-bg);
            &:active,
            &:focus-visible {
                outline: none;
            }
            &::placeholder {
                color: #555555;
            }
        }
    }
    > .btn-wrap {
        .flex();
        margin-top: 12px;
        > .app-btn {
            position: relative;
            padding: 5px 10px;
            margin: 5px;
            border: 1px solid var(--blog-color-black-4);
            background-color: var(--blog-color-black-1);
            border-radius: 5px;
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            color: var(--blog-color-white-1);
            transition: all 0.3s;
            font-size: 16px;
            @media (max-width: 768px) {
                font-size: 14px;
            }
            &:hover {
                background-color: var(--blog-color-black-4);
                color: var(--blog-color-white-1);
            }
        }
    }

    > .tinymce-editor {
        .center-row('r');
        margin-top: 24px;
        .wh(500px, 1206px);
    }
}
</style>

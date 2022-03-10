<template>
    <div class="md-preview" ref="container">
        <link href="//cdn.bootcss.com/github-markdown-css/2.4.1/github-markdown.css" rel="stylesheet" />
        <section id="markdown-preview-body" class="preview markdown-body" v-html="content"></section>
    </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import hljs from 'highlight.js'

export default defineComponent({
    name: 'MDPreview',
    props: {
        content: {
            type: String,
            default: '',
            required: true
        }
    },
    setup(props) {
        const { parseArticleDirectory, clearArticleDirectory } = CC.useStore('common')
        const container = ref<HTMLElement>()

        function init() {
            CC.useUtils().scrollToTarget(0, false)
            parseArticleDirectory()
            nextTick(async () => {
                let blocks = container.value?.querySelectorAll('pre code') as unknown as HTMLElement[]
                blocks?.forEach(async (block) => {
                    setTimeout(() => {
                        hljs.highlightElement(block)
                    }, 0)
                })
            })
        }

        watch(
            () => props.content,
            () => {
                nextTick(init)
            },
            { immediate: true }
        )

        onUnmounted(() => {
            clearArticleDirectory()
        })

        return {
            container
        }
    }
})
</script>

<style lang="less">
pre code.hljs {
    display: block;
    overflow-x: auto;
    padding: 1em;
}

code.hljs {
    padding: 3px 5px;
}

.hljs {
    color: #24292e;
    background: #fff;
}

.hljs-doctag,
.hljs-keyword,
.hljs-meta .hljs-keyword,
.hljs-template-tag,
.hljs-template-variable,
.hljs-type,
.hljs-variable.language_ {
    color: #d73a49;
}

.hljs-title,
.hljs-title.class_,
.hljs-title.class_.inherited__,
.hljs-title.function_ {
    color: #6f42c1;
}

.hljs-attr,
.hljs-attribute,
.hljs-literal,
.hljs-meta,
.hljs-number,
.hljs-operator,
.hljs-selector-attr,
.hljs-selector-class,
.hljs-selector-id,
.hljs-variable {
    color: #005cc5;
}

.hljs-meta .hljs-string,
.hljs-regexp,
.hljs-string {
    color: #032f62;
}

.hljs-built_in,
.hljs-symbol {
    color: #e36209;
}

.hljs-code,
.hljs-comment,
.hljs-formula {
    color: #6a737d;
}

.hljs-name,
.hljs-quote,
.hljs-selector-pseudo,
.hljs-selector-tag {
    color: #22863a;
}

.hljs-subst {
    color: #24292e;
}

.hljs-section {
    color: #005cc5;
    font-weight: 700;
}

.hljs-bullet {
    color: #735c0f;
}

.hljs-emphasis {
    color: #24292e;
    font-style: italic;
}

.hljs-strong {
    color: #24292e;
    font-weight: 700;
}

.hljs-addition {
    color: #22863a;
    background-color: #f0fff4;
}

.hljs-deletion {
    color: #b31d28;
    background-color: #ffeef0;
}
</style>

<style lang="less">
body[arco-theme='dark'] {
    pre {
        padding: 1px !important;
        background-color: #333333 !important;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: var(--blog-color-black-1);
    }
    pre code.hljs {
        display: block;
        overflow-x: auto;
        padding: 1em;
    }

    code.hljs {
        padding: 3px 5px;
    }
    .hljs {
        color: #c9d1d9;
        background: #0d1117;
    }

    .hljs-doctag,
    .hljs-keyword,
    .hljs-meta .hljs-keyword,
    .hljs-template-tag,
    .hljs-template-variable,
    .hljs-type,
    .hljs-variable.language_ {
        color: #ff7b72;
    }

    .hljs-title,
    .hljs-title.class_,
    .hljs-title.class_.inherited__,
    .hljs-title.function_ {
        color: #d2a8ff;
    }

    .hljs-attr,
    .hljs-attribute,
    .hljs-literal,
    .hljs-meta,
    .hljs-number,
    .hljs-operator,
    .hljs-selector-attr,
    .hljs-selector-class,
    .hljs-selector-id,
    .hljs-variable {
        color: #79c0ff;
    }

    .hljs-meta .hljs-string,
    .hljs-regexp,
    .hljs-string {
        color: #a5d6ff;
    }

    .hljs-built_in,
    .hljs-symbol {
        color: #ffa657;
    }

    .hljs-code,
    .hljs-comment,
    .hljs-formula {
        color: #8b949e;
    }

    .hljs-name,
    .hljs-quote,
    .hljs-selector-pseudo,
    .hljs-selector-tag {
        color: #7ee787;
    }

    .hljs-subst {
        color: #c9d1d9;
    }

    .hljs-section {
        color: #1f6feb;
        font-weight: 700;
    }

    .hljs-bullet {
        color: #f2cc60;
    }

    .hljs-emphasis {
        color: #c9d1d9;
        font-style: italic;
    }

    .hljs-strong {
        color: #c9d1d9;
        font-weight: 700;
    }

    .hljs-addition {
        color: #aff5b4;
        background-color: #033a16;
    }

    .hljs-deletion {
        color: #ffdcd7;
        background-color: #67060c;
    }
}
</style>

<style lang="less">
body[arco-theme='dark'] {
    .markdown-body {
        blockquote {
            color: #aaa;
            font-weight: bold;
        }
    }
}
.markdown-body {
    color: var(--blog-color-black-2) !important;
    @media (max-width: 768px) {
        font-size: 12px !important;
    }
    blockquote {
        color: #777;
    }
    h2 {
        .p-r();
        border: none !important;
        &:after {
            .p-a();
            content: '';
            width: 100%;
            height: 1px;
            transform: scaleY(0.3);
            background-color: var(--blog-color-black-3);
            left: 0;
            bottom: 0;
        }
    }
    img {
        max-width: calc(100% - 10px) !important;
        padding: 4px;
        background-color: var(--blog-color-white-1) !important;
        border: 1px solid var(--blog-color-black-4) !important;
        cursor: zoom-in;
    }
    li {
        list-style: disc;
        li {
            list-style: circle;
        }
    }
}
</style>
<style lang="less" scoped>
.md-preview {
    position: relative;
    width: 100%;
    margin-top: 10px;
}
</style>

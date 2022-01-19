<template>
    <div class="content">
        <div class="terminal-view card">
            <div class="pane-toolbar">
                <el-icon>
                    <message-box />
                </el-icon>
                <div class="title">{{ title }}</div>
                <slot />
                <el-tooltip content="清空日志" placement="top" effect="light">
                    <el-icon class="btn" @click="clear">
                        <delete />
                    </el-icon>
                </el-tooltip>
                <el-tooltip content="至底部" placement="top" effect="light">
                    <el-icon class="btn" @click="scrollToBottom">
                        <caret-bottom />
                    </el-icon>
                </el-tooltip>
            </div>

            <div class="view">
                <div ref="render" class="xterm-render" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, watchEffect, onMounted, nextTick, onUnmounted, getCurrentInstance } from 'vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import { MessageBox, Delete, CaretBottom } from '@element-plus/icons'
import useWindowReszie from '@/use/instance/useWindowReszie'

const defaultTheme = {
    foreground: '#2c3e50',
    background: '#fff',
    cursor: 'rgba(0, 0, 0, .4)',
    selection: 'rgba(0, 0, 0, 0.3)',
    black: '#000000',
    red: '#e83030',
    brightRed: '#e83030',
    green: '#42b983',
    brightGreen: '#42b983',
    brightYellow: '#ea6e00',
    yellow: '#ea6e00',
    magenta: '#e83030',
    brightMagenta: '#e83030',
    cyan: '#03c2e6',
    brightBlue: '#03c2e6',
    brightCyan: '#03c2e6',
    blue: '#03c2e6',
    white: '#d0d0d0',
    brightBlack: '#808080',
    brightWhite: '#ffffff'
}

const darkTheme = {
    ...defaultTheme,
    foreground: '#fff',
    background: '#1d2935',
    cursor: 'rgba(255, 255, 255, .4)',
    selection: 'rgba(255, 255, 255, 0.3)',
    magenta: '#e83030',
    brightMagenta: '#e83030'
}

export default defineComponent({
    name: 'TerminalView',
    components: {
        MessageBox,
        Delete,
        CaretBottom
    },
    props: {
        cols: {
            type: Number,
            required: true
        },

        rows: {
            type: Number,
            required: true
        },

        content: {
            type: String,
            default: undefined
        },

        autoSize: {
            type: Boolean,
            default: false
        },

        options: {
            type: Object,
            default: () => ({})
        },

        toolbar: {
            type: Boolean,
            default: false
        },

        title: {
            type: String,
            default: null
        },

        openLinks: {
            type: Boolean,
            default: false
        }
    },
    emits: ['blur', 'focus', 'link', 'clear'],
    setup(props, ctx) {
        let terminal: Terminal
        let fitAddon: FitAddon
        watchEffect(() => {
            terminal?.resize(props.cols, props.rows)
        })
        watch(
            () => props.content,
            () => {
                setContent(props.content)
            }
        )

        const render = ref(null)
        function handleLink(event, uri) {
            if (props.openLinks) {
                window.open(uri, '_blank')
            }
            ctx.emit('link', uri)
        }

        async function fit() {
            const term = terminal
            term.element.style.display = 'none'
            await nextTick()
            fitAddon.fit()
            term.element.style.display = ''
            term.refresh(0, term.rows - 1)
        }

        async function initTerminal() {
            terminal = new Terminal({
                cols: props.cols,
                rows: props.rows,
                theme: darkTheme,
                ...props.options
            })

            const webLinksAddon = new WebLinksAddon(handleLink)

            fitAddon = new FitAddon()

            terminal.loadAddon(fitAddon)
            terminal.loadAddon(webLinksAddon)

            terminal.open(render.value)

            terminal.element.addEventListener('blur', () => ctx.emit('blur'))
            terminal.element.addEventListener('focus', () => ctx.emit('focus'))

            terminal.element.style.display = 'none'

            await nextTick()
            // 适应宽高变化
            fit()
        }

        onMounted(() => {
            initTerminal()
        })
        // 监听窗口大小，适应宽高变化
        useWindowReszie(() => {
            fit()
        })

        onUnmounted(() => {
            terminal.dispose()
        })

        function setContent(value: string, ln = true) {
            value = `${value}`
            if (value.indexOf('\n') !== -1) {
                value.split('\n').forEach((t) => setContent(t))
                return
            }
            if (typeof value === 'string') {
                terminal?.[ln ? 'writeln' : 'write'](value)
            } else {
                terminal?.writeln('')
            }
        }

        function addLog(value: string) {
            setContent(value)
        }
        function addLogList(list: string[]) {
            list.forEach((value) => setContent(value))
        }

        function clear() {
            terminal?.clear()
            ctx.emit('clear')
        }

        function scrollToBottom() {
            terminal?.scrollToBottom()
        }

        return {
            render,
            clear,
            scrollToBottom,
            addLog,
            addLogList,
            fit
        }
    }
})
</script>
<style lang="less">
@import '~xterm/css/xterm.css';
.terminal-view {
    > .pane-toolbar {
        .el-icon {
            margin-right: 6px;
            font-size: 18px;
            &.btn {
                cursor: pointer;
                padding: 6px;
                transition: background-color 0.3s;
                border-radius: 2px;
                &:hover {
                    background-color: #4e6e8e;
                }
            }
        }
    }
}
</style>

<style lang="less" scoped>
.content {
    flex: auto 1 1;
    height: 100%;
    position: relative;
}
.terminal-view {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    background: #1d2935;
    .view {
        flex: 100% 1 1;
        height: 0;
        position: relative;
        padding-left: 16px;
        .xterm-render {
            width: 100%;
            height: 100%;
            .xterm {
                .xterm-cursor-layer {
                    display: none;
                }
            }
        }
    }
}

.pane-toolbar {
    display: flex;
    align-items: center;
    padding: 16px;
    flex: auto 0 0;
    .title {
        flex: 100% 1 1;
        width: 0;
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 6px;
        text-align: left;
    }
}
</style>

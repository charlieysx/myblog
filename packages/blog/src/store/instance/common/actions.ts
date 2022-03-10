import state from './state'
import * as api from './api'
import { CommonStore } from './type'
import { nextTick } from 'vue'

const initTheme = () => {
    const { load } = CC.useStorage()
    state.theme = load<CommonStore.BlogTheme>('theme', CommonStore.BlogTheme.light)
    document.body.setAttribute('arco-theme', state.theme)
}

function changeTheme() {
    const { save } = CC.useStorage()
    state.theme = state.theme === CommonStore.BlogTheme.light ? CommonStore.BlogTheme.dark : CommonStore.BlogTheme.light
    save('theme', state.theme)
    document.body.setAttribute('arco-theme', state.theme)
}

const initBlogInfo = async () => {
    const res = await api.getBlogInfo().catch(() => {})
    if (res?.data) {
        Object.assign(state.blogInfo, res.data)
    }
}

const getAboutMe = async () => {
    const res = await api.getAboutMe().catch(() => {})
    return res?.data || {}
}

const getResume = async () => {
    const res = await api.getResume().catch(() => {})
    return res?.data || {}
}

function treeify(data: CommonStore.ArticleDirectoryTag[], tag: string) {
    let tree: CommonStore.ArticleDirectoryTag[] = []
    let index = 0
    data.forEach((item) => {
        item.children = []
        let len = tree.length
        if (len === 0) {
            item.tag = tag + ++index + '.'
            tree.push(item) // 第一个元素，直接放进tree
        } else {
            let last = tree[len - 1]
            if (item.index <= last.index) {
                // 如果index比tree最后一个的index小或等于，说明是同级存进去
                item.tag = tag + ++index + '.'
                tree.push(item)
            } else {
                last.children?.push(item) // 否则存进最后一个元素的children
            }
        }
    })
    // 因为上面一层循环，只能处理两层，所以需要遍历孩子节点，出现index不一样的说明不是同级，需要对孩子节点再递归调用生成
    tree.forEach((item) => {
        let children = item.children
        let ids: number[] = []
        index = 0
        // 判断是否存在index不一样的
        children?.forEach((child) => {
            child.tag = item.tag + ++index + '.'
            if (ids.indexOf(child.index) === -1) {
                ids.push(child.index)
            }
        })
        if (ids.length > 1) {
            // ids的元素大于1说明存在，需要再递归孩子节点
            item.children = treeify(children, item.tag)
        }
    })
    return tree
}

const showRightNav = () => {
    state.rightNav.show = true
}

const hideRightNav = () => {
    state.rightNav.show = false
}

const clearArticleDirectory = () => {
    state.rightNav.articleDirectory.show = false
    state.rightNav.articleDirectory.list = []
    state.rightNav.articleDirectory.source = []
}

const parseArticleDirectory = async () => {
    const articleDirectory = state.rightNav.articleDirectory
    articleDirectory.loading = true
    articleDirectory.show = true
    showRightNav()

    async function start() {
        let headNodes = document.getElementById('markdown-preview-body')?.getElementsByClassName('my-blog-head') || []
        let headList: CommonStore.ArticleDirectoryTag[] = []
        for (let i = 0; i < headNodes.length; ++i) {
            const item = headNodes[i] as HTMLElement
            headList.push({
                id: item.id,
                index: Number(item.tagName.replace('H', '')),
                title: item.innerText,
                tag: '',
                children: []
            })
        }
        let tree = treeify(headList, '')
        if (tree.length === 0) {
            tree = []
        }
        let source = JSON.parse(JSON.stringify(headList))
        source.forEach((item) => {
            item.children = []
        })

        articleDirectory.tag = '1.'
        articleDirectory.source = source
        articleDirectory.list = tree
    }

    nextTick(async () => {
        await start()
        articleDirectory.loading = false
    })
}

export default {
    initTheme,
    changeTheme,
    initBlogInfo,
    getAboutMe,
    getResume,
    showRightNav,
    hideRightNav,
    parseArticleDirectory,
    clearArticleDirectory
}

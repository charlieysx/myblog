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
    if (res?.data) {
        return res.data
    }
    return {}
}

const getResume = async () => {
    const res = await api.getResume().catch(() => {})
    if (res?.data) {
        return res.data
    }
    return {}
}

function treeify(data: CommonStore.ArticleMenuTag[], tag: string) {
    let tree: CommonStore.ArticleMenuTag[] = []
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

const clearArticleMenu = () => {
    state.rightNav.articleMenu.show = false
    state.rightNav.articleMenu.list = []
    state.rightNav.articleMenu.source = []
}

const parseArticleMenu = async () => {
    const articleMenu = state.rightNav.articleMenu
    articleMenu.loading = true
    articleMenu.show = true
    showRightNav()

    async function parse() {
        let headNodes = document.getElementById('markdown-preview-body')?.getElementsByClassName('my-blog-head')
        let headList: CommonStore.ArticleMenuTag[] = []
        Array.prototype.forEach.call(headNodes, (item) => {
            headList.push({
                id: item.id,
                index: Number(item.tagName.replace('H', '')),
                title: item.innerText,
                tag: '',
                children: []
            })
        })
        let tree = treeify(headList, '')
        if (tree.length === 0) {
            tree = []
        }
        let source = JSON.parse(JSON.stringify(headList))
        source.forEach((item) => {
            item.children = []
        })

        articleMenu.tag = '1.'
        articleMenu.source = source
        articleMenu.list = tree
    }

    nextTick(async () => {
        await parse()
        articleMenu.loading = false
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
    parseArticleMenu,
    clearArticleMenu
}

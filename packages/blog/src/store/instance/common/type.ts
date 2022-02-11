export namespace CommonStore {
    export interface State {
        theme: BlogTheme
        blogInfo: BlogInfo
        rightNav: {
            show: boolean
            articleMenu: {
                loading: boolean
                show: boolean
                list: ArticleMenuTag[]
                source: any[]
                tag: string
            }
        }
    }

    export enum BlogTheme {
        light = 'light',
        dark = 'dark'
    }

    export interface BlogInfo {
        avatar: string
        blogName: string
        github: string
        sign: string
        articleCount: number
        categoryCount: number
        tagCount: number
    }

    export interface ArticleMenuTag {
        id: string
        index: number
        title: string
        tag: string
        children: ArticleMenuTag[]
    }
}

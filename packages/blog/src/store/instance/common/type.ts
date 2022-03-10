export namespace CommonStore {
    export interface State {
        theme: BlogTheme
        blogInfo: BlogInfo
        rightNav: {
            show: boolean
            articleDirectory: {
                loading: boolean
                show: boolean
                list: ArticleDirectoryTag[]
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

    export interface ArticleDirectoryTag {
        id: string
        index: number
        title: string
        tag: string
        children: ArticleDirectoryTag[]
    }
}

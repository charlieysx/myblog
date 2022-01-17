export namespace CommonStore {
    export interface State {
        blogInfo: BlogInfo
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
}

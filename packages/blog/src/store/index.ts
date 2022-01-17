import { CommonStore } from './instance/common'
import { ArticleStore } from './instance/article'

export interface Store {
    common: CommonStore
    article: ArticleStore
}

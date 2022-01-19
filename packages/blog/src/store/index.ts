import { CommonStore } from './instance/common'
import { ArticleStore } from './instance/article'
import { FriendStore } from './instance/friend'

export interface Store {
    common: CommonStore
    article: ArticleStore
    friend: FriendStore
}

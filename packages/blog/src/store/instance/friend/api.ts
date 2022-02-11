const { get } = CC.useApi()

const getFriendList = async (params) => {
    return await get('/w/friends/list', { params })
}
export { getFriendList }

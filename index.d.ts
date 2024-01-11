type showSideBar = boolean

export type Action<T, K> ={
    payload: K | undefined | string,
    type: T | string
}
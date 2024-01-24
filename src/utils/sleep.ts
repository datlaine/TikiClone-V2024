export const sleep = (ms: number) => {
    return new Promise((res) => {
        setTimeout(() => {
            console.log('timeout')
            res(1)
        }, ms)
    })
}

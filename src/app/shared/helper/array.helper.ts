export const unquieArray = (arr: {}[], key1?: string, key2?: string, key3? : string) => {
  return   arr.reduce((resArr:any, currentArr: any) => {
        // @ts-ignore
        console.log('currentArr[key1', currentArr[key1])
        // @ts-ignore
        let other = resArr.some((ele: any) =>currentArr.itemId == key2 || currentArr.pos == key3)
        if (!other) resArr.push(currentArr)
        return resArr
    }, [])

}
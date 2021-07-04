/**
 * 获取指定深度的数组元素
 * @param data 
 * @param position 
 */

function getArrayOption(data: any, position: Array<number>) {
    let temp = data

    position.forEach((item: number) => {

        temp = getChildDom(temp, item)
    })

    return temp
}
function getChildDom(data: any, index: number) {
    return data[index].childDom || []
}

export default getArrayOption

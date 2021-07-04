export default (str: string) => {
    str = str.toString()
    var result = str.slice(0, 1).toUpperCase() + str.slice(1);
    return result
}
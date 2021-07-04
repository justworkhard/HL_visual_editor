import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import prettier from "prettier/standalone";
import parseTypeScript from "prettier/parser-typescript";
import tablePage from './tablePage.txt'
import modalPage from './modalPage.txt'
import ParseCompony from '@/config/componyParsePros'
import { cloneDeep } from 'lodash'
import map from 'lodash/map';

let ast: any
let domList: Array<any> = []

let fileConfig = {
    indexFile: tablePage,
    modalFile: modalPage,
}
let selectFile = ''

/**
* 生成代码
*/
function composeCode(params: any, selectFile: string) {
    selectFile = selectFile
    let file = fileConfig[selectFile]
    // 每次导出使用初始模板
    ast = parser.parse(file, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
    });
    domList = params
    const { code } = getNewCode();
    return code
}
/**
* 获取添加后的代码
*/
function getNewCode() {
    traverse(ast, {
        // 寻找模板中Card，将选择的DOM放入其children中
        JSXOpeningElement(element) {
            const { node } = element
            const { name } = node
            if (selectFile === 'indexFile') {
                if (name.name == 'Card') {
                    domList.forEach((item: any) => {
                        let parentDom = getNewComponentNode(item);
                        writeCloseElementNote(element, parentDom)
                    })
                }
            } else {
                if (name.name == 'Form') {
                    domList.forEach((item: any) => {
                        let parentDom = getNewComponentNode(item);
                        writeCloseElementNote(element, parentDom)
                    })
                }
            }
        },
        // 操作变量，导入选择的组件
        VariableDeclarator(params: any) {
            if (params.node.init.name == 'Components') {
                setIdentifier(domList, params)
            }
        }
    })

    const code = generateCode(ast);
    return { code };
}
/**
 * 
 * @param columns 
 */
function setIdentifier(domList: any, params: any) {
    domList.forEach((domItem: any) => {
        if (domItem.childDom) {
            setIdentifier(domItem.childDom, params)
        }
        let flag = params.node.id.properties.some(function (item: any, index: any, array: any) {
            return (item.value ? item.value.name : item.name) === domItem.type;
        })
        const identifier = t.identifier(domItem.type)
        flag ? '' : params.node.id.properties.push(identifier)
    })
}
/**
 * 声明参数
 * @param ast 
 */
function stateConst(columns: any, name: string) {
    traverse(ast, {
        // 寻找App函数声明
        ArrowFunctionExpression(node: any) {
            if (node.parent.id && node.parent.id.name === 'App') {
                let temp = columns.map((item: any) => {
                    item.width = 20
                    item.dataIndex = item.key
                    return item
                })
                const elementStr = `const ${name}:any = ${JSON.stringify(temp)}`
                const tempStr = parser.parse(elementStr, {
                    sourceType: 'module',
                    plugins: ['jsx', 'typescript'],
                });
                node.node.body.body.unshift(tempStr)
            }
        }
    })
}

/**
 * 生成代码
 * @param {*} ast
 */
function generateCode(ast: any) {
    const newCode = generate(ast, {}).code;

    return prettier.format(newCode, {
        // format same as ant-design-pro
        singleQuote: true,
        trailingComma: 'es5',
        printWidth: 100,
        parser: 'typescript',
        plugins: [parseTypeScript]
    });
}
/**
 * 写入元素
 * @param {*} targetNode 找到的节点
 * @param {*} newNode 新的
 */
function writeCloseElementNote(targetNode: any, newNode: any) {

    targetNode.container.children.push(newNode)
}

/**
 * 获取组件节点
 * @param newRoute 
 */
function getNewComponentNode(newRoute: any) {
    let children: Array<string> = []
    if (newRoute.childDom) {
        let secondChild: Array<string> = []
        newRoute.childDom.forEach((secondItem: any) => {

            if (secondItem.childDom) {
                secondItem.childDom.forEach((threeItem: any) => {
                    secondChild.push(categoryToComponyStr(threeItem.type, threeItem.prop))
                })
            }
            children.push(categoryToComponyStr(secondItem.type, secondItem.prop, secondChild))
        })
    }
    let elementStr = categoryToComponyStr(newRoute.type, newRoute.prop, children)

    return parser.parse(elementStr, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
    });
}

/**
 * DOM配置生成组件字符串
 * @param type 组件类型
 * @param prop 组件属性
 * @param children 组件内容
 */
function categoryToComponyStr(type: string, prop: any, children?: Array<string>) {
    let addParseFun = ParseCompony.get(type)
    let noConfigPro = new Map()
    if (Object.prototype.toString.call(addParseFun) === '[object Function]') {
        console.log('domListdomListdomList',domList);
        
        noConfigPro = addParseFun(ast, false, prop, true, domList)
    }

    let propStr = map(prop, (item, key) => {
        if (noConfigPro.get(key) !== undefined) {
            return noConfigPro.get(key)
        }
        if (Object.prototype.toString.call(item) === '[object Object]') {
            if (key === 'style') {
                return ''
            }
            if (key === 'children') {
                return children?.push(item)
            }
            let objPropStr = map(item, (propItem, propKey) => {
                return `${propKey}: "${propItem}"`
            }).join(',')
            return `${key}={{${objPropStr}}} `
        } else if (Object.prototype.toString.call(item) === '[object Array]') {
            if (key !== 'data') {
                stateConst(item, key)
            }
            return `${key}={${key}} `
        } else if (Object.prototype.toString.call(item) === '[object String]') {
            if (key === 'children') {
                let temp = cloneDeep(children)
                temp?.push(item)
                children = temp
                return ''
            }
            return `${key}="${item}" `
        }

    }).join(' ')

    return `<${type} ${propStr}>${children?.join('') || ''}</${type}>`
}
export default composeCode

import traverse from '@babel/traverse';
import * as parser from '@babel/parser';
import toUpperCaseFirstLetter from '@/utils/toUpperCase'
import * as t from '@babel/types';

const ParseCompony = new Map()

ParseCompony.set('SearchBtn', SearchBtnParse)
ParseCompony.set('MyTable', MyTableParse)
ParseCompony.set('FormItemInput', FormItemInputParse)
ParseCompony.set('Modal', ModalParse)

function ModalParse(ast: any, noAction?: boolean, prop?: any, replace?: string) {
    let visible = ''
    let modalRef = ''
    if (prop) {
        visible = prop.visible
        modalRef = prop.modalRef
    }
    let noConfigPro = new Map()
    if (!noAction) {
        traverse(ast, {
            // 寻找App函数声明
            ArrowFunctionExpression(node: any) {
                if (node.parent.id && node.parent.id.name === 'App') {
                    const elementStr =
                        `
                    const [${visible}, set${toUpperCaseFirstLetter(visible)}] = useState<any>(false)
                    const ${modalRef} = useRef<any>(null)
                    `
                    const tempStr = parser.parse(elementStr, {
                        sourceType: 'module',
                        plugins: ['jsx', 'typescript'],
                    });
                    node.node.body.body.unshift(tempStr)
                }
            },
            // 操作变量，导入选择的组件
            ImportDeclaration(params: any) {

                if (params.node.source.value == 'react') {
                    console.log('paramsparamsparams', params.node.specifiers);

                    let flag = params.node.specifiers.some(function (item: any, index: any, array: any) {
                        return (item.imported ? item.imported.name : item.name) === 'useRef';
                    })
                    const identifier = t.importSpecifier(t.identifier('useRef'), t.identifier('useRef'))
                    flag ? '' : params.node.specifiers.push(identifier)
                }
            }
        })
    }
    // replace为true则替代渲染，为false则用于否定属性设置
    if (!replace) {
        noConfigPro.set('destroyOnClose', `true`)
    } else {
        noConfigPro.set('visible', `visible={${visible}}`)
        noConfigPro.set('modalRef', '')
    }
    noConfigPro.set('destroyOnClose', `destroyOnClose={true}`)
    noConfigPro.set('onCancel', `onCancel={() => {
        set${toUpperCaseFirstLetter(visible)}
      }}`)
    noConfigPro.set('onOk', `onOk={() => {
        ${modalRef}.current.form.submit()
      }}`)
    return noConfigPro
}

function FormItemInputParse(ast: any, noAction?: boolean, prop?: any) {
    let noConfigPro = new Map()
    let propValue = ''
    if (prop) {
        propValue = prop.name
    }
    noConfigPro.set('onChange', `onChange={(e:any) => {
        setParams({
        ...params,
        ${propValue}: e.target.value
        })
      }}`)
    return noConfigPro
}

/**
 * 查询按钮附加解析
 * @param ast ast树
 * @param noAction 是否执行循环操作,true
 */
function SearchBtnParse(ast: any, noAction?: boolean, prop?: any, replace?: string, domList: any) {
    let noConfigPro = new Map()
    if (!noAction) {
        let columnsStr = {}
        if (prop) {
             getFormInputPro(domList).forEach((item, index) => {
                console.log('itemitem',item);
                
                columnsStr[item] = ''
            })
            columnsStr.pageNo = 1
            columnsStr.pageSize = 10
            columnsStr = JSON.stringify(columnsStr)
        }
        traverse(ast, {
            // 寻找App函数声明
            ArrowFunctionExpression(node: any) {
                if (node.parent.id && node.parent.id.name === 'App') {
                    const elementStr = `
                    const [params, setParams] = useState(${columnsStr})
                    const [data, setData] = useState([])
                    const [dataTotal, setTotal] = useState<number>(0)

                    function getData(pageNo?: number) {
                        getMsOrder({
                          ...params,
                          pageNo: pageNo || 1
                        }).then((res:any) => {
                          setData(res.data.records)
                          setTotal(res.data.total)
                        })
                      }`
                    const tempStr = parser.parse(elementStr, {
                        sourceType: 'module',
                        plugins: ['jsx', 'typescript'],
                    });
                    node.node.body.body.unshift(tempStr)
                }
            }
        })
    }

    noConfigPro.set('onClick', 'onClick = {getData}')
    return noConfigPro
}
function MyTableParse(ast?: any, noAction?: boolean, prop?: any) {
    let noConfigPro = new Map()


    noConfigPro.set('dataTotal', 'dataTotal = {dataTotal}')
    noConfigPro.set('data', 'data = {data}')
    noConfigPro.set('onChange', 'onChange = {getData}')
    return noConfigPro
}
function getFormInputPro(domList: any) {
    let params: Array<any> = []
    domList.forEach((item: any) => {
        console.log('params', params);

        if (item.type === "FormItemInput") {
            params.push(item.prop.name || '')
        }
        if (item.childDom) {
            params = params.concat(getFormInputPro(item.childDom))
        }
    })

    return params
}
export default ParseCompony
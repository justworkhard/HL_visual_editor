import React from 'react';
import map from 'lodash/map';
import { connect } from 'umi';
import { Button, Input } from 'antd'
import { StopOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash'
import ParseCompony from '@/config/componyParsePros'

const App = (props: any) => {
    const { userLogin, dispatch } = props
    let { domList, selectDom } = userLogin

    return (
        <div style={{ border: '1px solid #000' }}>
            <h2 style={{ borderBottom: '1px solid #000' }}>属性设置</h2>
            {
                userLogin.selectDom.length === 2 ? map(domList[parseInt(selectDom[1])].prop, (item, key) => {
                    console.log('item, key', item, key);

                    let propsType = Object.prototype.toString.call(item)
                    // 忽略样式设置
                    if (key !== 'style') {
                        // 判断属性类型
                        let addParseFun = ParseCompony.get(domList[parseInt(selectDom[1])].type)
                        if (Object.prototype.toString.call(addParseFun) === '[object Function]') {
                            if (addParseFun(_, true).get(key)) {
                                return ''
                            }
                        }
                        if (propsType !== '[object Array]') {
                            return <div key={key}>
                                <span>{key}:</span>
                                <Input
                                    defaultValue={item}
                                    onChange={(event) => {
                                        let value = event.target.value
                                        let tempDomList = cloneDeep(domList[parseInt(selectDom[1])])
                                        tempDomList.prop[key] = value
                                        domList[parseInt(selectDom[1])] = tempDomList
                                        dispatch({
                                            type: 'login/domList',
                                            payload: { domList: domList },
                                        });
                                    }} placeholder={`请输入${key}`} />
                            </div>
                        } else {
                            // 数组型属性
                            return <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {
                                    item.map((columnsItem: any, index: number) => {
                                        return <div style={{ position: 'relative', width: 150, padding: '5px 20px', margin: '5px', border: '1px solid #000' }}>
                                            <StopOutlined style={{ color: 'red', position: 'absolute', right: '5px', top: '5px' }}
                                                onClick={() => {
                                                    let temp = cloneDeep(domList)
                                                    if (selectDom.length > 2) {
                                                        temp[selectDom[1]].prop[key].push({})
                                                    } else {
                                                        console.log('index', index, temp[selectDom[1]].prop[key].splice(index, 1));
                                                    }
                                                    dispatch({
                                                        type: 'login/domList',
                                                        payload: { domList: temp },
                                                    });
                                                }}
                                            ></StopOutlined>
                                            {
                                                map(columnsItem, (columnsItemProp, columnsItemPropKey) => {
                                                    return (
                                                        <div>
                                                            <span>{columnsItemPropKey}:</span>
                                                            <Input type="text"
                                                                value={columnsItem[columnsItemPropKey]}
                                                                onChange={(event) => {
                                                                    let value = event.target.value
                                                                    let domListTemp = new Array()
                                                                    domListTemp = cloneDeep(domList)
                                                                    let temp = cloneDeep(domListTemp[selectDom[1]])
                                                                    // if (selectDom.length > 2) {
                                                                    //     temp[columnsItemPropKey] = value
                                                                    // } else {
                                                                    //     temp[columnsItemPropKey] = value
                                                                    // }
                                                                    temp.prop[key][index][columnsItemPropKey] = value
                                                                    domListTemp[selectDom[1]] = []
                                                                    domListTemp[selectDom[1]] = temp
                                                                    console.log('domListTemp', domListTemp);
                                                                    // let tempDomList = cloneDeep(domList[parseInt(selectDom[1])])
                                                                    // tempDomList.prop[key] = value
                                                                    // domList[parseInt(selectDom[1])] = tempDomList
                                                                    dispatch({
                                                                        type: 'login/domList',
                                                                        payload: { domList: domListTemp },
                                                                    });
                                                                }} placeholder={`请输入${columnsItemPropKey}`}
                                                            />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    })
                                }
                                <Button type='primary' onClick={() => {
                                    console.log('userLogin.selectDom', domList, selectDom);
                                    let temp = domList
                                    if (selectDom.length > 2) {
                                        temp[selectDom[1]].prop[key].push({ title: '', key: '' })
                                    } else {
                                        temp[selectDom[1]].prop[key].push({ title: '', key: '' })
                                    }
                                    dispatch({
                                        type: 'login/domList',
                                        payload: { domList: temp },
                                    });
                                }}>添加属性</Button>
                            </div>
                        }
                    }
                }) : (
                        map(domList[parseInt(selectDom[1])].childDom[parseInt(selectDom[2])].prop, (item, key) => {
                            let type = domList[parseInt(selectDom[1])].childDom[parseInt(selectDom[2])].type
                            let addParseFun = ParseCompony.get(type)

                            if (Object.prototype.toString.call(addParseFun) === '[object Function]') {
                                if (addParseFun(_, true).get(key)) {
                                    return ''
                                }
                            }
                            if (key !== 'style') {
                                return <div>
                                    <span>{key}:</span>
                                    <Input type="text"
                                        value={item}
                                        onChange={(event) => {
                                            let value = event.target.value
                                            let tempDomList = cloneDeep(domList[parseInt(selectDom[1])].childDom[parseInt(selectDom[2])])
                                            console.log('tempDomList', tempDomList);

                                            tempDomList.prop[key] = value
                                            domList[parseInt(selectDom[1])].childDom[parseInt(selectDom[2])] = tempDomList
                                            dispatch({
                                                type: 'login/domList',
                                                payload: { domList: domList },
                                            });
                                        }} placeholder={`请输入${key}`} />
                                </div>
                            }
                        })
                    )
            }
        </div>
    )
}
export default connect(({ login, loading }: any) => ({
    userLogin: login,
}))(App);
import React, { createElement, useContext, useEffect } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { connect } from 'umi';
import map from 'lodash/map';
import { reactContainers } from '@/config/reactCategory'
import DropItem from './dropItem'
import get from 'lodash/get';
// import * as Ants from 'antd/es';
import { cloneDeep } from 'lodash'
import MyCom from '@/components';

const Box = (props: any) => {
    let accept = map(reactContainers, (item, key) => {
        return key
    })
    const { userLogin, dispatch } = props

    const { type, prop, level, firstLevelIndex, childDom } = props

    const [_, droper] = useDrop({
        // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
        accept: accept,
        // collect 函数，返回的对象会成为 useDrop 的第一个参数，可以在组件中直接进行使用
        collect: (minoter: DropTargetMonitor) => {
            return {
                isOver: minoter.isOver(),
                ...minoter.getItem()
            }
        },
        drop: (item) => {
            if (!userLogin.ifDrap) {
                let temp = userLogin.domList
                let childDom = temp[level[0]].childDom || []
                childDom.push(item)
                temp[level[0]].childDom = childDom
                console.log('======', type, level, temp[level[0]].childDom);
                dispatch({
                    type: 'login/login',
                    payload: {
                        ifDrap: true,
                        domList: temp
                    },
                });
            }
        },
    })

    function renderDragItem() {

        let renderChild = prop.children
        if (childDom) {
            renderChild = childDom.map((item: any, index: number) => {
                let temp = cloneDeep(level)
                temp.push(index)
                return <DropItem type={item.type} level={temp} prop={item.prop} childDom={item.childDom}></DropItem>
            })
        }
        return createElement(get(MyCom, type, type), {
            ...prop,
        }, renderChild)
    }
    function checkSelect(firstLevelIndex: number, secondLevelIndex?: number) {
        let selectDom = cloneDeep(userLogin.selectDom)
        selectDom.shift(1)
        selectDom = selectDom.map(item => {
            return parseInt(item)
        })
        if (JSON.stringify(level) == JSON.stringify(selectDom)) {
            return true
        } else {
            return false
        }

        // return
        // let selectDom = userLogin.selectDom
        // let len = selectDom.length
        // if (len < 1) {
        //     return false
        // }
        // if (parseInt(selectDom[1]) === firstLevelIndex) {
        //     if (len < 3) {
        //         if (secondLevelIndex === undefined) {
        //             return true
        //         } else {
        //             return false
        //         }
        //     } else {
        //         if (parseInt(selectDom[2]) === secondLevelIndex) {
        //             return true
        //         } else {
        //             return false
        //         }
        //     }
        // } else {
        //     return false
        // }
    }
    return (
        <div ref={droper} style={{ cursor: 'pointer', border: checkSelect(level) ? '1px solid #ee6723' : '' }}> { renderDragItem()}</div >
    )
}

export default connect(({ login, loading }: any) => ({
    userLogin: login,
}))(Box);
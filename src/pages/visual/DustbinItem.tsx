import React, { createElement, useContext, useEffect } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { connect } from 'umi';
import map from 'lodash/map';
import { reactContainers } from '@/config/reactCategory'
import get from 'lodash/get';
// import * as Ants from 'antd/es';
import MyCom from '@/components';

const Box = (props: any) => {
    let accept = map(reactContainers, (item, key) => {
        return key
    })
    const { userLogin, dispatch } = props

    const { type, prop, firstLevelIndex, childDom } = props

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
            let temp = userLogin.domList
            let childDom = temp[firstLevelIndex].childDom || []
            childDom.push(item)
            temp[firstLevelIndex].childDom = childDom
            dispatch({
                type: 'login/login',
                payload: {
                    ifDrap: true,
                    domList: temp
                },
            });
        },
    })

    function renderDragItem() {
        let renderChild = childDom ? childDom.map((childItem: any, index: number) => (
            createElement(get(MyCom, childItem.type, childItem.type), {
                ...childItem.prop,
                canEditor: 'true',
                firstLevelIndex: firstLevelIndex,
                secondLevelIndex: index,
                style: { ...childItem.prop.style, border: checkSelect(firstLevelIndex, index) ? '1px solid #ee6723' : '' }
            })
        )) : prop.children
        
        return createElement(get(MyCom, type, type), {
            ...prop,
            canEditor: 'true',
            firstLevelIndex: firstLevelIndex
        }, renderChild)
    }
    function checkSelect(firstLevelIndex: number, secondLevelIndex?: number) {

        let selectDom = userLogin.selectDom
        let len = selectDom.length
        if (len < 1) {
            return false
        }
        if (parseInt(selectDom[1]) === firstLevelIndex) {
            if (len < 3) {
                if (secondLevelIndex === undefined) {
                    return true
                } else {
                    return false
                }
            } else {
                if (parseInt(selectDom[2]) === secondLevelIndex) {
                    return true
                } else {
                    return false
                }
            }
        } else {
            return false
        }
    }
    return (
        <div ref={droper} style={{ cursor: 'pointer', border: checkSelect(firstLevelIndex) ? '1px solid #ee6723' : '' }}> { renderDragItem()}</div >
    )
}

export default connect(({ login, loading }: any) => ({
    userLogin: login,
}))(Box);
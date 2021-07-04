import React, { createElement } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { connect } from 'umi';
import map from 'lodash/map';
import { reactContainers } from '@/config/reactCategory'
import get from 'lodash/get';
import MyCom from '@/components';
import getArrayOption from '@/utils/getArrayOption'
import { cloneDeep } from 'lodash'

const Box = (props: any) => {
    let accept = map(reactContainers, (item, key) => {
        return key
    })
    const { userLogin, dispatch, type, prop, firstLevelIndex, level, childDom } = props


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
            let domList = userLogin.domList
            let childDom = getArrayOption(domList, level)

            childDom.push(item)
            domList[level[0]].childDom[level[1]].childDom = childDom
            dispatch({
                type: 'login/login',
                payload: {
                    ifDrap: true,
                    domList: domList
                },
            });
        },
    })

    function renderDragItem() {

        let renderChild = childDom ? childDom.map((childItem: any, index: number) => {
            let temp = cloneDeep(level)
            temp.push(index)
            return createElement(get(MyCom, childItem.type, childItem.type), {
                ...childItem.prop,
                canEditor: 'true',
                level: temp,
                secondLevelIndex: index,
                style: { ...childItem.prop.style, border: checkSelect(temp) ? '1px solid #ee6723' : '' }
            })
        }) : prop.children

        return createElement(get(MyCom, type, type), {
            ...prop,
            style: { border: checkSelect(level) ? '1px solid #ee6723' : '' },
            canEditor: 'true',
            refs: droper,
        }, renderChild)
    }
    function checkSelect(level: Array<number>) {
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


    }
    return (
        // <div ref={droper} style={{ cursor: 'pointer', border: checkSelect(level) ? '1px solid #ee6723' : '' }}> { renderDragItem()}</div >
        renderDragItem()
    )
}

export default connect(({ login, loading }: any) => ({
    userLogin: login,
}))(Box);
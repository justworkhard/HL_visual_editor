import React, { useState } from 'react'
import styles from './index.less'
import { Tree } from 'antd';
import { connect } from 'umi';

function App(props: any) {
    const { userLogin, dispatch } = props
    const domList = userLogin.domList


    function domToTree(array: Array<any>, level?: number) {
        if (!array) {
            return undefined
        }
        let res = array.map((item, index: number) => {
            return {
                title: item.type,
                key: level + '-' + index,
                children: domToTree(item.childDom, level + '-' + index),
                ...item,
            }
        })

        return res
    }

    return (
        <div className={styles.app}>
            <div className={styles.title}>组件树</div>
            <Tree
                className="draggable-tree"
                defaultExpandAll={true}
                draggable
                blockNode
                onDragEnter={() => { }}
                onDrop={() => { }}
                onSelect={(event) => {
                    if (event.length <= 0) {
                        dispatch({
                            type: 'login/selectDom',
                            payload: { selectDom: [] },
                        });
                        return
                    }
                    let select = event[0].split('-')
                    console.log('select',select);
                    
                    dispatch({
                        type: 'login/selectDom',
                        payload: { selectDom: select },
                    });
                }}
                treeData={domToTree(domList, 0)}
            />
        </div>
    )
}
export default connect(({ login }: any) => ({
    userLogin: login,
}))(App);
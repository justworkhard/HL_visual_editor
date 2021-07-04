import React, { createElement, CSSProperties, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { reactContainers } from '@/config/reactCategory'
import styles from './menuItem.less'
import map from 'lodash/map';
import get from 'lodash/get';
import * as Ants from 'antd/es';

const Box = (props: any) => {

    const { type, prop } = props
    const ref = useRef<HTMLDivElement>(null);

    // 使用 useDrag
    const [, drager] = useDrag({
        item: { type: type, prop: prop }
    })

    function renderDragItem(item: any) {
        return createElement(get(Ants, type, type), { width: '120', ...prop })
    }
    return (
        <div ref={drager} className={styles.muneItem} >{renderDragItem(prop)}</div>
    )
}

export default Box;

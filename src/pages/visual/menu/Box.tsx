import React, { CSSProperties, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from './box.less'

const Box = (props: any) => {
    const { title, id } = props
    const ref = useRef<HTMLDivElement>(null);

    // 使用 useDrag
    const [, drager] = useDrag({
        item: { type: title, id: id }
    })

    return (
        <div ref={drager} className={styles.app}>{title}</div>
    )
}

export default Box;

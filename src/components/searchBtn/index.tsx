import React from 'react';
import { Button } from 'antd';

const FormItemInput = (props: any) => {
    const { onClick } = props
    return (
        <Button type='primary' onClick={onClick}>搜索</Button>
    )
}

export default FormItemInput
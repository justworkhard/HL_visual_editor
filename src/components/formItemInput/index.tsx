import React from 'react';
import { Form, Input, Col } from 'antd';


const FormItemInput = (props: any) => {

    const { onChange, label, name, style } = props

    return (
        <Col lg={7} md={14} sm={26} style={style}>
            <Form.Item
                label={label || 'label'}
                name={name || 'name'}
            >
                <Input placeholder={`请输入${label}`} onChange={onChange ? onChange : () => { }} />
            </Form.Item>
        </Col>
    )
}

export default FormItemInput
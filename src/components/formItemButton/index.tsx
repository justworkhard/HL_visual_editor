import React from 'react';
import { Form, Space, Col } from 'antd';


const FormItemInput = (props: any) => {

    const { style, children, refs } = props
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 20 },
    };

    return (
        <Col lg={7} md={14} sm={24} style={style} ref={refs}>
            <Form.Item
                wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
            >
                <Space>
                    {children}
                </Space>
            </Form.Item>
        </Col>
    )
}

export default FormItemInput
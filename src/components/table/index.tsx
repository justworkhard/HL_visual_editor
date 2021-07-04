import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

const FormItemInput = (props: any) => {

    const { columns, data, dataTotal, onChange, label, name, style } = props
    const defaultColumns: ColumnsType<any> = [
        {
            title: '订单号',
            dataIndex: 'orderCode',
            key: 'orderCode',
            width: 20,
        },
        {
            title: '操作员',
            dataIndex: 'action',
            width: 20,
            key: 'action',
        },
    ]
    const defaultData = [{
        orderCode: 1234,
        action: '小明'
    }, {
        orderCode: 1234,
        action: '小明'
    }]
    return (
        <Table
            style={{ marginTop: 20 }}
            dataSource={data || defaultData}
            columns={columns || defaultColumns}
            pagination={{ onChange: onChange, total: dataTotal }}
            scroll={{ x: 800 }}
        />
    )
}

export default FormItemInput
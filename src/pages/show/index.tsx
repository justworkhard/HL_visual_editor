import React, { FC, useEffect, useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import Components from '@/components';
const { Card, Form, Row, FormItemInput, SearchBtn, FormItemButton, MyTable, Modal } = Components;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const App: FC<any> = (props: any) => {
  const [userV, setUserV] = useState<any>(false);
  const userRef = useRef<any>(null);

  const columns: any = [];

  const [params, setParams] = useState<any>({
    pageNo: 1,
    pageSize: 10,
  });
  const [data, setData] = useState([]);
  const [dataTotal, setTotal] = useState<number>(0);

  function getData(pageNo?: number) {
    getMsOrder({ ...params, pageNo: pageNo || 1 }).then((res: any) => {
      setData(res.data.records);
      setTotal(res.data.total);
    });
  }

  useEffect(() => { }, []);
  return (
    <Form {...layout} hideRequiredMark>
      <PageContainer>
        <Card bordered={false}></Card>
      </PageContainer>
      <Row>
        <FormItemInput
          label="label"
          name="name"
          onChange={(e: any) => {
            setParams({ ...params, name: e.target.value });
          }}
        ></FormItemInput>
        <FormItemInput
          label="label"
          name="name"
          onChange={(e: any) => {
            setParams({ ...params, name: e.target.value });
          }}
        ></FormItemInput>
        <FormItemInput
          label="label"
          name="name"
          onChange={(e: any) => {
            setParams({ ...params, name: e.target.value });
          }}
        ></FormItemInput>
        <FormItemButton>
          <SearchBtn onClick={getData}></SearchBtn>
        </FormItemButton>
      </Row>
      <MyTable columns={columns} data={data} dataTotal={dataTotal} onChange={getData}></MyTable>;
      <Modal
        visible={userV}
        title="添加用户"
        destroyOnClose={true}
        onCancel={() => {
          setUserV;
        }}
        onOk={() => {
          userRef.current.form.submit();
        }}
      ></Modal>
    </Form>
  );
};

export default App;

import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './welcome.less';

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default (): React.ReactNode => {
  const intl = useIntl();
  return (
    <PageContainer>
      <div className={styles.imgBox}>
        <Card>
          <h1>欢迎使用</h1>
        </Card>
        {/* <img src="https://hlta-reimbursement.oss-cn-shenzhen.aliyuncs.com/1608794332110%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20201224151832.png?Expires=1924154332&OSSAccessKeyId=LTAI4GC8Ha8Ya3pBmtW48mmw&Signature=G4SRv9CnQSqQ2Ct1kgNVWjheL00%3D" alt="" /> */}
      </div>
    </PageContainer>
  );
};
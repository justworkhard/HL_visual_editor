import React from 'react'
import styles from './index.less'
import { reactContainers } from '@/config/reactCategory'
import MenuItem from './menuItem'
import Box from './Box'
import map from 'lodash/map';
import { Menu } from 'antd/es'
import SubMenu from 'antd/es/menu/SubMenu'
import { Input } from 'antd'

function App() {
    const [openKeys, setOpenKeys] = React.useState([]);
    const onOpenChange = (keys: any) => {
        let openKeys = keys
        setOpenKeys(openKeys)
    };
    function renderMenuItem(prop: any, type: string) {
        const menu = map(prop.components, (CItem, CKey) => {
            return CItem ? CItem.props.map((Pitem: any) => {
                return < MenuItem type={CKey} prop={Pitem} ></MenuItem >
            }) : <Box title={CKey}></Box>
        })
        return menu
    }
    return (
        <div className={styles.app}>
            <Input></Input>
            <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} style={{ width: 200 }}>
                {
                    map(reactContainers, (item, RCkey) => {
                        return <SubMenu key={RCkey} title={RCkey}>
                            {
                                renderMenuItem(item, RCkey)
                            }
                            {
                                item.props ? item.props.map((item: any) => (
                                    <MenuItem type={RCkey} prop={item} ></MenuItem>
                                )) : <></>
                            }
                        </SubMenu>
                    })
                }
            </Menu>

        </div>
    )
}
export default App
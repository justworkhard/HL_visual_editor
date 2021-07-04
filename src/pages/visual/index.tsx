import React from 'react';
import { DndProvider } from 'react-dnd';
import HTMLBackend from 'react-dnd-html5-backend'
import Dustbin from './Dustbin'
import styles from './index.less';
import Menu from './menu/menu'

function App() {
  const boxList = [
    {
      id: '1',
      title: '组件1'
    },
    {
      id: '2',
      title: '组件2'
    },
  ]

  return (
    <div className={styles.app}>
      <DndProvider backend={HTMLBackend} >
        <Menu></Menu>
        <Dustbin></Dustbin>
      </DndProvider >
    </div>
  )
}
export default App

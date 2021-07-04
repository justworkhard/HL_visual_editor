import React, { useState } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { reactContainers } from '@/config/reactCategory'
import map from 'lodash/map';
import { connect } from 'umi';
import Structure from './structure/index'
import styles from './dustbin.less'
import DustbinItemTest from './DustbinItemTest'
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Space, message, Form, Card, Select } from 'antd'
import exportFun from '@/utils/exportFun'
import SetProp from './setProp'

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 20 },
};

const Dustbin = (props: any) => {
	let accept = map(reactContainers, (item, key) => {
		return key
	})
	const { userLogin, dispatch } = props
	const [selectFile, setSelectFile] = useState("indexFile")
	let { domList } = userLogin

	// 第一个参数是 collect 方法返回的对象，第二个参数是一个 ref 值，赋值给 drop 元素
	const [_, droper] = useDrop({
		// accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
		accept: accept,
		// collect 函数，返回的对象会成为 useDrop 的第一个参数，可以在组件中直接进行使用
		collect: (minoter: DropTargetMonitor) => {
			return {
				isOver: minoter.isOver(),
				...minoter.getItem()
			}
		},
		drop: (item, monitor: DropTargetMonitor) => {

			if (userLogin.ifDrap) {
				dispatch({
					type: 'login/login',
					payload: { ifDrap: false },
				});
			} else {
				domList.push({
					...item
				})
				dispatch({
					type: 'login/domList',
					payload: { domList: domList },
				});
			}
		},
	})

	function renderDragItem(item: any, index: number) {
		let level = [index]
		let { type, prop, childDom } = item

		return <DustbinItemTest type={type} prop={prop} level={level} firstLevelIndex={index} childDom={childDom}></DustbinItemTest>
	}
	// 添加到复制粘贴板
	function copyToClipboard(str: any) {
		const el = document.createElement('textarea'); //创建input对象
		el.value = str;
		el.setAttribute('readonly', '');  //当前获得焦点的元素
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el); //添加元素
		const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
		el.select();
		document.execCommand('copy'); //执行复制
		document.body.removeChild(el);//删除元素
		if (selected) {
			document.getSelection().removeAllRanges();
			document.getSelection().addRange(selected);
		}
	};

	return (
		// 将 droper 赋值给对应元素的 ref
		<div className={styles.dustbin}>
			<div className={styles.action}>
				<Space className={styles.btnDelete}>
					<Select placeholder='请选择模板文件' value={selectFile} onSelect={(value: string) => {
						setSelectFile(value)
					}}>
						<Select.Option value='indexFile'>功能页模板</Select.Option>
						<Select.Option value='modalFile'>拟态框模板</Select.Option>
					</Select>
					<Button disabled={userLogin.selectDom.length > 0 ? false : true} type='primary'
						danger onClick={() => {
							let selectDom = userLogin.selectDom
							const firstlevelindex = parseInt(selectDom[1])
							const secondlevelindex = selectDom[2] ? parseInt(selectDom[2]) : null
							const threelevelindex = selectDom[3] ? parseInt(selectDom[3]) : null
							console.log('selectDom', selectDom, firstlevelindex, secondlevelindex, threelevelindex);
							if (threelevelindex !== null) {
								domList[firstlevelindex].childDom[secondlevelindex].childDom.splice(threelevelindex, 1)
							} else if (secondlevelindex === null) {
								domList.splice(firstlevelindex, 1)
							} else {
								domList[firstlevelindex].childDom.splice(secondlevelindex, 1)
							}
							dispatch({
								type: 'login/domList',
								payload: { domList: domList },
							});
							dispatch({
								type: 'login/selectDom',
								payload: { selectDom: [] },
							});
						}}>删除</Button>
					<Button onClick={() => {
						let code = exportFun(userLogin.domList, selectFile)
						copyToClipboard(code);
						message.success('已复制代码')
					}}>导出</Button>
				</Space>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className={styles.app} ref={droper}
					onClick={(event) => {
						if (!event.target.getAttribute('canEditor')) {
							return
						}
						let select = ['0']
						let firstlevelindex = event.target.getAttribute('firstlevelindex')
						let secondlevelindex = event.target.getAttribute('secondlevelindex')
						select.push(firstlevelindex)
						if (secondlevelindex !== null) {
							select.push(secondlevelindex)
						}
						dispatch({
							type: 'login/selectDom',
							payload: { selectDom: select },
						});
					}}>
					<Form
						{
						...layout
						}
					>
						<PageContainer>
							<Card>
								{
									domList ? domList.map((item, index: number) => {
										return renderDragItem(item, index)
									}) : ''
								}
							</Card>
						</PageContainer>
					</Form>
				</div>
				{
					// 属性设置框
					userLogin.selectDom.length > 0 ? <SetProp ></SetProp> : ''
				}
			</div>
			<Structure domList={domList}></Structure>
		</div >
	)
}
// export default Dustbin;
export default connect(({ login, loading }: any) => ({
	userLogin: login,
}))(Dustbin);

// import Cookies from 'js-cookie'

// import router from "@/router/index"

const TokenKey = '_token'
const UserInfo = '_userInfo'

/**
 * 根据传入的menulist，处理成我们需要的路由格式
 * @param {*} data 
 */
function filterMenuList(data) {
  const menu = []
  data.forEach(item => {
    menu.push(setItem(item))
  })
  return menu
}

function setItem(item) {
  const menu = {
    id: item.id,
    menuName: item.menuName,
    parentMenuCode: item.parentMenuCode,
    menuCode: item.menuCode,
  }
  if (item.children) {
    menu.children = []
    item.children.forEach(i => {
      menu.children.push(setItem(i))
    })

  }
  return menu
}

// 原框架使用cookie，我改为了sessionStorage
// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

// token
export function getToken() {
  return window.sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return window.sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return window.sessionStorage.removeItem(TokenKey)
}


// 用户信息
export function getUserInfo() {
  const info = window.sessionStorage.getItem(UserInfo)
  return JSON.parse(info)
}

export function setUserInfo(info) {
  return window.sessionStorage.setItem(UserInfo, JSON.stringify(info))
}

export function removeUserInfo() {
  return window.sessionStorage.removeItem(UserInfo)
}


// 菜单
export function getMenu() {
  const meun = window.sessionStorage.getItem('_menu')
  return JSON.parse(meun)
}

export function setMenu(menu) {
  const data = filterMenuList(menu)
  return window.sessionStorage.setItem('_menu', JSON.stringify(data))
}

export function removeMenu() {
  return window.sessionStorage.removeItem('_menu')
}

// 标记同步菜单时发生错误的错误信息
export function getMenuErr() {
  const info = window.sessionStorage.getItem('_MenuErr')
  return JSON.parse(info)
}

export function setMenuErr(info) {
  return window.sessionStorage.setItem('_MenuErr', JSON.stringify(info))
}

export function removeMenuErr() {
  return window.sessionStorage.removeItem('_MenuErr')
}

// 处理获取动态表单的数据
export function setFormFieldsData(data) {
  const valueArr = Object.values(data);
  return Object.keys(data).map((item, index) => ({
    fieldKey: item,
    fieldValue: valueArr[index],
  }));
}

export function parseFormFieldsData(data) {
  const valueObj = {}
  data.forEach(item => {
    valueObj[item.fieldKey] = item.fieldValue || ''
  })
  return valueObj
}

// 记住用户相关操作
export function getAccount() {
  return window.localStorage.getItem('_account')
}

export function setAccount(account) {
  return window.localStorage.setItem('_account', account)
}

export function removeAccount() {
  return window.localStorage.removeItem('_account')
}
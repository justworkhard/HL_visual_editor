// src/access.ts
export default function access(initialState: { currentUser?: API.CurrentUser | undefined, menuData?: any }) {
  let { menuData } = initialState || {};
  menuData = menuData || []


  return {
    normalRouteFilter: (route: any) => {
      return filterRouter(menuData, route.path)
    }, // initialState 中包含了的路由才有权限访问
  }
}

function filterRouter(menuData: any, path: string) {

  for (const key in menuData) {
    const item = menuData[key]
    if (item.path == path) {
      return true
    }
    if (item.children.length) {
      if (filterRouter(item.children, path)) {
        return true
      }
    }
  }

  return false
}
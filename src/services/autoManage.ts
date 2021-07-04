const baseUrl = ''
const appCode = 'm-ms'
import { request } from '../app'

/**
 * 权限管理-查询用户列表 分页
 * @param {*} data 
 */
export const getAllUserList = (params: any) => {
    return request<any>(baseUrl + `/m-feign-api/auth/userUsers/getAllUserList`, {
        method: 'post',
        data: {
            appCode: appCode,
            ...params
        }
    });
}
/**
 * 权限管理-用户注册 创建用户
 * @param {*} data 
 */
export const registerUser = (params: any) => {
    return request<any>(baseUrl + `/m-feign-api/auth/userUsers/register`, {
        method: 'post',
        data: {
            appCode: appCode,
            ...params
        }
    });
}

/**
 * 权限管理-修改用户信息
 * @param {*} data 
 */
export function updateUser(params: any) {
    return request<any>(baseUrl + `/m-feign-api/auth/userUsers/updateUser`, {
        method: 'post',
        data: {
            appCode: appCode,
            ...params
        }
    });
}
/**
 * 权限管理-根据用户id 查询用户对应的分组
 * @param {*} data 
 */
export function queryUserGroupList(params: any) {
    params = {
        appCode: appCode,
        ...params
    }
    return request<any>(baseUrl + `/m-auth2/userMapUserGroup/queryUserGroupList`, {
        method: 'get',
        params
    });
}

/**
 * 权限管理-根据appCode 查询 分组集
 */
export function userGroups() {
    let params = {
        appCode: appCode,
    }
    return request<any>(baseUrl + `/m-auth2/userGroups/list`, {
        method: 'get',
        params
    });

}
/**
 * 权限管理-分配用户与 分组 关系
 * @param {*} data 
 */
export function addUserGroup(params: any) {
    return request<any>(baseUrl + `/m-feign-api/auth/userUsers/addUserGroup`, {
        method: 'post',
        data: {
            appCode: appCode,
            ...params
        }
    });
}
/**
 * 权限管理-查询所有角色列表
 * @param {*} data 
 */
export function seachRoleList(params: any) {
    return request<any>(baseUrl + `/m-feign-api/auth/userUsers/roleList`, {
        method: 'post',
        data: {
            appCode: appCode,
            ...params
        }
    });
}
/**
 * 权限管理-添加角色
 * @param {*} data 
 */
export function addRole(params: any) {
    return request<any>(baseUrl + `/m-feign-api/auth/userUsers/addRole`, {
        method: 'post',
        data: {
            appCode: appCode,
            ...params
        }
    });
}
/**
 * 权限管理-修改角色
 * @param {*} data 
 */
export function updateRole(params: any) {
    return request<any>(baseUrl + `/m-feign-api/auth/userUsers/updateRole`, {
        method: 'post',
        data: {
            appCode: appCode,
            ...params
        }
    });
}
/**
 * 权限管理-根据角色编码 查询对应的菜单集
 * @param {*} data 
 */
export function queryRoleMenuList(params: any) {
    params = {
        appCode: appCode,
        ...params
    }
    return request<any>(baseUrl + `/m-auth2/userMapRoleMenu/queryRoleMenuList`, {
        method: 'get',
        params
    });
}

/**
 * 权限管理-根据查询条件 筛选菜单列表 分页
 * @param {*} data 
 */
export function getMenuList(params: any) {
    params = {
        appCode: appCode,
        ...params
    }
    return request<any>(baseUrl + `/m-feign-api/auth/userUsers/getMenuList`, {
        method: 'post',
        data: params
    });
}
/**
 * 权限管理-根据appCode 查询 菜单集
 */
export function userMenu() {
    let params = {
        appCode: appCode,
    }
    return request<any>(baseUrl + `/m-auth2/userMenu/list`, {
        method: 'get',
        params
    });
}
/**
 * 权限管理-分配 角色和菜单集 对应
 * @param {*} data 
 */
export function addRoleMenuList(params: any) {
    params = {
        appCode: appCode,
        ...params
    }
    return request<any>(baseUrl + `/m-feign-api/auth/userUsers/addRoleMenuList`, {
        method: 'post',
        data: params
    });
}
/**
* 权限管理-删除角色
* @param {*} data 
*/
export function dleteRole(params: any) {
    params = {
        appCode: appCode,
        ...params
    }
    return request<any>(baseUrl + `/m-feign-api/auth/userUsers/deleteRole/${params.id}`, {
        method: 'delete',
        data: params
    });
}
/**
 * 权限管理-获取分组列表 根据条件分页筛选
 * @param {*} data 
 */
export function getGroupList(params: any) {
    params = {
        appCode: appCode,
        ...params
    }
    return request<any>(baseUrl + `/m-feign-api/auth/userUsers/getGroupList`, {
        method: 'post',
        data: params
    });
}
/**
* 权限管理-添加组织架构 分组
* @param {*} data 
*/
export function addGroup(params: any) {
    params = {
        appCode: appCode,
        ...params
    }
    return request<any>(baseUrl + `/m-feign-api/auth/userUsers/addGroup`, {
        method: 'post',
        data: params
    });
}
/**
* 权限管理-修改分组
* @param {*} data 
*/
export function updateGroup(params: any) {
    params = {
        appCode: appCode,
        ...params
    }
    return request<any>(baseUrl + `/m-feign-api/auth/userUsers/updateGroup`, {
        method: 'post',
        data: params
    });
}
/**
 * 权限管理-根据分组编码查询 角色集
 * @param {*} data 
 */
export function queryGroupRoleList(params: any) {
    params = {
        appCode: appCode,
        ...params
    }
    return request<any>(baseUrl + `/m-auth2/userMapGroupRole/queryGroupRoleList`, {
        method: 'get',
        params
    });
}
/**
 * 权限管理-根据appCode 查询角色集
 */
export function userRoles() {
    const params = {
        appCode: appCode,
    }
    return request<any>(baseUrl + `/m-auth2/userRoles/list`, {
        method: 'get',
        params
    });

}
/**
 * 权限管理-分配 分组 角色 对应关联关系
 * @param {*} data 
 */
export function addGroupRole(params: any) {
    params = {
        appCode: appCode,
        ...params
    }
    return request<any>(baseUrl + `/m-feign-api/auth/userUsers/addGroupRole`, {
        method: 'post',
        data: params
    });
}
/**
 * 权限管理-解绑角色
 * @param {*} data 
 */
export function deleteUserMapGroupRoleDeleteMapGroupRole(params: any) {
    params = {
        appCode: appCode,
        ...params
    }
    return request<any>(baseUrl + `/m-auth2/userMapGroupRole/deleteMapGroupRole?groupCode=${params.groupCode}&roleCode=${params.roleCode}`, {
        method: 'delete',
    });
}
/**
 * 权限管理-解绑分组
 * @param {*} data 
 */
export function deleteUserMapUserGroupDeleteMapUserGroup(params: any) {
    params = {
        appCode: appCode,
        ...params
    }
    return request<any>(baseUrl + `/m-auth2/userMapUserGroup/deleteMapUserGroup?userId=${params.userId}&groupCode=${params.groupCode}`, {
        method: 'delete',
    });
}
/**
 * 权限管理-修改菜单数据
 * @param {*} param
 */

export const updateMenu = (params: any) => {
    params = {
        appCode: appCode,
        ...params
    }
    return request<any>(baseUrl + `/m-feign-api/auth/userUsers/updateMenu`, {
        method: 'post',
        data: params
    });
}

/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import request, { extend } from 'umi-request';



function setHeader() {
    request.use(async (ctx, next) => {
        const { req } = ctx;
        const { url, options } = req;

        // 判断是否需要添加前缀，如果是统一添加可通过 prefix、suffix 参数配置
        console.log('==options===', options.headers);
        options.headers

        ctx.req.options = {
            ...options,
            headers: {
                test: 'test'
            },
        };
        await next();

        const { res } = ctx;
        const { success = false } = res; // 假设返回结果为 : { success: false, errorCode: 'B001' }
        if (!success) {
            // 对异常情况做对应处理
        }
    });
}
function getRequest() {
    return request
}

export default {
    setHeader: setHeader,
    getRequest: getRequest
};
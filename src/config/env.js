/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = '';
let userBaseUrl = '';
let routerMode = '';
let baseImgPath;

if (process.env.NODE_ENV == 'development') {
	// baseUrl = 'http://118.190.152.1:8081'; /apis
	baseUrl = '/apis';
	userBaseUrl = 'http://118.190.152.1:8084';
    baseImgPath = '';
}else{	
	baseUrl = 'http://192.168.110.78:8800';
	userBaseUrl = 'http://192.168.110.78:8800';
    baseImgPath = '';
}

export {
	baseUrl,
	routerMode,
	baseImgPath,
	userBaseUrl
}

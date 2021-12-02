import Cookies from "js-cookie"

/**
 * 存储Token
 * @param {*} token
 */
export function setToken(token) {
	setCookie('Authorization', token);
}
/**
 * 获取Token
 */
export function getToken() {
	return getCookie('Authorization');
}

/**
 * 删除指定name cookie
 * @param {*} cookName
 */
export function delCookie(cookName = 'Authorization') {
	Cookies.remove(cookName);
}
/**
 * 获取cookie
 */
 export function getCookie(cookName) {
	return Cookies.get(cookName);
}
/**
 * 设置cookie
 */
 export function setCookie(cookName, value) {
	delCookie(cookName);
	Cookies.set(cookName, value, { expires: 30, path: '/' });
}
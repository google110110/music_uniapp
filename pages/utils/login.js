// let LOGIN = false
const LOGIN = ()=>{
	let value = getLogin()
	if(value){
		console.log('已登录')
		return true
	}
	console.log('未登陆')
	return false
}
const setLogin = (value)=>{
	uni.setStorageSync('setUserData',value)
}
const getLogin = ()=>{
	
	let value = uni.getStorageSync('setUserData')
	return value
}
const getUserMessage = ()=>{
	let value = uni.getStorageSync('UserMessage')
	return value
}
const setUserMessage = (mes)=>{
	uni.setStorageSync('UserMessage',mes)
}
export default {
	LOGIN,
	setLogin,
	getLogin,
	getUserMessage,
	setUserMessage
}
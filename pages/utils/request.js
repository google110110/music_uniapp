export default (params) => {
	
	//加载中
	uni.showLoading({
		title:"加载中..."
	})
	
	let url = `https://autumnfish.cn${params.url}`
	let query = {...params, url}
	
	return new Promise((res,rej) => {
		uni.request({
			...query,
			success(data) {
				res(data);
			},
			fail(err) {
				rej(err);
			},
			complete() {
				uni.hideLoading();
			}
		})
	})
}
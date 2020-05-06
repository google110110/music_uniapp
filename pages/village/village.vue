<template>
	<view>
		<view v-if="list.length">
			<wfalls-flow :list="list" ref="wfalls" @finishLoad="getLoadNum"></wfalls-flow>
		</view>
	</view>
</template>

<script>
	// import waterFill from '../../components/xiaohuangya-waterFull/waterFill.vue'
	import wfallsFlow from '../../components/wfalls-flow/wfalls-flow.vue'
	export default {
		data() {
			return {
				hotwall:[],
				list:[],
				i:0
			}
		},
		components:{
			'wfalls-flow':wfallsFlow
		},
		onLoad() {
			this.getHotwall()
		},
		onReachBottom() {
			uni.showToast({
			    title: '正在加载更多',
			    duration: 500,
				icon:'loading'
			});
			if(this.i < 30){
				this.getList()
			}else{
				uni.showToast({
				    title: '先登录再看吧',
				    duration: 2000,
					icon:'none'
				});
			}
		},
		onPullDownRefresh() {
			// 模拟更新新数据
			uni.showToast({title:'刷新成功',icon:'none'})
		},
		methods: {
			 getLoadNum(num){
				console.log('共加载了:'+num);
			},
			getList(){
				let i = this.i
				let hotwall = this.hotwall.slice(i,i+8)
				hotwall = hotwall.map((item)=>{
					return {
						...item,
						name:item.simpleUserInfo.nickname,
						image:item.simpleResourceInfo.songCoverUrl,
						avatar:item.simpleUserInfo.avatar,
					}
				})
				console.log(hotwall,'瀑布流云村热评')
				this.list.push(...hotwall)
				if(this.$refs.wfalls){
					this.$refs.wfalls.handleViewRender();
				}
				this.i = this.i + 8
			},
			getHotwall(){
				this.$request({
					url:'/comment/hotwall/list'
				}).then((data)=>{
					if(data.data.code == 200){
						this.hotwall = data.data.data
						this.getList()
						console.log(this.hotwall,'云村热评')
					}
				})
			},
			getSongUrl(id){
				this.$request({
					url:'/song/url?id='+id
				}).then((data)=>{
					console.log(data)
				})
			}
		}
	}
</script>

<style>

</style>

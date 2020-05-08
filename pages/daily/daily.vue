<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			this.getRefresh()
		},
		methods:{
			get(){
				this.$request({
					url:'/recommend/songs'
				}).then((data)=>{
					console.log(data)
				})
			},
			getRefresh(){
				this.$request({
					url:'/login/status'
				}).then((data)=>{
					console.log(data)
					this.get()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>

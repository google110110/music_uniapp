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
			this.get()
		},
		methods:{
			get(){
				this.$request({
					url:'/recommend/songs'
				}).then((data)=>{
					console.log(data)
				})
			}
		}
	}
</script>

<style lang="scss">

</style>

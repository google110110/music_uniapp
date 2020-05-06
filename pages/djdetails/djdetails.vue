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
		onLoad(pramas) {
			console.log(pramas.id)
			this.getProgramDetail(pramas.id)
		},
		methods:{
			getProgramDetail(id){
				this.$request({
					url:'/dj/program/detail?id='+id
				}).then((data)=>{
					console.log(data)
				})
			}
		}
	}
</script>

<style lang="scss">

</style>

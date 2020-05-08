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
					// url:'/dj/program/detail?id='+id
					// url:'/user/audio?uid='+id
					url:'/user/dj?uid='+id
				}).then((data)=>{
					let url = data.data.programs[29].mainSong.id
					let s = 'https://autumnfish.cn/song/url?id='+url
					console.log(data.data,url)
					console.log(s)
				})
			}
		}
	}
</script>

<style lang="scss">

</style>

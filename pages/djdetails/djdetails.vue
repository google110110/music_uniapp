<template>
	<view>
		<view class="dj-recommend-box">
			<view class="" v-for="(item, index) in programs" :key="index" @click="getlist(item)">
				<list :list="item" ></list>
			</view>
		</view>
	</view>
</template>

<script>
	import list from "@/components/list/index.vue"
	export default {
		data() {
			return {
				programs:[]
			};
		},
		components:{
			list
		},
		onLoad(pramas) {
			console.log(pramas.id)
			this.getProgramDetail(pramas.id)
		},
		methods:{
			getlist(item){
				let s = 'https://autumnfish.cn/song/url?id='+item.mainSong.id
				uni.navigateTo({
					url:'../music/music?id='+item.mainSong.id
				})
				let playlist = this.programs
				playlist = playlist.map((item)=>{
					return {
						...item,
						id:item.mainSong.id,
						name:item.copywriter,
						al:{
							picUrl:item.blurCoverUrl,
							name:item.dj.nickname
						}
					}
				}) 
				playlist = {
					tracks:[...playlist]
				}
				uni.setStorageSync('playlist',playlist)
				console.log(s,item)
			},
			getProgramDetail(id){
				this.$request({
					// url:'/dj/program/detail?id='+id
					// url:'/user/audio?uid='+id
					url:'/user/dj?uid='+id
				}).then((data)=>{
					let programs = data.data.programs
					programs = programs.map((item)=>{
						return {
							...item,
							coverImgUrl:item.dj.backgroundUrl,
							copywriter:item.name
						}
						
					})
					this.programs = programs
					console.log(programs)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.dj-recommend-box{
		display: flex;
		flex-wrap: wrap;
		width: 750rpx;
		box-sizing: border-box;
		&>view{
			float: left;
		}
	}
</style>

<template>
	<view>
		<view class="">
			<view class="" v-for="(item, index) in recommend" :key="index">
				<song :song="item" :getsong="getsong1"></song>
			</view>
		</view>
	</view>
</template>

<script>
	import song from '@/components/song/index.vue'
	export default {
		data() {
			return {
				recommend:[]
			};
		},
		components: {song},
		onLoad() {
			this.getRecommend()
		},
		methods:{
			getRecommend(){
				this.$request({
					url:'/recommend/songs'
				}).then((data)=>{
					if(data.data.code == 200){
						let recommend = data.data.recommend
						recommend = recommend.map((item)=>{
							return {
								...item,
								picUrl:item.album.blurPicUrl,
								song:{
									artists:[
										{
											name:item.album.artists[0].name
										}
									]
								}
							}
						})
						this.recommend = recommend
						console.log(data.data.recommend)
					}
				})
			},
			getsong1(id){
				// uni.setStorageSync('playlist',this.songs)
				let songs = this.recommend
				songs = songs.map((item)=>{
					return {
						...item,
						al:{
							picUrl:item.picUrl,
							
						}
					}
				})
				songs = {
					tracks:[...songs]
				}
				console.log(songs,'getsong1新歌')
				uni.setStorageSync('playlist',songs)
				uni.navigateTo({
					url: `../music/music?id=`+id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>

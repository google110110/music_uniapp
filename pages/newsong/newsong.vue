<template>
	<view class="morenewsong">
		<view class="morenewsong-tit">
			新歌共{{songs.length}}首
		</view>
		<view class="swiper-item">
			<view class="" v-for="(item, index) in songs" :key="index">
				<song :song="item" :getsong="getsong1"></song>
			</view>
		</view>
		<view class="morenewsong-tit">
			新碟共{{dishs.length}}首
		</view>
		<view class="swiper-item">
			<view class="" v-for="(item, index) in dishs" :key="index">
				<song :song="item" :getsong="getsong2"></song>
			</view>
		</view>
	</view>
</template>

<script>
	import song from '@/components/song/index.vue'
	
	export default {
		data() {
			return {
				songs:[],
				dishs:[],
				offset:0,
				flag:false
			};
		},
		onLoad() {
			this.newsongs()
			this.dish()
		},
		onReachBottom() {
			if(this.flag){
				this.dish()
			}
		},
		components: {song},
		methods:{
			newsongs(){
				this.$request({
					url:'/personalized/newsong'
				}).then((data) => {
					if(data.data.code == 200){
						this.songs = data.data.result
						console.log('推荐歌曲',this.songs)
					}
				})
			},
			getsong(id){
				uni.navigateTo({
					url: `../music/music?id=`+id
				})
			},
			getsong1(id){
				// uni.setStorageSync('playlist',this.songs)
				let songs = this.songs
				songs = songs.map((item)=>{
					return {
						...item,
						hhh:'1111',
						al:{
							picUrl:item.picUrl,
							
						}
					}
				})
				songs = {
					tracks:[...songs]
				}
				console.log(songs)
				uni.setStorageSync('playlist',songs)
				uni.navigateTo({
					url: `../music/music?id=`+id
				})
			},
			getsong2(id){
				// uni.setStorageSync('playlist',this.songs)
				let songs = this.dishs
				songs = songs.map((item)=>{
					return {
						...item,
						hhh:'1111',
						al:{
							picUrl:item.picUrl,
							
						}
					}
				})
				songs = {
					tracks:[...songs]
				}
				console.log(songs)
				uni.setStorageSync('playlist',songs)
				uni.navigateTo({
					url: `../music/music?id=`+id
				})
			},
			dish(){
				this.$request({
					url:"/top/album?offset="+this.offset+"&limit=8"
				}).then((data)=>{
					if(data.data.code == 200){
						let dishs = data.data.albums
						if(dishs.length >= 8){
							this.flag = true
						}else{
							this.flag = false
						}
						this.offset = this.offset + 8
						dishs = dishs.map((item)=>{
							return {
								id : item.id,
								picUrl : item.picUrl,
								name : item.name,
								song : {
									artists:[{
										...item.artists[0]
									}]
								}
							}
						})
						this.dishs.push(...dishs)
						console.log('推荐歌单',dishs)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
.morenewsong{
	.morenewsong-tit{
		color: #3e3e3e;
		margin-top: 30rpx;
		line-height: 60rpx;
		font-size: 32rpx;
		padding: 0 50rpx;
		font-weight: bold;
	}
}
</style>

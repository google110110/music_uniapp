<template>
	<view class="moresonglist">
		<view class="moresonglist-tit">
			这里有更多好听的歌单！
		</view>
		<view class="moresonglist-list">
			<view class=""  v-for="(item, index) in result" :key="index" @click="navigateTo(item.id)">
				<songslist :songs_list="item"></songslist>
			</view>
		</view>
	</view>
</template>

<script>
	import songslist from '@/components/songslist/index.vue'
	export default {
		data() {
			return {
				result:[],
				limit:15,
				flag:false
			};
		},
		components: {songslist},
		onLoad() {
			this.recommendList(this.limit)
		},
		onReachBottom() {
			if(this.flag){
				this.limit = this.limit + 6
				this.recommendList(this.limit)
			}
		},
		methods:{
			recommendList(limit){
				this.$request({
					url:'/personalized?limit='+limit
				}).then((data) => {
					if(data.data.code == 200){
						if(data.data.result.length >= 6){
							this.flag = true
						}else{
							this.flag = false
						}
						this.result.push(...data.data.result)
						console.log('推荐歌单',data.data.result)
					}
				})
			},
			navigateTo(id){
				uni.navigateTo({
					url: `../playlist/playlist?id=`+id
				})
			},
		}
	}
</script>

<style lang="scss">
	.moresonglist{
		.moresonglist-tit{
			color: #C0C0C0;
			margin-top: 20rpx;
			line-height: 50rpx;
			font-size: 32rpx;
			padding: 0 50rpx;
			font-weight: bold;
		}
		.moresonglist-list{
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			&>view{
				margin-top: 50rpx;
				text-align: center;
				width: 220rpx;
				height: 220rpx;
				margin: 10rpx;
			}
		}
	}
</style>

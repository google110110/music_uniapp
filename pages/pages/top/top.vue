<template>
	<view class="top">
		<view class="top-tit">官方榜</view>
		<view class="" v-for="(item, index) in list" :key="item.id">
			<view v-if="item.ToplistType" class="top-gf">
				<view class="" @click="getlist(item.id)">
					<image :src="item.coverImgUrl" mode=""></image>
					<view class="sl">
							{{item.description}}
					</view>
				</view>
				<view class="">
					<view class="" v-for="(items, index) in item.tracks" :key="index">
						<view class="sl">
							{{items.first}} · {{items.second}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="top-tit mar-top-50">推荐榜</view>
		<view class="top-box">
			<view class="" v-for="(item, index) in list" :key="index">
				<view class="" v-if="item.trackCount >= 100 && !item.ToplistType">
					<lists :list="item" :getlist="getlist"></lists>
				</view>
			</view>
		</view>
		<view class="top-tit mar-top-50">更多榜单</view>
		<view class="top-box">
			<view class="" v-for="(item, index) in list" :key="index">
				<view class="" v-if="item.trackCount < 100 && !item.ToplistType">
					<lists :list="item" :getlist="getlist"></lists>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import lists from "@/components/list/index.vue"
	export default {
		data() {
			return {
				list:{}
			};
		},
		components:{
			lists
		},
		onLoad() {
			this.toplist()
		},
		methods:{
			toplist(){
				this.$request({
					url:"/toplist/detail"
				}).then((data) => {
					if(data.data.code == 200){
						console.log(data.data.list,data.data)
						this.list = data.data.list.map((item)=>{
							return {
								...item,
								'copywriter' : item.name
							}
						})
					}
				})
			},
			getlist(id){
				uni.navigateTo({
					url: `../playlist/playlist?id=`+id
				})
				// uni.setStorageSync('playlist',this.playlists)
			}
		}
	}
</script>

<style lang="scss">
.top{
	background-color: #121b2b;
	opacity: 0.8;
	color: #ffffff;
	.top-tit{
		line-height: 50rpx;
		padding: 10rpx 30rpx;
		font-size: 35rpx;
		font-weight: bold;
		letter-spacing:8rpx;
	}
	.top-gf{
		height: 200rpx;
		display: flex;
		&>view{
			box-sizing: border-box;
			padding: 20rpx;
		}
		&>view:first-child{
			width: 200rpx;
			height: 200rpx;
			position: relative;
			image{
				width: 160rpx;
				height: 160rpx;
				border-radius: 10rpx;
			}
			&>view{
				width: 200rpx;
				box-sizing: border-box;
				position: absolute;
				bottom: 30rpx;
				left: 0;
				color: white;
				line-height: 30rpx;
				padding: 0 30rpx;
				font-size: 20rpx;
			}
		}
		&>view:last-child{
			flex: 1;
			height: 200rpx;
			display: flex;
			justify-content: center;
			// align-items: center;
			flex-direction: column;
			line-height: 50rpx;
			font-size: 26rpx;
		}
	}
	.top-box{
		display: flex;
		flex-wrap: wrap;
		width: 750rpx;
		box-sizing: border-box;
		&>view{
			float: left;
		}
	}
	.mar-top-50{
		margin-top: 50rpx;
	}
}
</style>

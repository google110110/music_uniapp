<template>
	<view class="item-list">
		<image :src="songs_list.picUrl" mode=""></image>
		<view class="list-name sl">
			{{songs_list.name}}
		</view>
		<view class="playCount">
			▷{{songs_list.playCount | playCount}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props:['songs_list'],
		filters:{
			playCount(cont){
				return Math.floor(cont / 10000) + '万'
			}
		},
		mounted() {
		}
	}
</script>

<style lang="scss">
		.item-list{
			text-align: center;
			width: 220rpx;
			height: 220rpx;
			margin: 10rpx;
			position: relative;
			border-radius: 10rpx;
			overflow: hidden;
			image{
				position: relative;
				width: 100%;
				height: 100%;
			}
			.list-name{
				box-sizing: border-box;
				padding: 0 10rpx;
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				line-height: 40rpx;
				background-color: rgba(88, 88, 88, 0.6);
				color: white;
				font-size: 24rpx;
			}
			.playCount{
				padding-right: 10rpx;
				padding-top: 5rpx;
				position: absolute;
				right: 0;
				top: 0;
				color: white;
				line-height: 30rpx;
				font-size: 20rpx;
			}
		}
</style>

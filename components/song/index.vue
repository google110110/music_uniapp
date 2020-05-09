<template>
	<view>
		<view class="song-box" @click="getsong(song.id)">
			<view class="song-img">
				<image :src="song.picUrl" mode=""></image>
			</view>
			<view class="song-name sl">
				{{song.name}}
			</view>
			<view class="song-zz sl">
				{{song.song.artists[0].name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			song:{
				type:Array/Object ,
				default(){
					return[]
				}
			},
			getsong:{
				type:Function,
				default:function(){}
			}
		},
		mounted() {
		}
	}
</script>

<style lang="scss">
.song-box{
	height: 161rpx;
	width: 750rpx;
	box-sizing: border-box;
	padding: 10rpx 10rpx;
	border-radius: 14rpx;
	border-top: 1rpx solid #d6d6d6;
	display: flex;
	line-height: 100rpx;
	&>view{
		margin-right: 20rpx;
	}
	.song-img{
		margin-left: 20rpx;
		width: 140rpx;
		height: 140rpx;
		overflow: hidden;
		border-radius: 14rpx;
		image{
			width: 100%;
			height: 100%;
			border-radius: 14rpx;
		}
	}
	.song-name{
		font-size: 24rpx;
		font-weight: bold;
		flex: 1;
	}
	.song-zz{
		width: 140rpx;
		font-size: 24rpx;
		float: right;
	}
}
</style>

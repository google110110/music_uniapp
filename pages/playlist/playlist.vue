<template>
	<view class="playlist-box" v-if="playlist.id">
		<view class="bg" :style="{'background-image':'url('+playlist.coverImgUrl+')'}"></view>
		<view class="playlist-header">
			<view class="playlist-header-img">
				<image :src="playlist.coverImgUrl" mode=""></image>
			</view>
			<view class="playlist-header-tit">
				<view class="playlist-header-tit-ont sl">
					{{playlist.name}}
				</view>
				<view class="playlist-header-tit-message">
					{{playlist.description}}
				</view>
			</view>
		</view>
		<view class="playlist-cont">
			<view class="" v-for="(item, index) in playlist.tracks" :key="index" @click="getsong(item.id,index)">
				<view class="playlist-cont-index sl">
					{{index}}
				</view>
				<view class="playlist-cont-messge sl">
					<view class="playlist-cont-name sl">
						{{item.name}}
					</view>
					<view class="playlist-cont-n sl">
						{{item.ar[0].name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				playlist:{}
			};
		},
		onLoad(params) {
			this.getdetail(Number(params.id))
		},
		methods:{
			getdetail(id){
				this.$request({
					url:'/playlist/detail?id='+id
				}).then((data)=>{
					if(data.data.code = 200){
						this.playlist = data.data.playlist
						console.log(data.data.playlist,id)
						uni.setNavigationBarTitle({
							title:this.playlist.name
						})
					}
				})
			},
			getsong(id){
				uni.navigateTo({
					url:'../music/music?id='+id
				})
				uni.setStorageSync('playlist',this.playlist)
			}
		}
	}
</script>

<style lang="scss">
.playlist-box{
	// background-color: #17243a;
	opacity: 0.9;
	// color: #232323;
	position: relative;
	.bg{
		width: 100vw;
		height: calc(100%);
		position: fixed;
		top: 0rpx;
		left: 0;
		z-index: -1;
		filter: blur(2px);
		opacity: 0.4;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
	// min-height: calc(100vh-100rpx);
	.playlist-header{
		background-color: rgba(0,0,0,0.5);
		display: flex;
		width: 750rpx;
		height: 300rpx;
		.playlist-header-img{
			width: 300rpx;
			height: 300rpx;
			box-sizing: border-box;
			padding: 50rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.playlist-header-tit{
			width: 450rpx;
			font-size: 30rpx;
			line-height: 50rpx;
			&>view{
				width: 100%;
			}
			.playlist-header-tit-ont{
				height: 100rpx;
				font-size: 32rpx;
				font-weight: 580;
				line-height: 130rpx;
			}
			.playlist-header-tit-message{
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
			}
		}
	}
	.playlist-cont{
		font-size: 20rpx;
		&>view{
			display: flex;
			border-top: 1rpx #C0C0C0 solid;
			width: 750rpx;
			height: 80rpx;
			line-height: 40rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			&>view:first-child{
				width: 80rpx;
				line-height: 80rpx;
				font-size: 30rpx;
			}
			&>view:last-child{
				flex: 1;
			}
			.playlist-cont-name{
				font-size: 30rpx;
			}
			.playlist-cont-n{
				line-height: 30rpx;
				margin-left: 5rpx;
			}
		}
	}
}
</style>

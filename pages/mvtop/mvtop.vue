<template>
	<view class="top-mv">
		<view class="top-mv-tit">
			MV排行榜榜单
		</view>
		<view class="mvvm-mv">
			<!-- <my-ideos :url="mvurl" :autoplay="false"></my-ideos> -->
			<view class="" v-for="(item, index) in top" :key="index">
				<view class="video-img">
					<view class="video-play" v-show="flag != item.id" @click="videoPlay(item.id)">
						<image class="" src="../../static/tabs/mv.png" mode=""></image>
					</view>
					<image v-show="flag != item.id" :src="item.cover" mode=""></image>
					<video class="mv-video" v-if="flag == item.id" :src="src" controls autoplay page-gesture show-fullscreen-btn @error="error"></video>
				</view>
				<view class="video-tit sl" hover-class="video-tit-red" @click="getmv(item.id)">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				offset:0,
				top:[],
				before:true,
				flag:0
			};
		},
		onLoad() {
			this.getMvTop()
		},
		onReachBottom() {
			if(this.before){
				this.getMvTop()
			}
		},
		methods:{
			videoPlay(id){
				this.$request({
					url:"/mv/url?id="+id
				}).then((data)=>{
					if(data.data.code == 200){
						this.src = data.data.data.url
						this.flag = id
						console.log(this.src)
					}
				})
			},
			error(){
				uni.showModal({
					content: '视频加载错误',
					showCancel: false
				})
			},
			getmv(id){
				uni.navigateTo({
					url: `../mvdetails/mvdetails?id=`+id
				})
			},
			getMvTop(){
				this.$request({
					url:'/top/mv?limit=5&offset='+this.offset
				}).then((data)=>{
					if(data.data.code == 200){
						let top = data.data.data
						if(top.length < 5){
							this.before = false
						}
						this.top.push(...top)
						this.offset = this.offset+5
						console.log(this.top ,'最新mv')
					}
				})
			},
		}
	}
</script>

<style lang="scss">
.top-mv{
	.top-mv-tit{
		line-height: 80rpx;
		font-size: 32rpx;
		color: #C0C0C0;
		width: 100%;
		text-align: center;
		font-weight: 600;
	}
	.mvvm-mv{
		padding: 0rpx 10rpx;
		width: 100%;
		box-sizing: border-box;
		// height: 500rpx;
		// margin-bottom: 30rpx;
		font-size: 25rpx;
		font-weight: 550;
		line-height: 40rpx;
		color: #6a6a6a;
		&>view{
			border-radius: 15rpx;
		}
		.hover-video{
			background-color: #C0C0C0;
		}
		.video-img{
			margin-top: 50rpx;
			width: 100%;
			height: 400rpx;
			border-radius: 10rpx;
			overflow: hidden;
			position: relative;
			image{
				width: 100%;
				height: 100%;
			}
			.mv-video{
				width: 100%;
				height: 100%;
				// width: 500rpx;
				// height: 300rpx;
			}
			.video-play{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 150rpx;
					height: 120rpx;
				}
			}
		}
		&>view{
			padding: 0 30rpx;
		}
		.video-tit-red{
			color: #faf8f3;
			background-color: #828282;
		}
		.video-tit{
			border-radius: 10rpx;
			height: 70rpx;
			line-height: 70rpx;
			font-size: 30rpx;
		}
	}
}
</style>

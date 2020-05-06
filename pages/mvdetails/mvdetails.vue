<template>
    <view>
        <view class="mydetails">
            <view v-if="mvurl">
					<view class="vvideo">
						<my-ideos :url="mvurl"></my-ideos>
					</view>
					<view class="arrowthinleft" @click="navigateBack">
						<uni-icons type="arrowthinleft" size="25"></uni-icons>
					</view>
					<view class="mv-tit">
						精彩评论
					</view>
					<view class="mv-comments-box">
						<view class="mv-comments" v-for="(item, index) in mvcomment.comments" :key="index">
							<view class="user-avatarUrl">
								<image :src="item.user.avatarUrl" mode=""></image>
							</view>
							<view class="user-cont">
								<view class="user-name sl">
									{{item.user.nickname}}
								</view>
								<view class="user-contt">
									{{item.content}}
								</view>
							</view>
						</view>
					</view>
            </view>
			
        </view>
    </view>
</template>

<script>
	import myVideos from "../../components/myvideo/index.vue"
	export default {
		data() {
			return {
				mvurl:'',
				mvcomment:[]
			};
		},
		components:{
			'my-ideos':myVideos
		},
		onLoad(params) {
			console.log(params.id)
			this.getMvUrl(params.id)
			this.getMvComment(params.id)
		},
		methods:{
			navigateBack(){
				uni.navigateBack({
				    delta: 1
				});
			},
			getMvUrl(id){
				this.$request({
					url:"/mv/url?id="+id
				}).then((data)=>{
					if(data.data.code == 200){
						this.mvurl = data.data.data.url
						console.log(this.mvurl)
					}
				})
			},
			getMvComment(id){
				this.$request({
					url:'/comment/mv?id='+id
				}).then((data)=>{
					if(data.data.code == 200){
						this.mvcomment = data.data
						console.log(this.mvcomment)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.mydetails{
		position: relative;
		.vvideo{
			position: fixed;
			// top: 100rpx;
			top: 0rpx;
			left: 0;
			z-index: 10000;
		}
		.arrowthinleft{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100rpx;
			height: 100rpx;
			position: fixed;
			// top: 100rpx;
			bottom: 100rpx;
			right: 50rpx;
			z-index: 1;
			border-radius: 50%;
			background-color: #C0C0C0;
		}
		.mv-tit{
			margin-top: 400rpx;
			font-size: 30rpx;
			font-weight: bold;
			padding: 20rpx;
			color: #b5b5b5;
		}
		.mv-comments-box{
			.mv-comments{
				box-sizing: border-box;
				padding: 0 30rpx;
				width: 750rpx;
				min-height: 100rpx;
				display: flex;
				&>view{
					box-sizing: border-box;
				}
				.user-avatarUrl{
					padding: 10rpx;
					margin-right: 10rpx;
					image{
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
					}
				}
				.user-cont{
					flex: 1;
					line-height: 50rpx;
					padding: 10rpx;
					border-bottom: 1rpx solid #e6e6e6;
					.user-name{
						height: 70rpx;
						font-size: 20rpx;
						color: #C0C0C0;
					}
					.user-contt{
						font-size: 28rpx;
					}
				}
			}
		}
	}

</style>

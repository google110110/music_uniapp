<template>
	<view class="my-video">
		<video
			class="myVideo"
			:src="url"
		    @error="videoErrorCallback" 
			controls
			page-gesture
			:enable-play-gesture='true'
			vslide-gesture-in-fullscreen
			:autoplay="autoplay"
			show-mute-btn
			></video>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			url:{
				type:String,
				default:''
			},
			autoplay:{
				type:Boolean,
				default:true
			}
		},
		methods:{
			videoErrorCallback: function(e) {
				uni.showModal({
					content: '视频加载错误',
					showCancel: false
				})
			},
		}
	}
</script>

<style lang="scss">
.my-video{
	.myVideo{
		width: 750rpx;
		height: 420rpx;
	}
}
</style>

<template>
	<view class="mv-box" @click="getmv(mv.id)">
		<view class="mv-img">
			<image :src="mv.cover" mode=""></image>
		</view>
		<view class="name sl">
			{{mv.name}}
		</view>
		<view class="artistName sl">
			{{mv.artistName}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:['mv','getmv']
	}
</script>

<style lang="scss">
.mv-box{
	width: 350rpx;
	.mv-img{
		image{
			width: 100%;
			height: 250rpx;
			border-radius: 10rpx;
		}
	}
	.artistName,.name{
		line-height: 40rpx;
		font-size: 25rpx;
		text-align: center;
	}
}
</style>

<template>
	<view class="list-boxs">
		<view @click="getlist(list.dj.userId)">
		    <image :src="list.coverImgUrl" mode=""></image>
			<view class="">
				{{list.copywriter}}
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
		// props:['list'],
		props:{
			list:{
				type:Array/Object ,
				default(){
					return[]
				}
			},
			getlist:{
				type:Function ,
				default:function(){}
			}
		},
		methods:{
			// getlist(id){
			// 	uni.navigateTo({
			// 		url: `../playlist/playlist?id=`+id
			// 	})
			// }
		}
	}
</script>

<style lang="scss">
.list-boxs{
	&>view{
		box-sizing: border-box;
		width: 250rpx;
		padding: 10rpx 10rpx;
		text-align: center;
		font-size: 24rpx;
		border-radius: 10rpx;
		image{
			border-radius: 10rpx;
			width: 230rpx;
			height: 230rpx;
		}
		view{
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
}
</style>

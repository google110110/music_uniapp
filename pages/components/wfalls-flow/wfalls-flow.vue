<template>
	<view class="list-container">
		<view id="wf-list" class="list" v-for="(list,listIndex) of viewList" :key="listIndex">
            <view class="item" v-for="(item,index) of list.list" :key="index" >
                <image @load="handleViewRender" @error="handleViewRender" :src="item.image" mode="widthFix" @click="play(item.simpleResourceInfo.songId)"></image>
                <view class="desc" > 
					<view class="desc-cont">
						<view class="cont">{{item.name}}</view> {{'  :  '+item.content}}
					</view>
					<view class="desc-ava">
						<image :src="item.avatar" mode=""></image>
						<!-- <uni-icons type="heart" size="10"></uni-icons> -->
						<view class="sl">
							{{item.likedCount}} <uni-icons type="heart" size="12"></uni-icons> 
						</view>
					</view>
				</view>
            </view>
        </view>
		<view class="play" v-if="flag" @click="piehuan">
			<image v-show="ppp" src="../../static/music/pause.png" mode=""></image>
			<image v-show="!ppp" src="../../static/music/4.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag:false,
				ppp:true,
		        viewList:[{list:[]},{list:[]}]  //展示到视图的列表数据
			}
		},
        props:{
            list:{
                type:Array, //实际请求获取的列表数据
            }
        },
		methods: {
			play(id){
				console.log(id)
				this.$innerAudioContext.pause()
				this.getSonSrc(id)
				this.$minRadio.autoplay = true
				this.flag = true 
			},
			piehuan(){
				if(this.ppp){
					this.$minRadio.pause()
				}else{
					this.$minRadio.play()
				}
				this.ppp = !this.ppp
			},
			getSonSrc(id){
				this.$request({
					url:'/song/url?id='+id
				}).then((data)=>{
					if(data.data.code == 200){
						let src = data.data.data[0].url
						this.$minRadio.pause()
						this.$minRadio.src = src
						this.$minRadio.play()
					}
				})
			},
            init(){
                this.viewList = [{list:[]},{list:[]}];
                setTimeout(()=>{
                    this.handleViewRender()
                },0)
            },
			handleViewRender(){
                const index = this.viewList.reduce((total,current)=>total + current.list.length,0)
                if(index>this.list.length-1) {
                    // 加载完成触发事件并返回加载过的图片数
                    this.$emit('finishLoad',index)
                    return
                };
                const query = uni.createSelectorQuery().in(this);
                let listFlag = 0;
                query.selectAll('#wf-list').boundingClientRect(data => {
                    listFlag = data[0].bottom - data[1].bottom<0?0:1;
                    this.viewList[listFlag].list.push(this.list[index])
                }).exec()
            },
		},
        mounted() {
            if(this.list.length){
                this.init()
            }
        }
	}
</script>

<style lang="scss" scoped>
    .list-container{
		position: relative;
		.play{
			position: fixed;
			width: 100rpx;
			height: 100rpx;
			right: 50rpx;
			bottom: 200rpx;
			image{
				// box-sizing: border-box;
				width: 100%;
				height: 100%;
				border-radius: 100%;
				border: 5rpx solid #818181;
			}
		}
		display : flex;
		justify-content : space-between;
		align-items:flex-start;
		padding: 0 24rpx;
		padding-top: 30rpx;
		.list{
			width: calc(50% - 8rpx);
			display: flex;
			flex-direction: column;
			.item{
				margin-bottom: 50rpx;
				// border: 1px solid red;
				border-radius: 10rpx;
				overflow: hidden;
				background-color: #f1f1f1;
				image{
					 width: 100%;
				}
				.desc{
					color: #484848;
					margin: 15rpx 0;
					padding: 0 16rpx;
					font-size: 28rpx;
					letter-spacing: 2rpx;
					.desc-cont{
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
						.cont{
							display: inline;
							font-weight: bold;
						}
					}
					.desc-ava{
						// padding: 10rpx;
						margin-top: 20rpx;
						display: flex;
						justify-content: space-around;
						line-height: 50rpx;
						image{
							width: 50rpx;
							height: 50rpx;
							border-radius: 50%;
							
						}
						view{
							letter-spacing: 0;
							text-align: right;
							width: 50%;
						}
					}
				}
			}
		}
	}
</style>
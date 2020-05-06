<template>
	<view class="dj">
		<swiper indicator-dots autoplay circular :interval="3000" class="swiper-banner">
			<swiper-item v-for="(item, index) in banner" :key="index" class="banner">
				<image :src="item.pic" mode=""></image>
				<view class="">
					{{item.typeTitle}}
				</view>
			</swiper-item>
		</swiper>
		<view class="dj-tit">热门分类</view>
		<swiper class="swiper-catelist" :duration="1000" :style="{'height':'120rpx'}">
			<swiper-item v-for="(item, index) in catelist" :key="index" class="catelist">
				<view class="" v-for="(items, index) in item" :key="index" @click="navigateTo(items.id)">
					<image :src="items.pic56x56Url" mode=""></image>
					<view class="sl">
						{{items.name}}
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="dj-tit">电台推荐<view class="fw-n">({{recommend.name}})</view></view>
		<view class="dj-recommend-box">
			<view class="" v-for="(item, index) in djRadios" :key="index">
				<list :list="item" :getlist="getlist"></list>
			</view>
		</view>
		<view class="dj-tit">新晋电台榜/热门电台榜</view>
		<view class="dj-recommend-box">
			<view class="" v-for="(item, index) in djtoplist" :key="index">
				<list :list="item" :getlist="getlist"></list>
			</view>
		</view>
		<view class="dj-tit">热门电台</view>
		<view class="dj-recommend-box">
			<view class="" v-for="(item, index) in djhot" :key="index">
				<list :list="item" :getlist="getlist"></list>
			</view>
		</view>
	</view>
</template>

<script>
	import list from "@/components/list/index.vue"
	export default {
		data() {
			return {
				banner:{},
				catelist:{},
				recommend:{},
				djRadios:{},
				djtoplist:{},
				djhot:{}
			};
		},
		components:{
			'list':list
		},
		onLoad() {
			this.getbanner()
			this.getcatelist()
			this.getrecommend()
			this.getdjtoplist()
			this.getdjhot()
		},
		methods:{
			getbanner(){
				this.$request({
					url:'/dj/banner'
				}).then((data) => {
					if(data.data.code == 200){
						this.banner = data.data.data
						console.log(data.data.data,'电台轮播')
					}
				})
			},
			getcatelist(){
				this.$request({
					url:'/dj/catelist'
				}).then((data) => {
					if(data.data.code == 200){
						let catelist = data.data.categories
						let i = 0
						let cata = []
						let catas = []
						let length = catelist.length-1
						catelist = catelist.map((item,index) => {
							if(i < 4 && index != length){
								cata.push(item)
								i++
							}else{
								catas = cata
								i = 0
								cata = []
								return catas
							}
						})
						catelist = catelist.filter((item)=>{
							return item
						})
						this.catelist = catelist
						console.log(data.data.categories,catelist,'电台分类')
					}
				})
			},
			getrecommend(){
				this.$request({
					url:'/dj/recommend'
				}).then((data) => {
					if(data.data.code == 200){
						let recommend = data.data
						let i = 0
						let djRadios = recommend.djRadios.map((item)=>{
							if(i < 3){
								i++
								return {
									...item,
									coverImgUrl : item.picUrl
								}
							}
						})
						djRadios = djRadios.filter(item => item)
						this.djRadios = djRadios
						this.recommend = recommend
						console.log(data.data,'电台推荐')
					}
				})
			},
			getdjtoplist(){
				this.$request({
					url:'/dj/toplist?type=new&limit=3'
				}).then((data) => {
					if(data.data.code == 200){
						let djtoplist = data.data.toplist
						djtoplist = djtoplist.map((item)=>{
							return {
								...item,
								coverImgUrl:item.picUrl,
								copywriter:item.name 
							}
						})
						this.djtoplist = djtoplist
						console.log(data.data.toplist,'热门电台榜')
					}
				})
			},
			getdjhot(){
				this.$request({
					url:'/dj/hot?limit=7'
				}).then((data) => {
					if(data.data.code == 200){
						let djhot = data.data.djRadios
						djhot = djhot.map((item)=>{
							return{
								...item,
								coverImgUrl:item.picUrl
							}
						})
						this.djhot = djhot
						console.log(data.data.djRadios,'热门电台')
					}
				})
			},
			navigateTo(id){
				uni.navigateTo({
					url: `../djtype/djtype?id=`+id
				})
			},
			getlist(id){
				// uni.navigateTo({
				// 	url: `../djdetails/djdetails?id=`+id
				// })
				if(this.$login.LOGIN()){
					uni.navigateTo({
						url: `../djdetails/djdetails?id=`+id
					})
				}else{
					// uni.showToast({
					//     title: '请先登录',
					//     duration: 2000
					// })
					uni.showModal({
					    title: '游客状态',
					    content: '请先登录',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
								uni.switchTab({
									url: `../me/me`
								})
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			}
		}
	}
</script>

<style lang="scss">
.dj{
	.fw-n{
		color: #b4b4b4;
		display: inline;
		font-size: 18rpx;
		font-weight: normal;
	}
	.dj-tit{
		margin-top: 30rpx;
		line-height: 80rpx;
		padding: 0 40rpx;
		font-size: 30rpx;
		font-weight: bold;
	}
	.swiper-banner{
		.banner{
			position: relative;
			image{
				height: 100%;
				width: 94vw;
				margin-left: 3vw;
				border-radius: 10rpx;
			}
			view{
				color: white;
				position: absolute;
				bottom: 0;
				right: 5vw;
				line-height: 30rpx;
				font-size: 20rpx;
				font-weight: bold;
				letter-spacing: 8rpx;
				padding: 10rpx;
			}
		}
	}
	.swiper-catelist{
		.catelist{
			display: flex;
			justify-content: center;
			&>view{
				width: 100rpx;
				height: 100rpx;
				box-sizing: border-box;
				// padding: 0 30rpx;
				text-align: center;
				margin: 0 35rpx;
				image{
					width: 70rpx;
					height: 70rpx;
					// border-radius: 50%;
				}
				&>view{
					width: 100rpx;
					font-size: 15rpx;
					line-height: 30rpx;
					text-align: center;
				}
			}
		}
	}
	.dj-recommend-box{
		display: flex;
		flex-wrap: wrap;
		width: 750rpx;
		box-sizing: border-box;
		&>view{
			float: left;
		}
	}
}
</style>

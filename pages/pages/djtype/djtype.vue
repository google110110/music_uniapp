<template>
	<view class="djtype">
		<view class="djtype-tit">{{name}}</view>
		<view class="djtype-box">
			<view class="" v-for="(item, index) in djRadios" :key="index">
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
				djRadios:[],
				offset:0,
				name:"",
				id:0,
				flag:false
			};
		},
		components:{
			'list':list
		},
		onLoad(pramas) {
			console.log(pramas.id)
			this.id = pramas.id
			this.getDjRadioHot(this.id,6)
		},
		onReachBottom() {
			if(this.flag){
				this.getDjRadioHot(this.id,3)
			}
			// this.getDjRadioHot(this.id,3)
		},
		methods:{
			getDjRadioHot(id,limit){
				this.$request({
					url:'/dj/radio/hot?cateId='+id+'&limit='+limit+'&offset='+this.offset
				}).then((data)=>{
					if(data.data.code == 200){
						let djRadios = data.data.djRadios
						if(djRadios.length >= (limit+6)){
							this.flag = true
						}else{
							this.flag = false
						}
						djRadios = djRadios.map((item)=>{
							return {
								...item,
								coverImgUrl:item.picUrl,
								copywriter:item.desc || item.name
							}
						})
						this.offset++
						this.djRadios.push(...djRadios)
						this.name = djRadios[0].category
						uni.setNavigationBarTitle({
							title:djRadios[0].category
						})
						console.log(this.djRadios,'电台分类')
					}
				})
			},
			getlist(id){
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
	.djtype{
		.djtype-tit{
			width: 750rpx;
			box-sizing: border-box;
			// background-color: #333333;
			margin-top: 30rpx;
			line-height: 80rpx;
			padding: 0 40rpx;
			font-size: 30rpx;
			font-weight: bold;
		}
		.djtype-box{
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

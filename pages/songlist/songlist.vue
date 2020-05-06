<template>
	<view class="list-type">
		<ms-tabs :list="list" v-model="active" :lineAnimated="false"></ms-tabs>
		<view class="list-box">
		    <view v-for="(item, index) in playlists" :key="index">
		        <!-- <image :src="item.coverImgUrl" mode=""></image>
				<view class="">
					{{item.copywriter}}
				</view> -->
				<list :list="item" :getlist="getlist"></list>
		    </view>
		</view>
	</view>
</template>

<script>
	import msTabs from '../../components/ms-tabs/ms-tabs.vue'
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import list from "@/components/list/index.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	export default {
		
		data() {
			return {
				list: [],
				active : 0,
				before : 0,
				playlists:{},
				cat:''
			}
		},
		components:{
			'ms-tabs' : msTabs,
			'uni-grid':uniGrid,
			'uni-grid-item':uniGridItem,
			'list':list
		},
		comments:{
		},
		watch:{
			active() {
				let type  = this.list[this.active]
				this.getlisttype(type.title)
			}
		},
		onLoad() {
			this.getsonglist()
		},
		onReachBottom() {
			if(this.before){
				this.getlisttype(this.cat,this.before)
			}
		},
		methods: {
			getsonglist(){
				this.$request({
					url:'/playlist/hot'
				}).then((data)=>{
					if(data.data.code = 200){
						let list = data.data.tags 
						this.getlisttype(list[0].name)
						list = list.map((item)=>{
							return {
								title:item.name,
								id:item.id
								}
						})
						this.list = list
						console.log(data.data.tags,list)
					}
				})
			},
			getlisttype(cat,before){
				let url = ''
				if(before){
					url = '/top/playlist/highquality?cat='+cat+'&limit=9&before='+before
				}else{
					url = '/top/playlist/highquality?cat='+cat+'&limit=12'
				}
				this.$request({
					url:url
				}).then((data)=>{
					if(data.data.code = 200){
						let list =  data.data.playlists
						if(this.cat == cat){
							this.playlists = [
								...this.playlists,
								...list
							]
							if(list[8]){
								this.before = list[8].updateTime
							}else{
								this.before = ''
							}
							console.log(list,cat)
						}else{
							this.cat = cat
							this.playlists = list
							if(list[11]){
								this.before = list[11].updateTime
							}else{
								this.before = ''
							}
							console.log(list,cat)
						}
					}
				})
			},
			getlist(id){
				uni.navigateTo({
					url: `../playlist/playlist?id=`+id
				})
				// uni.setStorageSync('playlist',this.playlists)
			}
		},
		
	}
</script>

<style lang="scss">
	.list-type{
		.list-box{
			display: flex;
			flex-wrap: wrap;
			width: 750rpx;
			box-sizing: border-box;
			// justify-content: center;
			&>view{
				float: left;
				// box-sizing: border-box;
				// width: 250rpx;
				// padding: 10rpx 10rpx;
				// text-align: center;
				// font-size: 24rpx;
				// border-radius: 10rpx;
				// image{
				// 	border-radius: 10rpx;
				// 	width: 230rpx;
				// 	height: 230rpx;
				// }
				// view{
				// 	overflow: hidden;
				// 	text-overflow: ellipsis;
				// 	display: -webkit-box;
				// 	-webkit-line-clamp: 2;
				// 	-webkit-box-orient: vertical;
				// }
			}
		}
	}

</style>

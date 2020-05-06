<template>
	<view class="seach">
		<!-- 设置圆角 -->
		<uni-search-bar :radius="100" @confirm="search" @input="input" cancelButton="none" ref="search"></uni-search-bar>
		<view class="" v-if="songlist.length">
			<view class="hotseach-tit">
				搜索结果
			</view>
			<view class="searchlist-item" v-for="(item, index) in songlist" :key="index" @click="getnavsong(item)">
				<view class="searchlist-item-index">
					{{index+1}}
				</view>
				<view class="searchlist-item-cont">
					<view class="sl">
						{{item.name}}
					</view>
					<view class="sl">
						{{item.artists[0].name}}
					</view>
				</view>
				<view class="searchlist-item-score">
					{{item.score}}
				</view>
			</view>
		</view>
		
		<view class="" v-else-if="searchlist.length">
			<view class="hotseach-tit">
				搜索提示
			</view>
			<view class="searchlist-item" v-for="(item, index) in searchlist" :key="index" @click="getnavsong(item)">
				<view class="searchlist-item-index">
					{{index+1}}
				</view>
				<view class="searchlist-item-cont">
					<view class="sl">
						{{item.name}}
					</view>
					<view class="sl">
						{{item.artists[0].name}}
					</view>
				</view>
				<view class="searchlist-item-score">
					{{item.score}}
				</view>
			</view>
		</view>
		<view class="" v-else>
			<view class="hotseach-tit">
				热搜榜
			</view>
			<view class="searchlist-item" v-for="(item, index) in hotsearchlist" :key="index" @click="getSearchSong(item.searchWord)">
				<view class="searchlist-item-index">
					{{index+1}}
				</view>
				<view class="searchlist-item-cont">
					<view class="sl">
						{{item.searchWord}}
					</view>
					<view class="sl">
						{{item.content}}
					</view>
				</view>
				<view class="searchlist-item-score">
					{{item.score}}
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	export default {
		data() {
			return {
				hotsearchlist:[],
				searchlist:[],
				songlist:[],
				settime:''
			};
		},
		components: {uniSearchBar},
		onLoad() {
			this.getHotSearch()
		},
		methods:{
			getnavsong(item){
				let playlist = {
					...item,
					al:{
						name:item.artists[0].name,
						picUrl:item.artists[0].img1v1Url,
					}
				}
				playlist = {
					tracks:[
						playlist
					]
				}
				console.log(playlist)
				uni.setStorageSync('playlist',playlist)
				this.$playMusic.audioWay = 2
				uni.navigateTo({
					url:'../music/music?id='+item.id
				})
			},
			search(e){
				let value = e.value.trim()
				console.log(value,'要搜索的值是')
				if(value){
					this.getSearchSong(value)
				}else{
					uni.showToast({
					    title: '请输入名字在搜索',
					    duration: 2000,
						icon:'none'
					});
				}
			},
			input(e){
				console.log(e.value,'要搜索的值是')
				let value = e.value.trim()
				clearTimeout(this.settime)
				this.settime = setTimeout(()=>{
					this.getSearch(value)
				},1000)
			},
			getSearchSong(keywords){
				this.$request({
					url:'/search?keywords='+keywords
				}).then((data)=>{
					if(data.data.code == 200){
						console.log(data.data)
						let s = data.data.result.songs
						if(s){
							this.searchlist = s
							console.log(this.searchlist)
						}else{
							uni.showToast({
							    title: '没有搜到',
							    duration: 2000,
								icon:'none'
							});
						}
					}else{
						console.log('搜索失败')
					}
				})
			},
			getSearch(keywords){
				this.$refs['search'].searchVal = keywords
				console.log(this.$refs['search'],'-------',keywords)
				this.$request({
					url:'/search/suggest?keywords='+keywords
				}).then((data)=>{
					if(data.data.code == 200){
						console.log(data.data)
						let s = data.data.result.songs
						if(s){
							this.searchlist = s
							console.log(this.searchlist)
						}else{
							uni.showToast({
							    title: '没有搜到',
							    duration: 2000,
								icon:'none'
							});
						}
					}else{
						console.log('搜索失败')
					}
				})
			},
			getHotSearch(){
				this.$request({
					url:'/search/hot/detail'
				}).then((data)=>{
					if(data.data.code == 200){
						this.hotsearchlist = data.data.data
						console.log(this.hotsearchlist,'热门搜索')
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.seach{
	.hotseach-tit{
		font-size: 35rpx;
		padding: 20rpx 40rpx;
		font-weight: bold;
	}
	.searchlist-item{
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0rpx;
		height: 100rpx;
		width: 100%;
		.searchlist-item-index{
			width: 100rpx;
			line-height: 100rpx;
			text-align: center;
			font-size: 30rpx;
			color: #007AFF;
		}
		.searchlist-item-cont{
			flex: 1;
			text-align: left;
			width:400rpx;
			&>view:first-child{
				font-weight: bold;
				font-size: 35rpx;
				line-height: 60rpx;
			}
			&>view:last-child{
				font-size: 25rpx;
				line-height: 40rpx;
			}
		}
		.searchlist-item-score{
			margin-right: 20rpx;
			text-align: right;
			font-size: 20rpx;
			color: #d3d3d3;
		}
	}
}
</style>

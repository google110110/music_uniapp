<template>
	<view class="me-box">
		<view class="user" v-if="log">
			<!-- <view class="bg"  :style="bgimage">
				
			</view> -->
			<view class="bg" :style="{'background-image':'url('+user.profile.backgroundUrl+')'}"></view>
			<view class="ava">
				<image :src="user.profile.avatarUrl" mode=""></image>
			</view>
			<view class="name">
				{{user.profile.nickname}}
			</view>
			<!-- <view class="bir">
				uid :  {{user.profile.userId}}
			</view> -->
			<!-- <view class="bir">
				生日 : {{user.birthday}}
			</view> -->
			<view class="sc">
				收藏歌单
			</view>
			<!-- <swiper class="me-swiper">
				<swiper-item v-for="(item, index) in swiperList" :key="index">
					<view v-for="(items, index) in item" :key="index">
						<view class="">{{items.name}}</view>
					</view>
				</swiper-item>
			</swiper> -->
			<swiper class="me-swiper">
				<swiper-item v-for="(item, index) in swiperList" :key="index" class="me-swiper-item">
					<view>
						<view v-for="(items, index) in item" :key="index" :style="{'background-image':'url('+items.coverImgUrl+')'}" @click="getsonglist(items.id)">
							<view class="sl">{{items.name}}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class=" zx">
				<wButton
					text="注 销"
					:rotate="isRotate" 
					@click.native="startLogout()"
					class="wbutton"
				></wButton>
			</view>
		</view>
		<view class="login" v-else>
			<view class="content">
				<!-- 头部logo -->
				<view class="header">
					<image src="../../static/login/phone.png"></image>
				</view>
				<!-- 主体表单 -->
				<view class="main">
					<wInput
						v-model="phoneData"
						type="text"
						maxlength="20"
						placeholder="用户名/电话"
					></wInput>
					<wInput
						v-model="passData"
						type="password"
						maxlength="20"
						placeholder="密码"
					></wInput>
				</view>
				<wButton 
					text="登 录"
					:rotate="isRotate" 
					@click.native="startLogin()"
					class="wbutton"
				></wButton>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	export default {
		data() {
			return {
				//logo图片 base64
				phoneData:'', //用户/电话
				passData:'', //密码
				isRotate: false, //是否加载旋转
				log:false,
				user:[],
				playlist:[],
				swiperList:[]
			}
		},
		components:{
			wInput,
			wButton,
		},
		comments:{
			bgimage(){
				return ''
			}
		},
		filters:{
		},
		onLoad() {
			// this.login()
			this.isLogin()
			// this.getLoGin('18843058202','WWXX19980120')
		},
		mounted() {
			_this= this;
		},
		methods: {
			getsonglist(id){
				console.log(id)
				uni.navigateTo({
				    url: "../playlist/playlist?id="+id
				});
			},
			time(time){
				let d = new Date(time); 
				return d.getFullYear() + "." + (d.getMonth()+1) + '.' + d.getDate()
			},
			startLogout(){
				this.isRotate = true
				this.$login.setLogin({})
				this.log = false
				this.isRotate = false
			},
			getUserDetail(uid){
				this.$request({
					url:'/user/detail?uid='+uid
				}).then((data)=>{
					if(data.statusCode == 200){
						console.log(data.data,'用户信息')
						this.getUserPlaylist(uid)
						// this.getUserSubcount()
					}
				})
			},
			getUserPlaylist(uid){
				this.$request({
					url:'/user/playlist?uid='+uid
				}).then((data)=>{
					if(data.statusCode == 200){
						let swiperList = data.data.playlist
						this.playlist = swiperList
						let i = 0
						let list = []
						swiperList = swiperList.map((item,index)=>{
							if(i < 2){
								list.push(item)
								i++
							}
							if( i ==2 || index == swiperList.length - 1){
								let lists = list
								i = 0
								list = []
								return lists
							}
						})
						swiperList = swiperList.filter(item => item)
						this.swiperList = swiperList
						console.log('用户歌单',swiperList)
						this.$login.setUserMessage({
							user:this.user,
							message:this.playlist
						})
					}
				})
			},
			getLoGin(phone,password){
				this.isRotate=true
				this.$request({
					url:'/login/cellphone?phone='+phone+'&password='+password
				}).then((data)=>{
					this.isRotate=false
					if(data.data.code == 200){
						this.log = true
						this.$login.setLogin({
							phoneData:this.phoneData,
							passData:this.passData,
							token:data.data.token
						})
						let user = data.data
						let birthday = this.time(user.profile.birthday)
						user = {
							...user,
							birthday : birthday
						}
						this.user = user
						this.getUserDetail(user.profile.userId)
						console.log(user,'登录信息')
					}else if(data.data.code == 509){
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: '密码输入错误次数太多请稍后再试'
						});
					}else{
						uni.showToast({
						    icon: 'none',
							position: 'bottom',
						    title: '密码错误'
						});
					}
				})
			},
			isLogin(){
				let value = this.$login.getLogin()
				if(value.phoneData && value.passData){
					console.log(this.$login.LOGIN())
					this.getLoGin(value.phoneData,value.passData)
				}
			},
			startLogin(){
				//登录
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.trim().length <11) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '请输入正确的手机号'
				    });
				    return;
				}
			    if (this.passData.trim().length < 1) {
			        uni.showToast({
			            icon: 'none',
						position: 'bottom',
			            title: '密码不能为空'
			        });
			        return;
			    }
				this.getLoGin(this.phoneData,this.passData)
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.me-box{
		@import url("../../components/watch-login/css/icon.css");
		.content {
			display: flex;
			flex-direction: column;
			justify-content:center;
			/* margin-top: 128upx; */
		}
		
		/* 头部 logo */
		.header {
			width:161upx;
			height:161upx;
			box-shadow:0upx 0upx 60upx 0upx rgba(0,0,0,0.1);
			border-radius:50%;
			background-color: #000000; 
			margin-top: 128upx;
			margin-bottom: 72upx;
			margin-left: auto;
			margin-right: auto;
		}
		.header image{
			width:161upx;
			height:161upx;
			border-radius:50%;
		}
		
		/* 主体 */
		.main {
			display: flex;
			flex-direction: column;
			padding-left: 70upx;
			padding-right: 70upx;
		}
		.tips {
			color: #999999;
			font-size: 28upx;
			margin-top: 64upx;
			margin-left: 48upx;
		}
		
		/* 登录按钮 */
		.wbutton{
			margin-top: 96upx;
		}
		
		/* 其他登录方式 */
		.other_login{
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			margin-top: 256upx;
			text-align: center;
		}
		.login_icon{
			border: none;
			font-size: 64upx;
			margin: 0 64upx 0 64upx;
			color: rgba(0,0,0,0.7)
		}
		.wechat_color{
			color: #83DC42;
		}
		.weibo_color{
			color: #F9221D;
		}
		.github_color{
			color: #24292E;
		}
		
		/* 底部 */
		.footer{
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			margin-top: 64upx;
			color: rgba(0,0,0,0.7);
			text-align: center;
			height: 40upx;
			line-height: 40upx;
		}
		.footer text{
			font-size: 24upx;
			margin-left: 15upx;
			margin-right: 15upx;
		}
		.user{
			display: flex;
			height: 100%;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;
			.sc{
				margin-top: 50rpx;
				margin-bottom: 30rpx;
				line-height: 50rpx;
				font-size: 31rpx;
				color: #e21806;
				font-weight: bold;
			}
			.me-swiper{
				width: 100vw;
				height: 300rpx;
				.me-swiper-item{
					display: flex;
					justify-content: center;
					&>view{
						display: flex;
						width: 70vw;
						justify-content: space-around;
						&>view{
							width: 33vw;
							// padding: 0 2vw;
							// box-sizing: border-box;
							height: 300rpx;
							padding: 0 20rpx;
							box-sizing: border-box;
							text-align: center;
							line-height: 300rpx;
							font-size: 35rpx;
							font-weight: bold;
							color: #f0f0f0;
							border-radius: 10rpx;
							background-color: rgba(0,0,0,0.3);
							background-repeat: no-repeat;
							background-position: center;
							background-size: cover;
						}
					}
				}
			}
			.bg{
				position: absolute;
				width: 100vw;
				// height: 100vh;
				height: calc(100vh - 200rpx);
				top: 0rpx;
				left: 0;
				z-index: -1;
				filter: blur(2px);
				opacity: 0.4;
				background-repeat: no-repeat;
				background-position: center;
				background-size: cover;
			}
			.ava{
				padding: 80rpx 0 40rpx 0;
				margin-top: 20rpx;
				image{
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
				}
			}
			.name{
				letter-spacing: 4rpx;
				font-size: 35rpx;
				font-weight: bold;
				line-height: 50rpx;
				margin-bottom: 10rpx;
			}
			.bir{
				color: #555555;
				font-size: 25rpx;
				line-height: 50rpx;
				// margin-bottom: 30rpx;
			}
			.zx{
				position: fixed;
				bottom: 200rpx;
			}
		}
	}
	
</style>

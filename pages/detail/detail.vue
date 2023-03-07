<template>
	<view class="detail">
		<view class="container">
			  <view>
				  <view v-if="loadingState" >
				  		<u-skeleton
				  		    rows="5"
				  		    title
				  			loading
				  		></u-skeleton>
				  </view>
				  <view v-else>
						<view class="title">
						  	{{artData.title}}
						  </view>
						  <view class="userInfo">
						  	<view class="avatar">
						  		<image :src="artData.user_id[0].avatar_file ? item.user_id[0].avatar_file : '/static/images/user-default.jpg'"></image>
						  	</view>
						  	<view class="text">
						  		<view class="name">
						  			{{artData.user_id[0].nickname ? artData.user_id[0].nickname : artData.user_id[0].username}}
						  		</view>
						  		<view class="small">
						  			<uni-dateformat :date="artData.puartDatablish_date" format="yyyy-MM-dd hh:mm" >
						  			</uni-dateformat>，发布于{{artData.province}}
						  		</view>
						  	</view>
						  </view>
						  <view class="content">
						  	<u-parse :content="artData.content" :tagStyle="tagStyle"></u-parse>
						  </view>
						</view>
				  </view>
			
			<view class="like">
				<view class="btn" @click="likeUpdata" :class="artData.isLike ? 'active' : ''">
					<text class="iconfont icon-praise"></text>
					<text v-show="artData.like_count">{{artData.like_count}}</text>
				</view>
				<view class="users">
					<image src="../../static/images/user.jpg" mode="aspectFill"></image>
				</view>
				<view class="text">
					<text class="num">{{artData.view_count}}</text>
					人看过
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	const utilsObj = uniCloud.importObject('utilsObj',{
		customUI: true // 取消自动展示的交互提示界面
	})
	export default {
		data() {
			return {
				artId: "",
				tagStyle: {
					p: 'line-height:1.7em; font-size:32rpx; padding-bottom:10rpx',
					img: 'margin:10rpx 0'
				},
				loadingState: true,
				artData: {}
			};
		},
		onLoad(e) {
			if(!e.id) {
				this.errFun()
				return
			}
			this.artId = e.id
			this.getData()
			this.readUpdata()
		},
		methods: {
			//记录阅读量
			readUpdata() {
				utilsObj.operation('quanzi_article','view_count',this.artId,2)
			},
			//记录点赞量
			 likeUpdata() {
				 //防抖
				 let time = Date.now()
				 if(time - this.likeTime < 2000) {
					 uni.showToast({
					 	title:"点击太频繁了...",
						icon:'none'
					 })
					 return
				 }
				 
				 
				 this.artData.isLike ? this.artData.like_count-- : this.artData.like_count++
				 this.artData.isLike = !this.artData.isLike
				 this.likeTime = time
				 
				this.likeFun()
			},
			//点赞操作数据库的方法
			async likeFun() {
				//判断用户是否已经点过赞
				let count = await db.collection("quanzi_like")
				.where(`article_id=="${this.artId}" && user_id==$cloudEnv_uid`).count()
				console.log(count);
				if(count.result.total) {
					db.collection("quanzi_like").where(`article_id=="${this.artId}" && user_id==$cloudEnv_uid`).remove()
					utilsObj.operation('quanzi_article','like_count',this.artId,-1)
				}else {
					db.collection('quanzi_like').add({
						article_id: this.artId
					}).then((res) => {
						console.log(res);
						utilsObj.operation('quanzi_article','like_count',this.artId,1)
					})
				}
			},
			//错误处理
			errFun(e) {
				uni.showToast({
					title:"参数错误",
					icon:'none',
				})
				setTimeout(function() {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}, 800);
			},
			//获取文章数据
			getData() {
				let artTemp =  db.collection("quanzi_article").where(`_id=="${this.artId}"`).getTemp()
				let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp()
				
				let likeTemp = db.collection(("quanzi_like")).where(`article_id=="${this.artId}" && user_id==$cloudEnv_uid`).getTemp()
					
				db.collection(artTemp,userTemp,likeTemp).get({
					getOne:true
				}).then((res) => {
					if(!res.result.data) {
						this.errFun()
						return
					}
					let isLike = res.result.data._id.quanzi_like.length ? true : false
					res.result.data.isLike = isLike
					this.artData = res.result.data
					this.loadingState = false
					uni.setNavigationBarTitle({
						title:res.result.data.title	
					})
					
					
				}).catch(err => {
					this.errFun()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail {
		background-color: #f8f8f8;
		height: calc(100vh - var(--window-top));
		.container {
			background-color: #fff;
			padding: 30rpx;
			.title {
				font-size: 46rpx;
				color: #333;
				line-height: 1.4em;
				font-weight: 600;
			}
			.userInfo {
				padding: 20rpx 0 50rpx;
				display: flex;
				align-items: center;
				.avatar {
					width: 60rpx;
					height: 60rpx;
					padding-right: 15rpx;
					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.text {
					font-size: 28rpx;
					color: #555;
					.small {
						font-size: 20rpx;
						color: #999;
					}
				}
				.content {
					
				}
			}
			.like {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 80rpx 50rpx 50rpx;
				.btn {
					width: 260rpx;
					height: 120rpx;
					background-color: #e4e4e4;
					border-radius: 100rpx;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					font-size: 26rpx;
					.iconfont {
						font-size: 50rpx;
					}
					&.active {
						background-color: #0199FE;
					}
				}
				.text {
					font-size: 26rpx;
					color: #666;
					.unm {
						color: #0199FE;
					}
				}
				.users {
					display: flex;
					justify-content: center;
					padding: 30rpx 0;
					image {
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						border: 3rpx solid #fff;
						margin-left: -20rpx;
					}
				}
				
			}
			
		}
	}
</style>

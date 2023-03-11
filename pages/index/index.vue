<template>
	<view class="container">
		<!-- 导航部分 -->
		<view class="nav">
			<u-tabs
			 :list="navList"
			 @click="navClick"
			 :activeStyle="{
			     color: '#303133',
			     fontWeight: 'bold',
			     transform: 'scale(1.05)'
			 }"
			:inactiveStyle="{
			    color: '#606266',
			    transform: 'scale(1)'
			}"				 
			 ></u-tabs>
		</view>
		
		<!-- 骨架屏 -->
		<view class="loadingState" v-show="loadingState">
			<u-skeleton
			    rows="4"
			    title
				loading
			></u-skeleton>
		</view>

		
		<!-- 内容部分 -->
		<view class="content">
			<view class="Item" v-for="item in articleData">
				<logItem @delEvent="P_delEvent" :item="item"></logItem>
			</view>
		</view>
		
		<uni-load-more :status="uniLoad"></uni-load-more>
		
		<!-- 编辑按钮 -->
		<view class="edit" @click="toEdit">
			<view class="iconfont icon-editor">		
			</view>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	const dbCmd = db.command
	import {store, mutations} from "@/uni_modules/uni-id-pages/common/store.js"
	export default {
		data() {
			return {
				navList: [
					{
						name: "最新",
						type: "publish_date"
					},
					{
						name: "热门",
						type: "view_count"
					}
				],
				loadingState: true,
				navActive: 0,
				articleData: [],
				uniLoad:"more",
				noMore: false
				
			}
		},
		onReachBottom() {
			this.ReachBottom()
		},
		onLoad() {
			this.getArticleData()
		},
		methods: {
			//上拉触底的功能函数
			ReachBottom() {
				this.uniLoad = "loading"
				if(this.noMore) {
					this.uniLoad = "noMore"
					return 
				}
				this.getArticleData()
			},
			//用户删除某一篇文章，重新刷新页面
			P_delEvent() {
				this.articleData = []
				this.getArticleData()
			},
			//获取文章数据
			async getArticleData() {
				let artTemp = db.collection("quanzi_article").where(`delState != true`).field("user_id,like_count,view_count,comment_count,title,publish_date,description,picurls,province").getTemp()
				let userTemp = await db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp()
				
				db.collection(artTemp,userTemp).orderBy(this.navList[this.navActive].type,"desc").skip(this.articleData.length).limit(5).get().then( async res => {
					
					if(!res.result.data.length) {
						this.ReachBottom()
						this.noMore = true
						return 
					}
					let oldData = this.articleData
					//获取全部的文章id列表
					let idArr = []
					let resDataArr = [...oldData,...res.result.data]
					
					//是否登录判断
					if(store.hasLogin) {
						resDataArr.forEach(item => {
							idArr.push(item._id)
						})
						//获取已经点赞的文章id列表
						let likeRes = await db.collection("quanzi_like").where({
							article_id:dbCmd.in(idArr),//获取已经点赞的文章id列表
							user_id:uniCloud.getCurrentUserInfo().uid
						}).get()
						
						//获取已经点赞的文章下标，为其添加isLike属性
						likeRes.result.data.forEach(item => {
							let index = resDataArr.findIndex(find => {
								return item.article_id === find._id
							})
							resDataArr[index].isLike = true
						})
					}
					
					
					//储存获取到的文章数据
					this.articleData = resDataArr
					this.loadingState = false
				})
				
				
				
			},
			//点击导航标签
			navClick(e) {
				this.loadingState = true
				this.articleData = []
				this.navActive = e.index
				this.getArticleData()
				this.uniLoad = "more"
				this.noMore = false
			},
			//跳转至edit页面
			toEdit() {
				uni.navigateTo({
					url:"/pages/edit/edit"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.nav {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.loadingState {
			margin: 50rpx;
		}
		.content {
			.Item {
				padding: 30rpx;
				border-bottom: #F7F7F7 15rpx solid;
			}
		}
		.edit {
			position: fixed;
			bottom: 150rpx;
			right: 50rpx;
			width: 120rpx;
			height: 120rpx;
			background-color: #0199FE;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 100;
			box-shadow: 0 0 20rpx rbga(1, 153, 254, 0.8);
			.iconfont {
				font-size: 50rpx;
				color: #fff;
			}
		}


	}
</style>

<template>
	<view class="logItem">
		<view class="head">
			<view class="userInfo">
				<view class="avatar">
					<image :src="giveAvatar(item)"></image>
				</view>
				<view class="name">
					{{giveName(item)}}
				</view>
				<view class="time">
					<uni-dateformat :date="item.publish_date" :threshold="[60000,60000 * 60 * 24 * 30]" format="MM-dd hh-mm" >
					</uni-dateformat>
				</view>
			</view>
			<view class="more" @click="onMore">
				<view class="iconfont icon-more">
				</view>
			</view>
		</view>

		<view class="body">
			<view class="title" @click="toDetail">
				{{item.title}}
			</view>
			<view class="text" @click="toDetail" v-if="item.description">
				<view class="t">
					{{item.description}}
				</view>
			</view>
			<view class="picList" v-if="item.picurls.length">
				<view class="pic" :class="item.picurls.length == 1 ? 'only' : ''" v-for="(pic, index) in item.picurls" >
					<image @click="clickImage(index)" :src="pic" mode="aspectFill">
					</image>
				</view>
			</view>
		</view>
		
		<view class="info">
			<view class="box">
				<text class="iconfont icon-browse"></text>
				<text>{{item.view_count}}</text>
			</view>
			<view class="box" @click="toDetail">
				<text class="iconfont icon-message"></text>
				<text>{{item.comment_count ? item.comment_coun : '评论'}}</text>
			</view>
			<view class="box">
				<text class="iconfont icon-praise"></text>
				<text>{{item.like_count ? item.like_count : '点赞'}}</text>
			</view>
		</view>
		
		
		<u-action-sheet cancelText="取消" :actions="list" :show="showSheet"
			closeOnClickOverlay
			closeOnClickAction
			@select="selectSheet"
			@close="closeSheet"
		></u-action-sheet>
	</view>
</template>

<script>
	import {giveName, giveAvatar} from '../../utils/tools.js'
	export default {
		name: "logItem",
		props: {
			item: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {
				showSheet: false,
				list:[
					{
						name:"修改",
						type:"dedit"
					},
					{
						name:"删除",
						type:"del",
						color:"#f56c6c"
					}
				]
			};
		},
		onLoad() {
			console.log(this.item);
		},
		methods: {
			giveName, 
			giveAvatar,
			
			//点击sheet的取消选项
			closeSheet() {
				this.showSheet = false
			},
			//点击sheet的任意选项
			selectSheet(e) {
				this.showSheet = false
				console.log(e);
			},
			//点击更多按钮
			onMore() {
				this.showSheet = true
			},
			//跳转至detail页面
			toDetail() {
				uni.navigateTo({
					url:'/pages/detail/detail?id=' + this.item._id
				})
			},
			//点击预览图片
			clickImage(index) {
				uni.previewImage({
					urls: this.item.picurls,
					current: index
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.logItem {
		.head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 30rpx;
			.userInfo {
				display: flex;
				align-items: center;
				.avatar {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					overflow: hidden;
					image {
						width: 100%;
						height: 100%;
						
					}
				}
				.name {
					color: #222;
					margin-left: 10rpx;
				}
				.time {
					color: #888;
					font-size: 22rpx;
					margin-left: 20rpx;
				}

			}
			.more {
				padding: 5rpx;
				.iconfont {
					color: #888;
					font-size: 50rpx;	
				}
			}
		}
		.body {
			padding: 15rpx 0 20rpx;
			.title {
				font-size: 44rpx;
				color: #000;
				font-weight: 600;
				text-align: justify;
			}
			.text {
				font-size: 30rpx;
				padding: 10rpx 0;
				text-align: justify;
				color: #888;
				.t {
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;				
					text-overflow: ellipsis;		
					display: -webkit-box;			
					-webkit-line-clamp: 2;			
					line-clamp: 2;					
					-webkit-box-orient: vertical;	
				}
			}
			.picList {
				display: flex;
				padding-top: 20rpx;
				.pic {
					width: 225rpx;
					height: 225rpx;
					margin-right: 8rpx;
					overflow: hidden;
					image {
						width: 100%;
						height: 100%;
					}
				&:first-child{
					border-radius: 20rpx 0 0 20rpx;					
				}
				&:last-child{
					border-radius: 0 20rpx 20rpx 0;					
				}
				&.only{
					border-radius: 20rpx;
				}
				}

			}
		}
		
		.info {
			display: flex;
			justify-content: space-around;
			align-items: center;
			.box {
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 15rpx 0 5rpx;
				flex: 1;
				.iconfont {
					font-size: 40rpx;
					padding-right: 10rpx;
				}
			}
		}
	}
</style>

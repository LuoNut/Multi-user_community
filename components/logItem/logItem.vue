<template>
	<view class="logItem">
		<view class="head">
			<view class="userInfo">
				<view class="avatar">
					<image src="../../static/images/user.jpg" mode="aspectFill"></image>
				</view>
				<view class="name">
					王五
				</view>
				<view class="time">
					<uni-dateformat :date="Date.now()" :threshold="[60000,60000 * 60 * 24 * 30]" format="MM-dd hh-mm">
					</uni-dateformat>
				</view>
			</view>
			<view class="more">
				<view class="iconfont icon-more">
				</view>
			</view>
		</view>

		<view class="body">
			<view class="title">
				默认标题
			</view>
			<view class="text">
				<view class="t">
					内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
				</view>
			</view>
			<view class="picList">
				<view class="pic" :class="picList.length == 1 ? 'only' : ''" v-for="item in picList" >
					<image src="../../static/images/user.jpg" mode="aspectFill">
					</image>
				</view>
			</view>
		</view>
		
		<view class="info">
			<view class="box">
				<text class="iconfont icon-browse"></text>
				<text>20</text>
			</view>
			<view class="box">
				<text class="iconfont icon-message"></text>
				<text>20</text>
			</view>
			<view class="box">
				<text class="iconfont icon-praise"></text>
				<text>20</text>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		name: "logItem",
		data() {
			return {
				picList: [1, 2, 3]
			};
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

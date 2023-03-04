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
			<view class="Item" v-for="item in logData">
				<logItem></logItem>
			</view>
		</view>
		
		<!-- 编辑按钮 -->
		<view class="edit">
			<view class="iconfont icon-editor">		
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navList: [
					{
						name: "最新"
					},
					{
						name: "热门"
					}
				],
				loadingState: false,
				logData: 3
			}
		},
		onLoad() {

		},
		methods: {
			navClick() {
				console.log("111");
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

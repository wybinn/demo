<template>
	<!-- <view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view> -->
	<view class="uni-list">
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate uni-navigate-right">
				例子1
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate uni-navigate-right">
				例子2
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate uni-navigate-right">
				例子3
			</view>
		</view>
		<view class="uni-list-cell">
			<view class="uni-list-cell-navigate uni-navigate-right">
				例子4
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

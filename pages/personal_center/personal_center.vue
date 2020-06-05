<template>
	<view>
		<!-- id -->
		<view class="title">
			<view class="img">
				<image :src="account.image" mode="widthFix"></image>
			</view>
			<view class="id">{{account.nickname}}</view>
			<view class="btn">
				<button type="default">签到</button>
			</view>
		</view>
		<!-- 关注 -->
		<view class="content">
			<view class="attention">
				<navigator class="frame" url="../index/index">
					<view class="at_num">5</view>
					<view class="at">关注</view>
				</navigator>
			</view>
			<view class="fans">
				<navigator class="frame" url="../index/index">
					<view class="fan_num">7</view>
					<view class="fan">粉丝</view>
				</navigator>
			</view>
			<view class="integration">
				<navigator class="frame" url="../index/index">
					<view class="itt_num">29</view>
					<view class="itt">积分</view>
				</navigator>
			</view>
		</view>
		<view class="line"></view>
		<!-- 我的收藏 -->
		<view class="end">
			<view class="my_favorite">
				<navigator class="frame_end" url="../index/index">
					<view class="mf_pic">
						<image src="../../static/my_favorite.png" ></image>
					</view>
					<view class="mf_name">我的收藏</view>
				</navigator>				
			</view>
			<view class="browsing_history">
				<navigator class="frame_end" url="../index/index">
				<view class="bh_pic">
					<image src="../../static/browsing_history.png" ></image>
				</view>
				<view class="bh_name">浏览历史</view>
				</navigator>
			</view>
			<view class="news">
				<navigator class="frame_end" url="../index/index">
				<view class="news_pic">
					<image src="../../static/news.png"></image>
				</view>
				<view class="nes_name">我的消息</view>
				</navigator>
			</view>
			<view class="Submit_management">
				<navigator class="frame_end" url="../index/index">
				<view class="sm_pic">
					<image src="../../static/Submit_management.png"></image>
				</view>
				<view class="sm_name">投稿管理</view>
				</navigator>
			</view>
			<view class="version_updating">
				<view class="vu_pic">
					<image src="../../static/version_updating.png"></image>
				</view>
				<view class="vu_name">版本更新</view>
			</view>
			<view class="Point_Reward">
				<navigator class="frame_end" url="../index/index">
				<view class="pr_pic">
					<image src="../../static/Point_Reward.png"></image>
				</view>
				<view class="pr_name">积分商城</view>
				</navigator>
			</view>
			<view class="wipe_cache">
				<view class="wc_pic">
					<image src="../../static/wipe_cache.png"></image>
				</view>
				<view class="wc_name">清除缓存</view>
			</view>

			<view class="About_Us">
				<view class="au_pic">
					<image src="../../static/About_Us.png"></image>
				</view>
				<view class="au_name">关于我们</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {		
				 
				 account:{
						 nickname:'养乐多',
						 image:require("../../static/head_portrait.jpg")
					 }

			}
		},
		methods: {
			attention() {
				uni.navigateTo({
					url: "../index/index.vue"
				})
			}
		}
	}
</script>

<style>
	.frame_end{
		width: 112rpx;
		height: 124rpx;
		text-align: center;
	}
	.title {
		display: flex;
		margin-top: 36rpx;
		height: 124rpx;
		width: 750rpx;
	}

	.img>image {
		width: 60%;
		border-radius: 50%;
	}

	.img {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.id {
		flex: 2;
		font-size: 19px;
		text-align: left;
		line-height: 124rpx;
	}

	.btn {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.btn>button {
		background-color: rgba(210, 60, 62, 1);
		width: 102rpx;
		height: 58rpx;
		border-radius: 5px;
		font-size: 10px;
		text-align: center;
		line-height: 58rpx;
		color: white;
	}

	.content {
		display: flex;
		margin-top: 64rpx;
	}

	.attention {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.frame {
		width: 126rpx;
		height: 124rpx;
		text-align: center;
	}

	.fans {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.integration {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.line {
		height: 2rpx;
		width: 750rpx;
		background-color: rgba(153, 153, 153, 0.1642857142857143);
		margin-top: 16rpx;
	}

	.end {
		color: rgba(80, 80, 80, 1);
		background-color: rgba(255, 255, 255, 1);
		border-radius: 16px;
		font-size: 14px;
		line-height: 150%;
		box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1785714285714286);
		text-align: center;
		display: flex;
		flex-wrap: wrap;
	}

	.my_favorite {

		width: 25%;
		padding-top: 104rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mf_pic>image,
	.bh_pic>image,
	.news_pic>image,
	.sm_pic>image,
	.vu_pic>image,
	.pr_pic>image,
	.wc_pic>image,
	.au_pic>image {
		width: 60rpx;
		height: 56rpx;
	}

	.browsing_history {
		width: 25%;
		padding-top: 104rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.news {
		width: 25%;
		padding-top: 104rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.Submit_management {
		width: 25%;
		padding-top: 104rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.version_updating {
		width: 25%;
		padding-top: 56rpx;
		padding-bottom: 64rpx;
	}

	.Point_Reward {
		width: 25%;
		padding-top: 56rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 64rpx;
	}

	.wipe_cache {
		width: 25%;
		padding-top: 56rpx;
		padding-bottom: 64rpx;
	}

	.About_Us {
		width: 25%;
		padding-top: 56rpx;
		padding-bottom: 64rpx;
	}

	.at,
	.fan,
	.itt {
		line-height: 80rpx;
		color: rgba(153, 153, 153, 1);
		font-size: 12px;
	}
</style>

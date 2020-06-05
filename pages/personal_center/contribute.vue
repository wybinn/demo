<template>
	<view>
		<!-- 整体大循环 -->
		<view class="" v-for="(item,index) in List" :key="index">
			<view class="line"></view>  <!-- 线 -->

			<!-- （文章和图片） -->
			
			<view class="content">
				<view class="cont">{{item.content}}</view>
				<view class="cont-img">
					<image src="../../static/theory.png" mode=""></image>
				</view>
			</view>
			
			<!-- 评论、点赞、分享 -->
			
			<view class="box-like">
				<view class="box-num">
					<view class="comment">
						<image src="../../static/comment.png" ></image>
					</view>
					<view class="comment_num">
						{{item.comment_num}}
					</view>
				</view>
				<view class="box-num">
					<view class="like">
						<image src="../../static/like.png" ></image>
					</view>
					<view class="like_num">
						{{item.like_num}}
					</view>
				</view>
				<view class="box-num">
					<view class="share" @click="share">
						<image src="../../static/share.png" ></image>
					</view>
					<view class="share_num">
						{{item.share_num}}
					</view>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				List: [{
						
						content:'“三个坚持”夯实强国之基 我是标题我是标题',
						comment_num: '152',
						like_num: '152',
						share_num: '152'
					},
					{
						content:'“三个坚持”夯实强国之基 我是标题我是标题',
						comment_num: '152',
						like_num: '152',
						share_num: '152'
					},
					{
						content:'“三个坚持”夯实强国之基 我是标题我是标题',
						comment_num: '152',
						like_num: '152',
						share_num: '152'
					},

				]
			}
		},
		methods: {
			share() {
				uni.navigateTo({
					url: "./data"
				})
			}
		}
	}
</script>

<style>
	.comment_num,
	.like_num,
	.share_num {
		padding-left: 14rpx;
	}

	.box-num {
		display: flex;
	}

	.line {
		width: 750rpx;
		height: 1rpx;
		background-color: rgba(153, 153, 153, 0.1642857142857143);
	}

	.pic>image {
		width: 100%;
		height: 100%;
		border-radius: 46rpx;
	}

	.pic {
		width: 92rpx;
		height: 92rpx;
	}

	.account {
		display: flex;
		padding-left: 18rpx;
		padding-right: 16rpx;
		padding-top: 38rpx;
	}

	.box,
	.time,
	.id {
		padding-left: 20rpx;

	}

	.date,
	.time,
	.id {
		color: rgba(128, 128, 128, 1);
		font-size: 12px;
	}

	.name {
		color: rgba(80, 80, 80, 1);
		font-size: 14px;
	}

	.box-time {
		display: flex;
	}

	.content {
		display: flex;
		padding-top: 38rpx;
		justify-content: space-around;

	}

	.cont-img>image {
		width: 100%;
		height: 100%;

	}

	.cont-img {
		width: 310rpx;
		height: 182rpx;

	}

	.cont {
		display: flex;
		align-items: center;
		width: 344rpx;
		color: rgba(80, 80, 80, 1);
		font-size: 16px;
		flex-wrap: wrap;
	}

	.comment>image,
	.like>image,
	.share>image {
		width: 100%;
		height: 100%;
	}

	.comment,
	.like,
	.share {
		width: 50rpx;
		height: 50rpx;
	}

	.box-like {
		display: flex;
		justify-content: space-around;
		padding-top: 64rpx;
		padding-bottom: 30rpx;
	}
</style>

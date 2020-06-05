<template>
	<view>
		<!-- 第一种样式 -->
		<view v-for="(item,index) in comment_one " :key="index">
			<view class="line"></view>
			<view class="account ">
				<view class="box">

					<view class="photo">
						<image :src="item.photo"></image>
					</view>
					<view class="message">
						<view class="name">{{item.name}}</view>
						<view class="like">
							<image :src="item.like"></image>
						</view>
						<view class="date">{{item.date}}</view>
					</view>
				</view>
				<view class="box_illustration">
					<view class="illustration">
						<image :src="item.illustration"></image>
					</view>
				</view>

			</view>
		</view>

		<!-- 第二种样式 -->

		<view v-for="(item,index) in comment_two" :key="'2'+index">
			<view class="line"></view>
			<view class="outer">
				<view class="star">
					<view class="photo">
						<image :src="item.photo_two"></image>
					</view>
					<view class="">
						<view class="id">
							<view class="name">{{item.name_two}}</view>
							<view class="attention">{{item.attention}}</view>
						</view>
						<view class="datea">{{item.date_two}}</view>
					</view>


				</view>
				
				<view :class="[item.status==1?'end':'end2']">
					<button type="default" @click="change()">{{item.status==1?'已关注':'关注'}}</button>
				</view>
				
			</view>
</view>

		<!-- 第三种样式 -->
			<view v-for="(item,index) in comment_three " :key="'3'+index">
				<view class="line"></view>
				<view class="account ">
					<view class="box">
			
						<view class="photo">
							<image :src="item.photo_three"></image>
						</view>
						<view class="message">
							<view class="name">{{item.name_three}}</view>
							<view class="content_three">
								{{item.content_three}}
							</view>
							<view class="date">{{item.date_three}}</view>
						</view>
					</view>
					<view class="box_illustration">
						<view class="illustration">
							<image :src="item.illustration_three"></image>
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
				comment_one: [{
						photo: require("../../static/theory.jpg"),
						name: '好先生',
						like: require("../../static/like.svg"),
						date: '8-11',
						illustration: require("../../static/theory.png"),
						type:1,
					},
					{
						photo: require("../../static/theory.jpg"),
						name: '好先生a',
						like: require("../../static/like.svg"),
						date: '8-11',
						illustration: require("../../static/theory.png"),
						type:2,
					},

				],
				comment_two: [{
					photo_two: require("../../static/theory.jpg"),
					name_two: '好先生a',
					attention: '已关注了你',
					date_two: '8-11',
					type:2,
					status:1
				}],
				comment_three:[
					{
						photo_three: require("../../static/theory.jpg"),
						name_three: '好先生a',
						content_three:'isdkohfnujs45555555555456666666',
						date_three: '8-11',
						illustration_three: require("../../static/theory.png"),
						type:3,
					}
				]
			}
		},
		methods: {
				change(){
					let status = this.comment_two[0].status;
					if(status==1){
						this.comment_two[0].status=0
					}else{
						this.comment_two[0].status=1
					}
						
					console.log(status);
				}
		}
	}
</script>

<style>
	.content_three{
		width: 276rpx;
		word-wrap: break-word;
		word-break: break-all;
		
	}
	.end {
		position: absolute;
		right: 20rpx;
		top: 45rpx;
		flex: 1;

	}
	.end2{
		position: absolute;
		right: 20rpx;
		top: 45rpx;
		flex: 1;
	
	}

	.end button {
		color: rgba(255, 255, 255, 1);
		background-color: rgba(210, 60, 62, 1);
		border-radius: 5px;
		font-size: 14px;
		width: 120rpx;
		height: 60rpx;

	}
	.end2 button {
		color: rgba(255, 255, 255, 1);
		background-color: #666666;
		border-radius: 5px;
		font-size: 14px;
		width: 120rpx;
		height: 60rpx;
	
	}
	

	.star {
		display: flex;
		padding-top: 40rpx;
		padding-bottom: 54rpx;

	}

	.outer {
		display: flex;
		flex: 2;
		position: relative;
	}

	.datea {
		padding-top: 36rpx;
		padding-left: 32rpx;
	}

	.id {
		display: flex;
		padding-left: 32rpx;
	}


	.attention {
		color: rgba(80, 80, 80, 1);
		padding-top: 18rpx;
		padding-left: 18rpx;

	}

	.line {
		width: 750rpx;
		height: 2rpx;
		background-color: rgba(153, 153, 153, 0.1642857142857143);
	}

	.like>image,
	.illustration>image {
		width: 100%;
		height: 100%;
	}

	.photo>image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.photo {
		width: 84rpx;
		height: 84rpx;
		padding-left: 32rpx;
	}

	.like {
		width: 48rpx;
		height: 48rpx;
	}

	.illustration {
		width: 252rpx;
		height: 182rpx;

	}

	.box_illustration {
		flex: 1;
		justify-content: flex-end;
		display: flex;
		padding-right: 16rpx;
	}

	.account {
		display: flex;
		padding-top: 40rpx;
		padding-bottom: 54rpx;
	}

	.box {
		display: flex;
		flex: 1;
	}

	.name {
		padding-top: 12rpx;
		color: rgba(65, 102, 154, 1);
		font-size: 16px;
	}

	.message {
		padding-left: 32rpx;
	}

	.message>view {
		padding-top: 10rpx;
	}

	.date {
		color: rgba(80, 80, 80, 1);
		font-size: 14px;
	}
</style>

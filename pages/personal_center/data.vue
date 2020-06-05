<template>
	<view class="content">
		<view class="Edit_data">
			<view class="return" @click="back">
				<image :src="data.return"></image>
			</view>
			<view class="compile">编辑资料</view>
			<view class="save">保存</view>
		</view>
		<view class="line"></view>
		<view class="profile_photo">
			<view class="ph">头像</view>
			<view class="ph_img">
				<image src="../../static/head_portrait.jpg" mode=""></image>
			</view>
		</view>
		<view class="line"></view>
		<view class="user_name">
			<view class="">用户名</view>
			<view class="">{{data.user_name}}</view>
		</view>
		<view class="line"></view>
		<view class="sex">
			<view class="">性别</view>
			<view class="">{{data.sex}}</view>
		</view>
		<view class="line"></view>
		<view class="introduce">
			<view class="id_name">介绍</view>
			<view class="id_img" @click="return2">
				<image :src="data.introduce"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {
					return: require("../../static/return.svg"),
					user_name: '养乐多多',
					sex: '女',
					introduce: require("../../static/return2.svg")
				}
			}
		},
		methods: {
		back(){
			uni.navigateTo({
				url: "personal_center"
			})
		},
		return2(){
			uni.navigateTo({
				url:"personal_center"
			})
		}
		}
	}
</script>

<style>
	.content {}

	.Edit_data {
		display: flex;
		justify-content: space-between;
		padding-bottom: 30rpx;
		padding-top: 36rpx;
	}

	.return>image,
	.id_img>image {
		width: 100%;
		height: 100%;
	}

	.return,
	.id_img {
		width: 74rpx;
		height: 74rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
.id_img{
	
}
	.compile {

		color: rgba(80, 80, 80, 1);
		font-size: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.save {
		color: rgba(80, 80, 80, 1);
		font-size: 32rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 28rpx;
	}

	.line {
		width: 750rpx;
		height: 4rpx;
		background-color: rgba(153, 153, 153, 0.1642857142857143);
	}

	.profile_photo {
		display: flex;
		justify-content: space-between;
		padding-top: 22rpx;
		padding-bottom: 12rpx;
		color: rgba(56, 56, 56, 1);
		font-size: 16px;
		margin-left: 18rpx;
		margin-right: 28rpx;
	}

	.user_name,
	.sex,
	.introduce {
		padding-top: 40rpx;
		padding-bottom: 40rpx;
		color: rgba(56, 56, 56, 1);
		font-size: 16px;
		margin-left: 18rpx;
		margin-right: 28rpx;
	}

	.ph,
	.id_name {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ph_img>image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.ph_img {
		width: 104rpx;
		height: 104rpx;
	}

	.user_name,
	.sex,
	.introduce {
		display: flex;
		justify-content: space-between;
	}
</style>

<template>
	<view style="background-color: #FFFFFF;">
        <view class="top">
            <view class="leftTag">我的模块</view>
            <button class="cu-btn sm rightButton">保存</button>
        </view>
        
        <view class="selected">
            <view class="moduleItem bg-cyan shadow" v-for="(item,index) in selectItems" :key="index">
            </view>
        </view>
        
        <view class="top">
            <view class="leftTag">未添加模块</view>
        </view>
        
        <view class="unselected" v-for="(item,index) in unSelectItems" :key="index">
            <view class="moduleItem bg-cyan shadow">
            </view>
        </view>
        
        
        
        

        
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectItems:[

                ],
                unselected:[
                    {
                        imageUrl: '../../static/icon_shortcut_positon.png',
                        name: '职位广场'
                    },
                    {
                        imageUrl: '../../static/icon_shortcut_positon.png',
                        name: '职位广场'
                    }
                ],
			}
		},
		methods: {
			
		}
	}
</script>

<style>
    
.top {
    padding-top: 40rpx;
    display: flex;
    flex-direction: row;
    justify-content:space-between
}
    
.leftTag {
    font-size: 14;
    font-weight: 600;
    margin-left: 32rpx;
}
.rightButton {
    background-color: #0198F8;
    font-size: 24rpx;
    color: #FFFFFF;
    padding-left: 28rpx;
    padding-right: 28rpx;
    margin-right: 32rpx;
}
.moduleItem {
    margin:20rpx 30rpx;
    height: 184rpx;
    border-radius: 10rpx;
    
}

.unselected {
    padding-bottom: 20rpx;
}


.itemImage {
    width:64rpx;
    height:64rpx;
}
</style>

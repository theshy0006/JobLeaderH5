<template>
	<view class="all">
		<view class="top">
			<text style="text-align: center; font-size: 28rpx; color:#333333;">你可以将需要的栏目添加到首页</text>
		    <view class="cu-list grid topCenter" :class="['col-' + currentCol,gridBorder?'':'no-border']">
		    	<view class="cu-item bigItem" v-for="(item,index) in checkItems" :key="index">
		    		<view class='columnItem'>{{item.name}}</view>
                    <image class="rightCorner":src=cancelUrl></image>
		    	</view>
		    </view>
		    <view class="topBottom">
		        <view style="background-color: #ECECEC; width: 168rpx; height: 2rpx;"></view>
		        <view style="padding-left: 20rpx;padding-right: 20rpx; font-size: 20rpx; color: #999999;">以上栏目展示在首页</view>
		        <view style="background-color: #ECECEC; width: 168rpx; height: 2rpx;"></view>
		    </view>
            
            <view class="uncheck">
                <view class="cu-list grid topCenter" :class="['col-' + currentCol,gridBorder?'':'no-border']">
                	<view class="cu-item bigItem" v-for="(item,index) in unCheckItems" :key="index">
                		<view class='uncheckItem'>{{item.name}}</view>
                        <image class="rightCorner":src=addUrl></image>
                	</view>
                </view>
            </view>
		 
		</view>
        <view class="bottom padding">
            <button class="cu-btn block bg-blue margin-tb-sm lg">保存</button>
        </view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
                addUrl: '../../static/icon_service_add.png',
                cancelUrl: '../../static/icon_service_delete.png',
				checkItems:[
				    {
						name: '求职列表'
					},
				    {
				    	name: '招聘资讯'
				    },
				],
                unCheckItems:[
                    {
                    	name: '评估资讯'
                    },
                    {
                    	name: '人才列表'
                    },
                    {
                    	name: '求职资讯'
                    }
                ],
                currentCol:3,
                gridBorder: false,
			}
		},
		methods: {
			
		}
	}
</script>

<style>
    
.all {
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
}

.bottom {
    
}
    
    
.top {
    background-color: #FFFFFF;
    width: 750rpx;
    display: flex;
    display: -webkit-flex; /* Safari */
    padding-top: 40rpx;
    flex-direction: column;
}

.topBottom {
    margin-top: 70rpx;
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-direction: row;
    align-items: center;
    justify-content:center;
}

.job {
    padding-top: 20rpx;
}
.rightButton {
    background-color: #0198F8;
    font-size: 24rpx;
    color: #FFFFFF;
    padding-left: 28rpx;
    padding-right: 28rpx;
    margin-right: 32rpx;
}

.topCenter {
    margin-top: 20rpx;
}

.unselected {
    padding-bottom: 20rpx;
}

.rightCorner {
    width: 32rpx;
    height: 32rpx;
    margin-top: -50rpx;
    margin-left: 170rpx;
}
.bigItem {
    display: flex;
    flex-direction: column;
    justify-content: right;
    align-items: center;
}

.addItem {
    display: flex;
    flex-direction: column;
    font-size: 28rpx;

}

.columnItem {
    padding-left: 34rpx;
    padding-right: 34rpx;
    padding-top: 14rpx;
    padding-bottom: 14rpx;
    color: #0198F8;
    background-color: #c2e4fe;
}

.uncheckItem {
    padding-left: 34rpx;
    padding-right: 34rpx;
    padding-top: 14rpx;
    padding-bottom: 14rpx;
    color: #999999;
    background-color: #f2f2f2;
}

.rightCorner {
    width: 32rpx;
    height: 32rpx;
    margin-top: -92rpx;
}

.uncheck {
    
}

</style>

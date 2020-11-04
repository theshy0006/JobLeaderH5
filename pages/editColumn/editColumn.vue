<template>
	<view class="all">
		<view class="top">
			<text style="text-align: center; font-size: 28rpx; color:#333333;">你可以将需要的栏目添加到首页</text>
		    <view class="cu-list grid topCenter" :class="['col-' + currentCol,gridBorder?'':'no-border']">
		    	<view class="cu-item bigItem" v-for="(item,index) in checkItems" :key="index" @click="cancelItem(item)">
                    <view class="addItem">
                        <view class='columnItem'>{{item}}</view>
                        <image class="rightCorner":src=cancelUrl></image>
                    </view>
		    	</view>
		    </view>
		    <view class="topBottom">
		        <view style="background-color: #ECECEC; width: 168rpx; height: 2rpx;"></view>
		        <view style="padding-left: 20rpx;padding-right: 20rpx; font-size: 20rpx; color: #999999;">以上栏目展示在首页</view>
		        <view style="background-color: #ECECEC; width: 168rpx; height: 2rpx;"></view>
		    </view>
            
            <view class="uncheck">
                <view class="cu-list grid topCenter" :class="['col-' + currentCol,gridBorder?'':'no-border']">
                	<view class="cu-item bigItem" v-for="(item,index) in unCheckItems" :key="index" @click="addItem(item)">
                        <view class="addItem">
                            <view class='uncheckItem'>{{item}}</view>
                            <image class="rightCorner":src=addUrl></image>
                        </view>
                	</view>
                </view>
            </view>
		 
		</view>
        <view class="bottom padding">
            <button class="cu-btn block bg-blue margin-tb-sm lg" @click="save">保存</button>
        </view>

	</view>
</template>

<script>
	export default {
        onLoad() {
            var params = this.getHashParameters();
            for (var key in params) {
                var item = params[key];
                this.checkItems.push(item);
                this.unCheckItems.splice(this.unCheckItems.indexOf(item),1);
            }
        },
		data() {
			return {
                addUrl: '../../static/icon_service_add.png',
                cancelUrl: '../../static/icon_service_delete.png',
				checkItems:[

				],
                unCheckItems:[
                    '求职列表',
                    '招聘资讯',
                    '评估资讯',
                    '人才列表',
                    '求职资讯'
                ],
                currentCol:3,
                gridBorder: false,
			}
		},
		methods: {
            getHashParameters() {
                var arr = (location.hash || '').split('?')[1].split('&')
                var params = {}
                for (var i = 0; i < arr.length; i++) {
                    var data = arr[i].split('=')
                    if (data.length === 2) {
                        params[data[0]] = decodeURI(data[1])
                    }
                }
                return params
            },
            
			cancelItem(item) {
                this.unCheckItems.push(item);
                this.checkItems.splice(this.checkItems.indexOf(item),1);
            },
            addItem(item) {
                this.checkItems.push(item);
                this.unCheckItems.splice(this.unCheckItems.indexOf(item),1);
            },
            save() {
                
                if(this.checkItems.length < 2) {
                    uni.showToast({
                        title:"至少要保留两个栏目",
                        icon:'none'
                    })
                    return
                }

                var checked = ""
                for (var i = 0; i < this.checkItems.length; i++) {
                    if(i == 0) {
                        checked = this.checkItems[i].name;
                    } else {
                        checked = checked + "+" + this.checkItems[i].name;
                    }
                }
                console.log(checked);
                this.$bridge.callHandler('saveItem',checked,res=>{
                    console.log(res);
                });
            }
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
    margin-top: 40rpx;
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
    height: 70rpx;
    
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
    margin-right: -14rpx;
}

.uncheck {
    
}

</style>

<template>
	<view style="background-color: #FBFBFB; height: 100vh;">
        <view class="top">
            <view class="leftTag">我的模块</view>
            <button class="cu-btn sm rightButton" @click="save">保存</button>
        </view>
        <view class="selected">
            <view class="moduleItem bg-white shadow" v-for="(item,index) in selectItems" :key="index" @click="cancelItem(item)">
                <view class="leftView">
                    <image :src=item.imageUrl class="itemImage" mode="aspectFit"> </image>
                    <text class="itemContent">{{item.name}}</text>
                </view>
                <view class="rightView">
                    <view>
                        <image :src=tagImage class="tagImage"> </image>
                    </view>
                    
                    <view class="info">{{alertContent}}</view>
                    <view class="detail">详情</view>
                </view>
            </view>
        </view>
        
        <view class="top">
            <view class="leftTag">未添加模块</view>
        </view>
        
        <view class="unselected" v-for="(item,index) in unSelectItems" :key="index" @click="addItem(item)">
            <view class="moduleItem bg-white shadow">
                <view class="leftView">
                    <image :src=item.imageUrl class="itemImage"> </image>
                    <text class="itemContent">{{item.name}}</text>
                </view>
                <view class="rightView">
                    <view>
                        <image :src=untagImage class="tagImage"> </image>
                    </view>
                    
                    <view class="info">{{alertContent}}</view>
                    <view class="detail">详情</view>
                </view>
            </view>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                type:0,
                untagImage: '../../static/icon_choice_gray.png',
                tagImage: '../../static/icon_choice_blue.png',
                alertContent:'将助您更好地了解我们，轻松申请职位。因此，我们希望您能浏览本页，更多地了解',
				selectItems:[

                ],
                unSelectItems:[
                    {
                        imageUrl: '../../static/icon_shortcut_1.png',
                        name: '求职'
                    },
                    {
                        imageUrl: '../../static/icon_shortcut_2.png',
                        name: '招聘'
                    },
                    {
                        imageUrl: '../../static/icon_shortcut_3.png',
                        name: '评估'
                    },
                    {
                        imageUrl: '../../static/icon_shortcut_5.png',
                        name: '推荐'
                    },
                    {
                        imageUrl: '../../static/icon_shortcut_4.png',
                        name: '实习中心'
                    },
                    {
                        imageUrl: '../../static/icon_xiaozhao2.png',
                        name: '校招'
                    },
                    {
                        imageUrl: '../../static/icon_shezhao2.png',
                        name: '社招'
                    }
                ],
                allItems:[
                    {
                        imageUrl: '../../static/icon_shortcut_1.png',
                        name: '求职'
                    },
                    {
                        imageUrl: '../../static/icon_shortcut_2.png',
                        name: '招聘'
                    },
                    {
                        imageUrl: '../../static/icon_shortcut_3.png',
                        name: '评估'
                    },
                    {
                        imageUrl: '../../static/icon_shortcut_5.png',
                        name: '推荐'
                    },
                    {
                        imageUrl: '../../static/icon_shortcut_4.png',
                        name: '实习中心'
                    },
                    {
                        imageUrl: '../../static/icon_xiaozhao2.png',
                        name: '校招'
                    },
                    {
                        imageUrl: '../../static/icon_shezhao2.png',
                        name: '社招'
                    }
                ],
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
			    this.unSelectItems.push(item);
			    this.selectItems.splice(this.selectItems.indexOf(item),1);
			},
			addItem(item) {
			    this.selectItems.push(item);
			    this.unSelectItems.splice(this.unSelectItems.indexOf(item),1);
			},
			save() {

			    var checked = ""
			    for (var i = 0; i < this.selectItems.length; i++) {
			        if(i == 0) {
			            checked = this.selectItems[i].name;
			        } else {
			            checked = checked + "+" + this.selectItems[i].name;
			        }
			        
			    }
			
			    console.log(checked)
			    this.$bridge.callHandler('saveworkspace',checked,res=>{
			                        console.log(res);
			                    });
			}
		},
        onLoad() {
            var params = this.getHashParameters();
            for (var key in params) {
                var item = params[key];
                
                for (var i = 0; i < this.unSelectItems.length; i++) {
                    if (item == this.unSelectItems[i].name) {
                        var obj = this.unSelectItems[i];
                        this.selectItems.push(obj);
                        this.unSelectItems.splice(this.unSelectItems.indexOf(obj),1);
                        
                    }
                }
                
                
                
                
            }
        },
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
    font-size: 28rpx;
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
    display: flex;
    flex-direction: row;
    
}

.selected {
    margin-top: 40rpx;
}
.unselected {
    background-color: #FFFFFF;
}

.leftView {
    width: 24%;
    min-width: 150rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.rightView {
    width: 76%;
    display: flex;
    flex-direction: column;
    align-items:flex-end;
    justify-content: space-between;
}
.itemImage {
    margin-top: 30rpx;
    width:72rpx;
    height:72rpx;
}
.tagImage {
    width:50rpx;
    height:48rpx;
}

.itemContent {
    margin-top: 12rpx;
    font-size: 28rpx;
    color: #333333;
}
.showContent {
    max-height: 76rpx;
    height: 76rpx;
    background-color: #0081FF;
}

.info{
    margin-right: 10rpx;
    margin-top: -10px;
    padding-bottom: 5px;
    overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
    line-height: 1.5;
    text-align:left; 
}
.detail {
    font-size: 20rpx;
    color: #3AA7FF;
    margin-right: 30rpx;
    margin-bottom: 10rpx;
}
</style>


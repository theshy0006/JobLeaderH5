<template>
	<view class="eventItem bg-white flex flex-direction radius" @click="gotoDetail">
        <view class="itemTop">
            <image src="../../static/rightArrow.png" class="alertIcon"></image>
            <view class="titleTitle">
                <view class="leftTitle">{{title}}</view>
                <view :style="{'color' : statusColor}" class="rightTitle">{{status}}</view>
            </view>
        </view>
        <view class="centerView">
            <view class="contentItem">{{options.eventDescription}}</view>
            <image class="contentImage" src="../../static/right.png"></image>
        </view>
        <view class="contentTime">{{options.uploadTime}}</view>
        <view v-if="show"> 
            <view class="line">
            </view>
            <view class="itemBottom flex flex-direction">
                <button class="cu-btn sm line-blue margin-sm" @click="uploadResult">
                    {{uploadTitle}}
                </button>
            </view>
        </view>
	</view>
</template>

<script>
    import Vue from 'vue'
    import {
    	mapState
    } from 'vuex'
	export default {
        methods: {
        	uploadResult(e) {
        		this.$emit('uploadResult');
        	},
            gotoDetail(e) {
            	this.$emit('gotoDetail');
            },
            
        },
        computed: {
            ...mapState(['token', 'id', 'type']),
            title:function() {
                if ( this.options.eventType == "1" ) {
                    return "路面问题"
                } else if ( this.options.eventType == "2" ) {
                    return "垃圾桶问题"
                } else {
                    return "其它问题"
                }
            },
            uploadTitle:function() {
                if ( this.type == "1" ) {
                    return "上报复核结果"
                } else if ( this.type == "2" ) {
                    return "上报整改结果"
                } else {
                    return ""
                }
            },
            show:function() {
                if ( this.type == "1" ) {
                    //巡查员
                    if(this.options.status == 2 || this.options.status == 3 ||
                        this.options.status == 5) {
                            return false;
                    } else {
                        return true;
                    }
                } else {
                    //卫生员
                    if(this.options.status == 3 || this.options.status == 4 ||
                        this.options.status == 5) {
                            return false;
                    } else {
                        return true;
                    }
                }
            },
            status:function() {
                if ( this.options.status == "1" ) {
                    return "调度中"
                } else if ( this.options.status == "2" ) {
                    return "整改中"
                } else if ( this.options.status == "3" ) {
                    return "已整改"
                } else if ( this.options.status == "4" ) {
                    return "待复核"
                } else if ( this.options.status == "5" ) {
                    return "已完成"
                } else {
                    return "调度中"
                }
            },
            statusColor:function() {
                if ( this.options.status == "1" ) {
                    return '#EDA51F'
                } else if ( this.options.status == "2" ) {
                    return '#EDA51F'
                } else if ( this.options.status == "3" ) {
                    return '#EDA51F'
                } else if ( this.options.status == "4" ) {
                    return '#ED4E1F'
                } else if ( this.options.status == "5" ) {
                    return '#1ACE0A'
                } else {
                    return '#EDA51F'
                }
            },
            
        },
        props: {
			options: {
				type: Object,
				default: function(e) {
					return {}
				}
			},
		}
	}
</script>

<style>
    .eventItem {
        margin-left: 10rpx;
        margin-right: 10rpx;
        margin-top: 20rpx;
    }
    .line {
        width: 100%; 
        height: 1px;
        background-color: #F6F6F6;
    }
    .itemBottom {
        height: 88rpx;
        align-items: flex-end;
        justify-content: center;
           
    }
    .alertIcon {
        width: 12rpx;
        height: 24rpx;
    }
    .contentItem {
        margin-left: 20rpx;
        margin-right: 20rpx;
        line-height:140%;
        font-size:28rpx;
        color: #666666;
    }
    .contentTime {
        margin-top: 8rpx;
        margin-left: 20rpx;
        margin-right: 20rpx;
        color: #999999;
        font-size: 24rpx;
        
    }
    .titleTitle {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .leftTitle {
        color: #333333;
        font-size: 32rpx;
        margin-left: 12rpx;
        margin-top: 10rpx;
    }
    .rightTitle {
        font-size: 28rpx;
        margin-right: 20rpx;
        margin-top: 20rpx;
    }
    .itemTop {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .contentImage {
        margin-right: 20rpx;
        width: 14rpx;
        height: 26rpx;
    }
    .centerView {
        margin-top: 8rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
</style>

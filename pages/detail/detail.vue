<template>
    <view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
        	<block slot="backText">返回</block>
        	<block slot="content">
                <view class="topFont">事件详情</view>
                </block>
        </cu-custom>
        <view class="flex flex-direction">
            <view class="top" :style="{'color' : statusColor}">
                {{showStatus}}
            </view>
        </view>
        <view class="eventItem bg-white flex flex-direction radius">
            <form>
                <view class="cu-form-group">
                    <view class="title">事件类型</view>
                    <view>{{showEnent}}</view>
                </view>
                <view class="cu-form-group align-start">
                    <view class="title">事件描述</view>
                    <textarea
                    @input="textareaBInput"
                    placeholder="这是一个问题" class="textareaa" :value="eventDescription"></textarea>
                </view>
                <view class="cu-form-group">
                    <view class="title">位置</view>
                    <view>{{location}}</view>
                </view>
            </form>
        </view>
        
        <view class="eventItem bg-white flex flex-direction radius">
            <view class="listTop">事件进度</view>
            <view class="cu-timeline" v-for="(item1,index1) in eventProgressList" :key="index1">
                <view class="cu-time">{{item1.createTime.substring(5,16)}}</view>
                <view class="cu-item">
                    <view class="content custonItem">
                        <view class="eventContent">
                            {{item1.name}}<br>{{item1.description}}
                        </view>
                        <view class="eventImage">
                            <image class="smallBig" :src="item1.image1" @tap="ViewImage" :data-url="item1.image1"></image>
                            <image class="smallBig" :src="item1.image2" @tap="ViewImage" :data-url="item1.image2"></image>
                            <image class="smallBig" :src="item1.image3" @tap="ViewImage" :data-url="item1.image3"></image>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        
        <view v-if="type == '2' && status == '2'" class="bottomRect">
            <image src="../../static/uploadTwo.png" class="uploadOne" @click="gotoUpload">
            </image>
        </view>
    </view>
</template>

<script>
    import Vue from 'vue'
    import {
    	mapState
    } from 'vuex'
	export default {
        computed: {
            ...mapState(['token', 'id', 'type']),
            showStatus:function() {
                if ( this.status == "1" ) {
                    return "调度中"
                } else if ( this.status == "2" ) {
                    return "整改中"
                } else if ( this.status == "3" ) {
                    return "已整改"
                } else if ( this.status == "4" ) {
                    return "待复核"
                } else if ( this.status == "5" ) {
                    return "已完成"
                } else {
                    return ""
                }
            },
            statusColor:function() {
                if ( this.status == "1" ) {
                    return '#EDA51F'
                } else if ( this.status == "2" ) {
                    return '#EDA51F'
                } else if ( this.status == "3" ) {
                    return '#EDA51F'
                } else if ( this.status == "4" ) {
                    return '#ED4E1F'
                } else if ( this.status == "5" ) {
                    return '#1ACE0A'
                } else {
                    return '#EDA51F'
                }
            },
            showEnent:function() {
                if ( this.eventType == "1" ) {
                    return "路面问题"
                } else if ( this.eventType == "2" ) {
                    return "垃圾桶问题"
                } else {
                    return "其它问题"
                }
            },
        },
        onLoad: function (option) {
            this.phone = option.phone;
            this.eventDescription=option.eventDescription
            this.uploadTime=option.uploadTime
            this.eventType = option.eventType
            this.location = option.location
            this.eventId = option.eventId  
            this.deptName = option.deptName
            this.deptId = option.deptId
            this.longitude = option.longitude
            this.latitude= option.latitude
            
            
        },
        onShow() {
            this.getDetail();
        },
		data() {
			return {
                eventId:'',
                phone:'',
                test:'哈哈哈哈',
                eventDescription:"哈哈哈哈哈哈哈哈哈",
                uploadTime:'',
                eventType:"0",
                location:'',
                name:'',
                status:'',
                eventProgressList:[],
                deptName:'',
                deptId:0,
                longitude:'',
                latitude:''
			}
		},
		methods: {
            gotoUpload() {
                uni.navigateTo({
                    url:("../upload/upload?deptName="+this.deptName
                    + "&deptId="+this.deptId 
                    + "&phone="+this.phone
                    + "&longitude="+this.longitude
                    + "&latitude="+this.latitude
                    )
                })
            },
            ViewImage(e) {
            	uni.previewImage({
            		current: e.currentTarget.dataset.url
            	});
            },
            loadModal(e) {
            	uni.showLoading({
            		title: 'loading'
            	});
            },
            hideModal(e) {
            	uni.hideLoading();
            },
			getDetail() {
                this.loadModal()
			    var that = this;
			    uni.request({
			        url: this.GLOBAL.QueryEventDetail,
			        dataType: 'jsonp',
			        method: 'GET',
			        header: {
			            access_token:this.token,
			        },
			        data: {
			        	access_token:this.token,
			            eventId:this.eventId,
			            phoneNum:this.phone,
			        }
			    }).then(data => {
			        uni.hideLoading();
			        //data为一个数组，数组第一项为错误信息，第二项为返回数据
			        var [error, res]  = data;
			        console.log(res.data);
			        let response = JSON.parse(res.data);
			
			        if( response.code == 200 ) {
                        that.status = response.result.status
                        that.uploadTime = response.result.uploadTime
                        that.eventType = response.result.eventType
                        that.eventProgressList = response.result.eventProgressList
                        that.location = response.result.location 
			        } else {
			            if (response.code == "000009") {
			                uni.clearStorage()
			                that.$store.commit('logout')
			                uni.reLaunch({
			                    url:'../launchPage/launchPage'
			                });
			                setTimeout(function () {
			                    uni.showToast({
			                    	title:response.message,
			                        duration: 2000,
			                    	icon:"none"
			                    })
			                }, 1500);
			            } else {
			                
			            } 
			        }
			    }).catch(err => {
			        uni.hideLoading();
			    	uni.showModal({
			    		content: err.errMsg,
			    		showCancel: false
			    	});
			        if (this.longitude > 0.01) {
			            that.initData();
			        }
			    });
			},
		}
	}
</script>

<style>
    .top {
        height: 218rpx;
        width: 100%;
        color: #EDA51F;
        font-size: 48rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .eventItem {
        margin-top: 20rpx;
        margin-left: 10rpx;
        margin-right: 10rpx;
    }
    
    .textareaa {
        text-align: right;
        height: 80rpx;
    }
    
    .listTop {
        margin-top: 20rpx;
        margin-left: 20rpx;
        color: #333333;
        font-size: 32rpx;
    }
    .custonItem {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    
    .eventImage {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    
    .smallBig {
        width: 100rpx;
        height: 100rpx;
    }
    .bottomRect {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: fixed;
        bottom: 20rpx;
        margin-left: calc(50% - 72rpx);;
    }
    .uploadOne {
        width: 144rpx;
        height: 144rpx;
    }
</style>

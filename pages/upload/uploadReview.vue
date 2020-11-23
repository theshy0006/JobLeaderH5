<template>
	<view>
        <cu-custom bgColor="bg-gradual-blue" :isBack="true">
        	<block slot="backText">返回</block>
        	<block slot="content">
                <view class="topFont">上报复核结果</view>
                </block>
        </cu-custom>
		<view class="eventItem bg-white flex flex-direction radius">
		    <view class="itemTop">
		        <image src="../../static/rightArrow.png" class="alertIcon"></image>
		        <view class="titleTitle">
		            <view class="leftTitle">{{title}}</view>
		            <view class="rightTitle">{{uploadTime}}</view>
		        </view>
		    </view>
		    <view class="contentItem">{{eventDescription}}</view>
		    <view class="contentTime">{{location}}</view>
		    <view> 
		        <view class="line">
		        </view>
		    </view>
		</view>
        
        <view class="eventItem bg-white flex flex-direction radius">
            <view class="cu-form-group">
                <view class="title">复核结果</view>
                <picker @change="PickerChange" :value="index" :range="picker">
                    <view class="picker">
                        {{index>-1?picker[index]:'请选择复核结果'}}
                    </view>
                </picker>
            </view>
        </view>
        
        <view style="margin-top: 40rpx;">
        </view>
        <view class="cu-form-group" style="background-color: unset;">
            <view class="grid col-4 grid-square flex-sub">
                <view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
                 <image :src="imgList[index]" mode="aspectFill"></image>
                    <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
                        <text class='cuIcon-close'></text>
                    </view>
                </view>
                <view class="addGroup solids bg-white" @tap="ChooseImage" v-if="imgList.length<3">
                    <text class='cuIcon-camera alertNN'></text>
                    <view class="alertPP">上传照片<br>最多3张</view>
                </view>
            </view>
        </view>
        <view class="redAlert">为了核实结果，请您上传复核照片</view>
        <view class="padding flex flex-direction">
            <button class="cu-btn bg-gradual-blue lg shadow round" @click="upload">确认提交</button>
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
            title:function() {
                if ( this.eventType == 1 ) {
                    return "路面问题"
                } else if ( this.eventType == 2 ) {
                    return "垃圾桶问题"
                } else {
                    return "其它问题"
                }
            },
            result:function() {
                if ( this.index == 0 ) {
                    return "复核结果：复核不通过"
                } else if ( this.eventType == 1 ) {
                    return "复核结果：复核通过"
                } else {
                    return ""
                }
            }
        },
		data() {
			return {
                name:'',
				eventDescription:'',
                uploadTime:'',
                phone:'',
                eventType:0,
                location:'',
                imgList: [],
                loadModal:false,
                modalName: "",
                urlArray: [],
                index: -1,
                picker: ['复核不通过', '复核通过'],
			}
		},
		methods: {
		PickerChange(e) {
		    	this.index = e.detail.value
		    },
		    
			LoadModal(e) {
				uni.showLoading({
					title: 'loading'
				});
			},
		    showModal(e) {
		        this.modalName = "bottomModal"  
		    },
		    hideModal(e) {
		    	this.modalName = null
		    },
		    ChooseImage() {
		        var that = this
		    	uni.chooseImage({
		    		count: 3, //默认9
		    		sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
		    		sourceType: ['album','camera'], //从相册选择
		    		success: (res) => {
		    			if (that.imgList.length != 0) {
		                    if ((that.imgList.length + res.tempFilePaths.length) <= 3) {
		                      that.imgList = that.imgList.concat(res.tempFilePaths)
		                    } else {
		                        uni.showToast({
		                            title:'最多只能上传3张图片',
		                            icon:'none'
		                        })
		                    }
		    			} else {
		    				that.imgList = res.tempFilePaths
		    			}
		                that.urlBase64(res.tempFilePaths)
		    		}
		    	});
		    },
		    ViewImage(e) {
		    	uni.previewImage({
		    		urls: this.imgList,
		    		current: e.currentTarget.dataset.url
		    	});
		    },
		    urlBase64(array) {
		        
		        for (var i = 0; i < array.length; i++) { 
		            var toBase64Url;
		            　　uni.request({
		            　　　　url: array[i],
		            　　　　method: 'GET',
		            　　　　responseType: 'arraybuffer',
		            　　　　success: async res => {
		            　　　　　　  let base64 = wx.arrayBufferToBase64(res.data); //把arraybuffer转成base64
		            　　　　　　  toBase64Url = 'data:image/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示
		                        if (this.urlArray.length < 3) {
		                            this.urlArray.push(toBase64Url)
		                        }
		            　　　　 }
		            　　});
		        }
		        
		
		    },
		    
		    DelImg(e) {
		    	uni.showModal({
		    		content: '确定要删除这张照片吗？',
		    		cancelText: '取消',
		    		confirmText: '确定',
		    		success: res => {
		    			if (res.confirm) {
		    				this.imgList.splice(e.currentTarget.dataset.index, 1)
		                    this.urlArray.splice(e.currentTarget.dataset.index, 1)
		    			}
		    		}
		    	})
		    },
		    
		    upload() {
		        if (this.index == -1 ) {
		            uni.showToast({
		                title:"请选择复核结果",
		                icon:'none'
		            })
		            return
		        }
		        
		        if (this.imgList.length == 0) {
		            uni.showToast({
		                title:"请上传图片",
		                icon:'none'
		            })
		            return
		        }
		        var url = [];
		        url = url.concat(this.urlArray)
		        while(url.length < 3) {
		            url.push('')
		        }
		        this.LoadModal()
		        uni.request({
		            url: this.GLOBAL.UploadResult,
		            dataType: 'jsonp',
		            method: 'POST',
		            header: {
		                access_token:this.token,
		            },
		            data: {
		                access_token:this.token,
		                phoneNum:this.phone,
		                type:this.type,
		                result:this.index.toString(),
                        eventProgress: {
                            name:this.name,
                            description:'上报复核结果',
                            image1:url[0],
                            Image2:url[1],
                            Image3:url[2]
                        }

		            }
		        }).then(data => {
		            //data为一个数组，数组第一项为错误信息，第二项为返回数据
		            uni.hideLoading();
		            var [error, res]  = data;
		            console.log(res.data);
		            let response = JSON.parse(res.data);
		
		            if ( response.code == 200 ) {
		                uni.showModal({
		                    title: '提交成功',
		                    showCancel: false,
		                	confirmText: '知道了',
		                	success: res => {
		                        uni.navigateBack({
		                            delta: 3
		                        });
		                	}
		                })
		            } else {
		                uni.showToast({
		                	title:response.message,
		                	icon:"none"
		                }) 
		            }
		        }).catch(err => {
		            uni.hideLoading();
		        	console.log('request fail', err);
		        	uni.showModal({
		        		content: err.errMsg,
		        		showCancel: false
		        	});
		        }); 
		    }
		},
        onLoad: function (option) {
            this.phone = option.phone;
            this.eventDescription=option.eventDescription
            this.uploadTime=option.uploadTime
            this.eventType = option.eventType
            this.location = option.location
            this.name = option.name
        },
	}
</script>

<style>
.eventItem {
        margin: 10rpx;
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
        color: #333333;
    }
    .contentTime {
        margin-left: 20rpx;
        margin-right: 20rpx;
        color: #666666;
        font-size: 24rpx;
        
    }
    .titleTitle {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .redAlert {
        color: #e54d42;
        font-size: 24rpx;
        padding-left: 24rpx;
    }
    
    .leftTitle {
        color: #333333;
        font-size: 32rpx;
        margin-left: 12rpx;
        margin-top: 10rpx;
    }
    .rightTitle {
        font-size: 24rpx;
        margin-right: 20rpx;
        margin-top: 20rpx;
        color: #666666;
    }
    .itemTop {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    
    .cu-form-group2 {
    	background-color: #ffffff;
    	padding: 1upx 30upx;
    	display: flex;
    	align-items: center;
    	min-height: 100upx;
    	justify-content: space-between;
    }
    
    .addGroup {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .alertNN {
        padding-bottom: 40rpx;
    }
    .alertPP {
        margin-top: 90rpx;
        line-height:1.1;
        font-size: 24rpx;
        color: #666666;
        text-align: center;
    }
</style>
